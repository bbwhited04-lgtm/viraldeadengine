#!/usr/bin/env bash
set -euo pipefail

# ===== find app folder =====
if [ -d "src/app" ]; then
  APP="src/app"
elif [ -d "app" ]; then
  APP="app"
else
  echo "ERROR: Can't find src/app or app"
  exit 1
fi

mkdir -p "$APP/docs"

# ===== 1) REAL homepage at / =====
cat > "$APP/page.tsx" <<'TSX'
const BUY_URL = "https://whitedbreeze.gumroad.com/l/nsjcc";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1050, margin: "0 auto", padding: "28px 18px" }}>
      <h1 style={{ fontSize: 40, lineHeight: 1.05, margin: "0 0 10px" }}>
        Viral Dead Engine
      </h1>
      <p style={{ opacity: 0.85, maxWidth: 760, margin: "0 0 18px" }}>
        Publish short-form loops daily, route attention into a blog hub, and convert with simple CTAs.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
        <a href="/blog" style={btnPrimary}>Open Blog</a>
        <a href="/docs" style={btn}>Docs / License</a>
        <a href={BUY_URL} target="_blank" rel="noreferrer" style={btn}>Buy (Gumroad)</a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 14 }}>
        <Card title="Daily output" text="7–12 second clips that point to a specific blog URL for tracking." />
        <Card title="Simple funnel" text="Blog posts become landing pages: internal links + upgrade CTA." />
        <Card title="Cross-links" text="Small footer links across your domains for authority flow." />
        <Card title="Next step" text="Add featured images + social share on every post." />
      </div>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={{
      gridColumn: "span 6",
      border: "1px solid rgba(255,255,255,.10)",
      borderRadius: 18,
      padding: 16,
      background: "rgba(255,255,255,.03)"
    }}>
      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
      <p style={{ margin: 0, opacity: 0.85 }}>{text}</p>
    </div>
  );
}

const btn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 12,
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.03)",
  color: "inherit"
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  background: "#ffd34d",
  color: "#0b0b0f",
  border: "1px solid rgba(0,0,0,.18)",
  fontWeight: 800
};
TSX

# ===== 2) Docs moved to /docs =====
cat > "$APP/docs/page.tsx" <<'TSX'
const BUY_URL = "https://whitedbreeze.gumroad.com/l/nsjcc";

export default function DocsPage() {
  return (
    <main style={{ maxWidth: 1050, margin: "0 auto", padding: "28px 18px" }}>
      <h1 style={{ margin: "0 0 10px" }}>Docs, License & AI Disclosure</h1>

      <h2>What Is Viral Dead Engine?</h2>
      <p>
        Viral Dead Engine is a distribution and experimentation platform designed to explore viral media mechanics,
        automated content pipelines, and audience routing.
      </p>

      <h2>License</h2>
      <p>
        Unless otherwise stated, all software, documentation, and materials are provided under a proprietary license
        by DEAD APP CORP. Redistribution, resale, or reuse without written permission is prohibited.
      </p>

      <h2>AI Disclosure</h2>
      <p>
        This platform may generate, curate, or distribute content created wholly or partially using AI systems.
        AI-generated content is for informational/creative purposes only and should not be relied upon as professional advice.
      </p>

      <h2>Company</h2>
      <p>DEAD APP CORP • United States</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <a href="/blog" style={btn}>Go to Blog</a>
        <a href={BUY_URL} target="_blank" rel="noreferrer" style={btnPrimary}>Buy (Gumroad)</a>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 12,
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.03)",
  color: "inherit"
};

const btnPrimary: React.CSSProperties = {
  ...btn,
  background: "#ffd34d",
  color: "#0b0b0f",
  border: "1px solid rgba(0,0,0,.18)",
  fontWeight: 800
};
TSX

# ===== 3) Fix mojibake characters in your repo =====
# Replace common broken sequences in all text/code files (safe)
python - <<'PY'
import pathlib, re
bad = {
  "â€“": "-", "â€”": "-", "â€˜": "'", "â€™": "'", "â€œ": '"', "â€�": '"',
  "â€¢": "•", "â‡’": "=>"
}
ext_ok = {".ts",".tsx",".js",".jsx",".md",".html",".css",".txt",".json",".xml"}
root = pa
