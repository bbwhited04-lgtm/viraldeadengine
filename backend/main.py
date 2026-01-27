from __future__ import annotations

import os
import re
import json
import time
import secrets
from typing import List, Optional, Dict, Any

import stripe
from fastapi import FastAPI, Request, Header, HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    cors_origins: str = Field(default="*")  # comma-separated

    admin_api_key: str = Field(default="")

    stripe_secret_key: str = Field(default="")
    stripe_webhook_secret: str = Field(default="")
    stripe_price_id: str = Field(default="")  # price_...
    stripe_success_url: str = Field(default="https://viraldead.pro/?success=1")
    stripe_cancel_url: str = Field(default="https://viraldead.pro/?canceled=1")
    stripe_portal_return_url: str = Field(default="https://viraldead.pro/")

settings = Settings()

app = FastAPI(title="ViralDead Backend", version="1.0.0")

# ---- CORS ----
origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
allow_origins = ["*"] if origins == ["*"] or not origins else origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- simple local click store (works for dev; use DB later) ----
DATA_DIR = os.getenv("DATA_DIR", "/tmp")
TRACK_FILE = os.path.join(DATA_DIR, "track.json")


def _load_track() -> Dict[str, Any]:
    try:
        with open(TRACK_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"links": {}, "clicks": []}


def _save_track(data: Dict[str, Any]) -> None:
    os.makedirs(os.path.dirname(TRACK_FILE), exist_ok=True)
    with open(TRACK_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f)


# ---- models ----
class TrackCreateIn(BaseModel):
    url: str
    campaign: Optional[str] = None
    source: Optional[str] = None
    medium: Optional[str] = None


class TrackCreateOut(BaseModel):
    code: str
    short_url: str


class CheckoutIn(BaseModel):
    email: Optional[str] = None
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None


class PortalIn(BaseModel):
    customer_id: str
    return_url: Optional[str] = None


class NormalizeIn(BaseModel):
    urls: List[str]


def require_admin(x_admin_api_key: Optional[str]) -> None:
    if not settings.admin_api_key:
        raise HTTPException(status_code=500, detail="ADMIN_API_KEY not configured")
    if not x_admin_api_key or x_admin_api_key != settings.admin_api_key:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/", response_class=JSONResponse)
def root():
    return {"ok": True, "service": "viraldead-backend", "version": app.version}


@app.get("/health", response_class=JSONResponse)
def health():
    return {
        "ok": True,
        "service": "viraldead-backend",
        "stripe_configured": bool(settings.stripe_secret_key),
        "cors_origins": allow_origins,
    }


@app.get("/config", response_class=JSONResponse)
def config():
    return {
        "cors_origins": allow_origins,
        "stripe_price_id_set": bool(settings.stripe_price_id),
        "success_url": settings.stripe_success_url,
        "cancel_url": settings.stripe_cancel_url,
        "portal_return_url": settings.stripe_portal_return_url,
    }


@app.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return "User-agent: *\nAllow: /\n"


@app.post("/track", response_model=TrackCreateOut)
def create_track_link(payload: TrackCreateIn):
    data = _load_track()
    code = secrets.token_urlsafe(6).replace("-", "").replace("_", "")[:8]

    url = payload.url.strip()
    qs = []
    if payload.campaign:
        qs.append(("utm_campaign", payload.campaign))
    if payload.source:
        qs.append(("utm_source", payload.source))
    if payload.medium:
        qs.append(("utm_medium", payload.medium))
    if qs:
        joiner = "&" if "?" in url else "?"
        url = url + joiner + "&".join([f"{k}={re.sub(r'\\s+', '%20', v)}" for k, v in qs if v])

    data["links"][code] = {"url": url, "created": int(time.time())}
    _save_track(data)

    base = os.getenv("PUBLIC_BASE_URL", "").rstrip("/")
    short_url = f"{base}/t/{code}" if base else f"/t/{code}"
    return TrackCreateOut(code=code, short_url=short_url)


@app.get("/t/{code}")
def redirect_track(code: str, request: Request):
    data = _load_track()
    link = data["links"].get(code)
    if not link:
        raise HTTPException(status_code=404, detail="Unknown code")

    data["clicks"].append(
        {
            "code": code,
            "ts": int(time.time()),
            "ip": request.client.host if request.client else None,
            "ua": request.headers.get("user-agent"),
            "ref": request.headers.get("referer"),
        }
    )
    _save_track(data)
    return RedirectResponse(url=link["url"], status_code=307)


@app.post("/admin/feed/normalize", response_class=JSONResponse)
def normalize_feed(payload: NormalizeIn, x_admin_api_key: Optional[str] = Header(default=None)):
    require_admin(x_admin_api_key)

    def norm(u: str) -> str:
        u = u.strip()
        return u.split("?")[0]  # good enough for now

    return {"urls": [norm(u) for u in payload.urls]}


def stripe_ready():
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=500, detail="STRIPE_SECRET_KEY not configured")
    stripe.api_key = settings.stripe_secret_key


@app.post("/stripe/checkout", response_class=JSONResponse)
def stripe_checkout(payload: CheckoutIn):
    stripe_ready()
    if not settings.stripe_price_id:
        raise HTTPException(status_code=500, detail="STRIPE_PRICE_ID not configured")

    success_url = (payload.success_url or settings.stripe_success_url).strip()
    cancel_url = (payload.cancel_url or settings.stripe_cancel_url).strip()

    session = stripe.checkout.Session.create(
        mode="subscription",
        line_items=[{"price": settings.stripe_price_id, "quantity": 1}],
        success_url=success_url,
        cancel_url=cancel_url,
        customer_email=payload.email,
        allow_promotion_codes=True,
    )
    return {"url": session.url, "id": session.id}


@app.post("/stripe/portal", response_class=JSONResponse)
def stripe_portal(payload: PortalIn):
    stripe_ready()
    return_url = (payload.return_url or settings.stripe_portal_return_url).strip()

    sess = stripe.billing_portal.Session.create(customer=payload.customer_id, return_url=return_url)
    return {"url": sess.url, "id": sess.id}


@app.post("/stripe/webhook", response_class=JSONResponse)
async def stripe_webhook(request: Request):
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=500, detail="STRIPE_WEBHOOK_SECRET not configured")

    payload = await request.body()
    sig = request.headers.get("stripe-signature")
    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=sig,
            secret=settings.stripe_webhook_secret,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Webhook error: {str(e)}")

    return {"ok": True, "type": event["type"]}
