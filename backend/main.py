from __future__ import annotations

import os
import stripe
from typing import Optional

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    stripe_secret_key: str = ""
    stripe_price_id: str = ""
    stripe_webhook_secret: str = ""

    stripe_success_url: str = "https://viraldead.pro/success.html"
    stripe_cancel_url: str = "https://viraldead.pro/checkout.html"


settings = Settings()

app = FastAPI(title="ViralDead Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://viraldead.pro",
        "https://www.viraldead.pro",
        "https://viraldeadengine.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def stripe_ready():
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=500, detail="STRIPE_SECRET_KEY not configured")
    if not settings.stripe_price_id:
        raise HTTPException(status_code=500, detail="STRIPE_PRICE_ID not configured")
    stripe.api_key = settings.stripe_secret_key


class CheckoutIn(BaseModel):
    email: Optional[str] = None
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None


@app.get("/health", response_class=JSONResponse)
def health():
    return {
        "ok": True,
        "stripe_configured": bool(settings.stripe_secret_key),
        "price_configured": bool(settings.stripe_price_id),
    }


@app.post("/stripe/checkout", response_class=JSONResponse)
def stripe_checkout(payload: CheckoutIn):
    stripe_ready()

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
