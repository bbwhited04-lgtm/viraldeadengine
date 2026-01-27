#!/usr/bin/env bash
set -euo pipefail

# Drop-in fixer for ViralDead (Next.js App Router)
# - Creates a real marketing homepage (/)
# - Fixes docs mojibake by using plain ASCII bullets/arrows
# - Adds robots.txt + sitemap.xml
# - Adds simple styling via globals.css and a cleaner layout

ROOT="$(pwd)"

# Detect App Router directory
APP_DIR=""
if [ -d "$ROOT/src/app" ]; then
  APP_DIR="$ROOT/src/app"
elif [ -d "$ROOT/app" ]; then
  APP_DIR="$ROOT/app"
else
  echo "❌ Could not find Next.js App Router directory (src/app or app)."
  echo "If this is not a Next.js app-router project, tell me your tree and I’ll adjust."
  exit 1
fi

PUBLIC_DIR="$ROOT/public"
mkdir -p "$APP_DIR" "$PUBLIC_DIR"

backup_if_exists () {
  local f="$1"
  if [ -f "$f" ]; then
    cp "$f" "$f.bak.$(date +%Y%m%d_%H%M%S)"
    echo "🧷 Backed up $f"
  fi
}

# --- Write globals.css (safe, small, improves readability) ---
GLOBAL_CSS=""
if [ -d "$ROOT/src" ]; then
  mkdir -p "$ROOT/src"
fi

# In Next.js app router, the conventional place is APP_DIR/../globals.css (varies)
# We'll use: (APP_DIR)/globals.css and import it from layout.tsx we write below.
backup_if_exists "$APP_DIR/globals.css"
cat > "$APP_DIR/globals.css" <<'CSS'
:root{
  --bg:#0b0b0f;
  --card:#121220;
  --text:#e9e9f2;
  --muted:#b9b9c8;
  --brand:#ffd34d;
  --line:rgba(255,255,255,.10);
}
*{box-sizing:border-box}
html,body{padding:0;margin:0}
body{
  background:var(--bg);
  color:var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
  line-height:1.55;
}
a{color:inherit}
.container{max-width:1050px;margin:0 auto;padding:0 18px}
.nav{
  position:sticky;top:0;z-index:50;
  backdrop-filter:saturate(140%) blur(10px);
  background:rgba(11,11,15,.72);
  border-bottom:1px solid var(--line);
}
.navinner{display:flex;align-items:center;justify-content:space-between;padding:14px 0;gap:12px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none}
.badge{color:#0b0b0f;background:var(--brand);padding:2px 8px;border-radius:999px;font-weight:700;font-size:12px}
.links{display:flex;gap:14px;flex-wrap:wrap}
.links a{opacity:.9;text-decoration:none}
.links a:hover{opacity:1;text-decoration:underline}
.hero{padding:46px 0 24px}
.hero h1{font-size:40px;line-height:1.05;margin:0 0 10px}
.hero p{max-width:760px;color:var(--muted);margin:0 0 18px;font-size:16px}
.cta{display:flex;gap:12px;flex-wrap:wrap}
.btn{
  display:inline-flex;align-items:center;justify-content:center;
  padding:10px 14px;border-radius:12px;text-decoration:none;
  border:1px solid var(--line); background:rgba(255,255,255,.03);
}
.btn:hover{background:rgba(255,255,255,.06)}
.btnPrimary{background:var(--brand);color:#0b0b0f;border-color:rgba(0,0,0,.18);font-weight:800}
.btnPrimary:hover{filter:brightness(.98)}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:14px;padding:18px 0 40px}
.card{
  grid-column: span 6;
  background:var(--card);
  border:1px solid var(--line);
  border-radius:18px;
  padding:16px;
}
.card h3{margin:0 0 8px}
.card p{margin:0;color:var(--muted)}
@media (max-width:860px){
  .hero h1{font-size:32px}
  .card{grid-column: span 12}
}
.footer{
  border-top:1px solid var(--line);
  padding:18px 0 28px;
  color:var(--muted);
}
.footer a{text-decoration:none}
.footer a:hover{text-decoration:underline}
.small{font-size:13px}
CSS

# --- layout.tsx: shared header/footer + metadata + import globals.css ---
backup_if_exists "$APP_DIR/layout.tsx"
cat > "$APP_DIR/layout.tsx" <<'TSX'
import "./globals.css";
import type { Metadata } from "next";

const SITE_NAME = "Viral Dead Engine";
const SITE_URL = "https://viraldead.info"; // change if you want canonical to viraldead.pro
const BUY_URL = "https://whitedbreeze.gumroad.com/l/nsjcc";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "A distribution and experimentation platform to explore viral media mechanics, automated content pipelines, and audience routing.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Ship short-form loops daily, route attention to your blog hubs, and monetize with simple funnels.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} aria-label={label}>
      {label}
    </a>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="nav">
          <div className="container">
            <div className="navinner">
              <a className="brand" href="/">
                <span className="badge">⚡</span>
                <strong>Viral Dead Engine</strong>
              </a>
              <div className="links">
                <NavLink href="/" label="Home" />
                <NavLink href="/blog" label="Blog" />
                <NavLink href="/docs" label="Docs" />
                <a href={BUY_URL} target="_blank" rel="noreferrer">
                  Buy
                </a>
              </div>
            </div>
          </div>
        </div>

        {children}

        <div className="footer">
          <div className="container">
            <div className="small">
              © {new Date().getFullYear()} DEAD APP CORP •
              <span> </span>
              <a href="/docs">License / AI Disclosure</a>
              <span> • </span>
              <a href={BUY_URL} target="_blank" rel="noreferrer">
                Gumroad
              </a>
            </div>
            <div className="small" style={{ marginTop: 8 }}>
              Network:{" "}
              <a href="https://deadapp.pro" target="_blank" rel="noreferrer">
                deadapp.pro
              </a>{" "}
              •{" "}
              <a href="https://viraldead.pro" target="_blank" rel="noreferrer">
                viraldead.pro
              </a>{" "}
              •{" "}
              <a
                href="https://insuretoday24.com"
                target="_blank"
                rel="noreferrer"
              >
                insuretoday24.com
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
TSX

# --- Fix homepage: make / an actual marketing landing page ---
backup_if_exists "$APP_DIR/page.tsx"
cat > "$APP_DIR/page.tsx" <<'TSX'
const BUY_URL = "https://whitedbreeze.gumroad.com/l/nsjcc";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Turn short-form loops into trackable traffic.</h1>
        <p>
          Viral Dead Engine is a lightweight hub: publish simple blog landing pages,
          route TikTok/IG attention here, and convert with a clean CTA (Gumroad, Stripe,
          or email capture).
        </p>
        <div className="cta">
          <a className="btn btnPrimary" href="/blog">
            Open the Blog Hub
          </a>
          <a className="btn" href="/docs">
            Docs / License / AI Disclosure
          </a>
          <a className="btn" href={BUY_URL} target="_blank" rel="noreferrer">
            Get the package on Gumroad
          </a>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <h3>Daily loop output</h3>
          <p>
            Post 7–12 second “scroll-stop” clips. Each clip points to a specific blog URL
            to measure holds, clicks, and conversion.
          </p>
        </div>

        <div className="card">
          <h3>Simple funnel</h3>
          <p>
            Use your blog as the “buried hub” that platforms can’t throttle as easily:
            internal links, CTAs, and upgrades.
          </p>
        </div>

        <div className="card">
          <h3>Cross-site network</h3>
          <p>
            Add small footer links across your domains to help discovery and authority
            flow between your properties.
          </p>
        </div>

        <div className="card">
          <h3>Next steps</h3>
          <p>
            Add featured images + social share buttons on each post and generate a sitemap.
            This script also drops robots.txt + sitemap.xml into /public.
          </p>
        </div>
      </section>
    </main>
  );
}
TSX

# --- Fix docs page: overwrite with clean ASCII (no mojibake) ---
mkdir -p "$APP_DIR/docs"
backup_if_exists "$APP_DIR/docs/page.tsx"
cat > "$APP_DIR/docs/page.tsx" <<'TSX'
const BUY_URL = "https://whitedbreeze.gumroad.com/l/nsjcc";

export default function DocsPage() {
  return (
    <main className="container" style={{ padding: "26px 0 36px" }}>
      <h1 style={{ margin: "0 0 10px" }}>Docs, License & AI Disclosure</h1>

      <h2>What Is Viral Dead Engine?</h2>
      <p>
        Viral Dead Engine is a distribution and experimentation platform designed to
        explore viral media mechanics, automated content pipelines, and audience routing.
      </p>

      <h2>License</h2>
      <p>
        Unless otherwise stated, all software, documentation, and materials are provided
        under a proprietary license by DEAD APP CORP. Redistribution, resale, or reuse
        without written permission is prohibited.
      </p>

      <h2>AI Disclosure</h2>
      <p>
        This platform may generate, curate, or distribute content created wholly or
        partially using artificial intelligence systems. AI-generated content is provided
        for informational, experimental, or creative purposes only and should not be relied
        upon as professional advice.
      </p>

      <h2>Data Sources</h2>
      <p>
        Content may be derived from licensed datasets, public-domain materials, or
        user-submitted inputs. No guarantee is made regarding completeness or accuracy.
      </p>

      <h2>Company</h2>
      <p>DEAD APP CORP - United States</p>

      <p style={{ marginTop: 18 }}>
        <a className="btn btnPrimary" href={BUY_URL} target="_blank" rel="noreferrer">
          Get the experiment package on Gumroad
        </a>
        <span style={{ marginLeft: 10 }} />
        <a className="btn" href="/blog">
          Go to Blog
        </a>
      </p>

      <p className="small" style={{ opacity: 0.9, marginTop: 12 }}>
        Static hubs: /bio.html • /latest-videos.html
      </p>
    </main>
  );
}
TSX

# --- robots.txt + sitemap.xml ---
backup_if_exists "$PUBLIC_DIR/robots.txt"
cat > "$PUBLIC_DIR/robots.txt" <<'TXT'
User-agent: *
Allow: /

Sitemap: https://viraldead.info/sitemap.xml
TXT

backup_if_exists "$PUBLIC_DIR/sitemap.xml"
cat > "$PUBLIC_DIR/sitemap.xml" <<'XML'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://viraldead.info/</loc></url>
  <url><loc>https://viraldead.info/blog</loc></url>
  <url><loc>https://viraldead.info/docs</loc></url>

  <url><loc>https://viraldead.info/blog/first-test</loc></url>
  <url><loc>https://viraldead.info/blog/cute-kittens-loop</loc></url>
  <url><loc>https://viraldead.info/blog/baby-bears-snow</loc></url>
  <url><loc>https://viraldead.info/blog/oddly-satisfying-marble-run</loc></url>
  <url><loc>https://viraldead.info/blog/calm-rain-window</loc></url>
  <url><loc>https://viraldead.info/blog/retro-90s-vhs</loc></url>
  <url><loc>https://viraldead.info/blog/tiny-dopamine-checklist</loc></url>
  <url><loc>https://viraldead.info/blog/pet-affirmations</loc></url>
  <url><loc>https://viraldead.info/blog/cozy-winter-village</loc></url>
  <url><loc>https://viraldead.info/blog/wholesome-dad-jokes</loc></url>
  <url><loc>https://viraldead.info/blog/quick-focus-reset</loc></url>
</urlset>
XML

echo "✅ Drop-in files written."
echo ""
echo "NEXT:"
echo "  1) npm install"
echo "  2) npm run build"
echo "  3) git add -A && git commit -m \"Fix homepage, docs encoding, robots+sitemap\" && git push"
echo ""
echo "If your canonical domain isn't viraldead.info, edit SITE_URL + sitemap/robots URLs accordingly."
