// src/app/page.tsx
export const dynamic = "force-dynamic";

const BRAND = {
  name: "Viral Dead Engine",
  tagline: "Turn short-form loops into trackable traffic",
  sub:
    "Paste your TikTok / Instagram / Facebook post links and this page renders a creator-style feed grid. Fast. Reliable. No API approvals needed.",
  gumroad: "https://whitedbreeze.gumroad.com/l/nsjcc",
  blog: "/blog",
  docs: "/docs",
  domains: [
    { label: "deadapp.pro", href: "https://deadapp.pro" },
    { label: "viraldead.pro", href: "https://viraldead.pro" },
    { label: "insuretoday24.com", href: "https://insuretoday24.com" }
  ]
};

/**
 * ✅ HOW TO USE
 * 1) Replace the URLs in FEED_URLS with your real post URLs.
 * 2) Deploy.
 * 3) Homepage becomes "contentcreator.com style" with embeds.
 *
 * Notes:
 * - TikTok/IG/FB often require you to embed each post URL.
 * - This is the fastest way without API approvals.
 */

const FEED_URLS = {
  tiktok: [
    "https://www.tiktok.com/@tiktok/video/716177647816",
    "https://www.tiktok.com/@tiktok/video/716177647817"
  ],
  instagram: [
    "https://www.instagram.com/p/Cwq9g1uS6Qm/",
    "https://www.instagram.com/reel/Cwq9g1uS6Qn/"
  ],
  facebook: [
    "https://www.facebook.com/reel/123456789012345",
    "https://www.facebook.com/watch/?v=123456789012346"
  ]
};

function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,.10)",
        borderRadius: 18,
        background: "rgba(255,255,255,.03)",
        overflow: "hidden"
      }}
    >
      <div style={{ padding: 14, borderBottom: "1px solid rgba(255,255,255,.10)" }}>
        <strong>{title}</strong>
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

function Btn({
  href,
  children,
  primary
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 14px",
        borderRadius: 12,
        textDecoration: "none",
        border: primary
          ? "1px solid rgba(0,0,0,.18)"
          : "1px solid rgba(255,255,255,.12)",
        background: primary ? "#ffd34d" : "rgba(255,255,255,.03)",
        color: primary ? "#0b0b0f" : "inherit",
        fontWeight: primary ? 800 : 600
      }}
    >
      {children}
    </a>
  );
}

function Embed({ url }: { url: string }) {
  // Very lightweight embed approach:
  // - TikTok: iframe embed works for many URLs
  // - Instagram: their embed JS is more reliable, but iframe works for many public posts
  // - Facebook: iframe plugin works for public content
  //
  // This keeps things simple: one iframe per URL.
  const src = buildEmbedSrc(url);

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,.10)",
        borderRadius: 14,
        overflow: "hidden",
        background: "rgba(0,0,0,.25)"
      }}
    >
      <iframe
        src={src}
        style={{ width: "100%", height: 520, border: 0 }}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
        allowFullScreen
        title={url}
      />
      <div style={{ padding: 10, fontSize: 12, opacity: 0.8 }}>
        <a href={url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
          Open original ↗
        </a>
      </div>
    </div>
  );
}

function buildEmbedSrc(url: string) {
  // TikTok
  if (url.includes("tiktok.com")) {
    // TikTok supports /embed/v2/<videoId> format
    const m = url.match(/video\/(\d+)/);
    if (m?.[1]) return `https://www.tiktok.com/embed/v2/${m[1]}`;
    return url;
  }

  // Instagram
  if (url.includes("instagram.com")) {
    // IG embed uses /embed/
    const clean = url.split("?")[0].replace(/\/+$/, "");
    return `${clean}/embed`;
  }

  // Facebook
  if (url.includes("facebook.com")) {
    // FB plugin embed
    const enc = encodeURIComponent(url);
    return `https://www.facebook.com/plugins/video.php?href=${enc}&show_text=false&width=500`;
  }

  return url;
}

export default function Home() {
  return (
    <main style={{ maxWidth: 1150, margin: "0 auto", padding: "28px 18px" }}>
      {/* HERO */}
      <div
        style={{
          border: "1px solid rgba(255,255,255,.10)",
          borderRadius: 22,
          background: "linear-gradient(180deg, rgba(255,211,77,.10), rgba(255,255,255,.02))",
          padding: 22
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              background: "#ffd34d",
              color: "#0b0b0f",
              fontWeight: 900,
              padding: "3px 10px",
              borderRadius: 999
            }}
          >
            ⚡
          </span>
          <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.05 }}>{BRAND.name}</h1>
        </div>

        <p style={{ margin: "10px 0 6px", fontSize: 16, opacity: 0.9 }}>
          <strong>{BRAND.tagline}</strong>
        </p>
        <p style={{ margin: 0, maxWidth: 840, opacity: 0.8 }}>{BRAND.sub}</p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
          <Btn href={BRAND.blog} primary>
            Blog Hub
          </Btn>
          <Btn href={BRAND.docs}>Docs</Btn>
          <Btn href={BRAND.gumroad}>Buy</Btn>
        </div>

        <div style={{ marginTop: 12, fontSize: 13, opacity: 0.85 }}>
          Network:{" "}
          {BRAND.domains.map((d, i) => (
            <span key={d.href}>
              <a href={d.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                {d.label}
              </a>
              {i < BRAND.domains.length - 1 ? " • " : ""}
            </span>
          ))}
        </div>
      </div>

      {/* FEED GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 14,
          marginTop: 16
        }}
      >
        <div style={{ gridColumn: "span 12" }}>
          <Card title="Your feeds (paste your post links)">
            <p style={{ marginTop: 0, opacity: 0.85 }}>
              Edit <code>FEED_URLS</code> inside <code>src/app/page.tsx</code> and paste your real
              TikTok/IG/FB post links. Deploy. Done.
            </p>
          </Card>
        </div>

        <div style={{ gridColumn: "span 12" }}>
          <Card title="TikTok">
            <div style={grid}>
              {FEED_URLS.tiktok.map((u) => (
                <Embed key={u} url={u} />
              ))}
            </div>
          </Card>
        </div>

        <div style={{ gridColumn: "span 12" }}>
          <Card title="Instagram">
            <div style={grid}>
              {FEED_URLS.instagram.map((u) => (
                <Embed key={u} url={u} />
              ))}
            </div>
          </Card>
        </div>

        <div style={{ gridColumn: "span 12" }}>
          <Card title="Facebook">
            <div style={grid}>
              {FEED_URLS.facebook.map((u) => (
                <Embed key={u} url={u} />
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 18, fontSize: 13, opacity: 0.75 }}>
        If an embed shows blank, the post is private/restricted. Make the post public or paste a different URL.
      </div>
    </main>
  );
}

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: 14
};
