\
/**
 * scripts/generate-share-packs.mjs
 * Generate social share packs for all Next.js App Router blog routes under src/app/blog/<slug>/page.tsx
 *
 * Outputs:
 * - share-packs/share-packs.json
 * - share-packs/share-packs.csv
 * - share-packs/<slug>.json
 * - share-packs/<slug>.txt
 */

import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const blogRoot = path.join(repoRoot, "src", "app", "blog");
const outDir = path.join(repoRoot, "share-packs");

const BASE_URL = (process.env.BASE_URL || "https://deadapp.pro").replace(/\/$/, "");
const UTM_CAMPAIGN = process.env.UTM_CAMPAIGN || "dead_blog";
const UTM_MEDIUM = process.env.UTM_MEDIUM || "social";

function walkSlugs(dir) {
  if (!fs.existsSync(dir)) return [];
  const slugs = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    const pagePath = path.join(dir, slug, "page.tsx");
    if (fs.existsSync(pagePath)) slugs.push(slug);
  }
  return slugs;
}

function slugToTitle(slug) {
  // Try to make a reasonable title if we can't parse from file
  return slug
    .split("-")
    .map(s => s ? s[0].toUpperCase() + s.slice(1) : s)
    .join(" ");
}

function parseTitleFromPageTsx(filePath) {
  // best-effort: look for <h1>Title</h1> or <h1>{"Title"}</h1>
  try {
    const s = fs.readFileSync(filePath, "utf8");
    const m1 = s.match(/<h1[^>]*>\s*([^<\{][^<]*)\s*<\/h1>/i);
    if (m1 && m1[1]) return m1[1].trim();
    const m2 = s.match(/<h1[^>]*>\s*\{\s*["'`]([^"'`]+)["'`]\s*\}\s*<\/h1>/i);
    if (m2 && m2[1]) return m2[1].trim();
  } catch {}
  return null;
}

function withUtm(url, source) {
  const u = new URL(url);
  u.searchParams.set("utm_source", source);
  u.searchParams.set("utm_medium", UTM_MEDIUM);
  u.searchParams.set("utm_campaign", UTM_CAMPAIGN);
  return u.toString();
}

function enc(s) { return encodeURIComponent(s); }

function makeShareLinks(url, title, desc) {
  return {
    x: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(withUtm(url, "x"))}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(withUtm(url, "facebook"))}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(withUtm(url, "linkedin"))}`,
    reddit: `https://www.reddit.com/submit?url=${enc(withUtm(url, "reddit"))}&title=${enc(title)}`,
    email: `mailto:?subject=${enc(title)}&body=${enc(desc + "\n\n" + withUtm(url, "email"))}`,
    copy: withUtm(url, "copy")
  };
}

function captionSet(title, urlCopy) {
  // Respectful + short, optimized for copy/paste
  return {
    x: [
      `${title} — a gentle reminder to honor life with respect.`,
      `Read: ${urlCopy}`,
      `#memorial #remembrance`
    ].join("\n"),
    facebook: [
      `${title}`,
      `If you’re remembering someone today, we hope this helps.`,
      urlCopy
    ].join("\n\n"),
    linkedin: [
      `${title}`,
      `A short, respectful read on memorial pages and remembrance.`,
      urlCopy
    ].join("\n\n"),
    instagram_threads_tiktok: [
      `${title}`,
      `Link in bio / pinned comment:`,
      urlCopy,
      `#remembrance #memorial`
    ].join("\n"),
    reddit: [
      title,
      urlCopy
    ].join("\n\n")
  };
}

function ensureOutDir() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
}

function toCSV(rows) {
  const header = ["slug","title","url","copy_link","x_caption","facebook_caption","linkedin_caption","ig_threads_tiktok_caption","reddit_caption"].join(",");
  const esc = (v) => {
    const s = String(v ?? "");
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const lines = rows.map(r => [
    r.slug, r.title, r.url, r.share.copy,
    r.captions.x, r.captions.facebook, r.captions.linkedin, r.captions.instagram_threads_tiktok, r.captions.reddit
  ].map(esc).join(","));
  return [header, ...lines].join("\n");
}

function makeTxtPack(item) {
  return [
    `TITLE: ${item.title}`,
    `URL: ${item.url}`,
    ``,
    `COPY LINK (IG/Threads/TikTok):`,
    item.share.copy,
    ``,
    `--- X ---`,
    item.captions.x,
    ``,
    `--- Facebook ---`,
    item.captions.facebook,
    ``,
    `--- LinkedIn ---`,
    item.captions.linkedin,
    ``,
    `--- IG/Threads/TikTok ---`,
    item.captions.instagram_threads_tiktok,
    ``,
    `--- Reddit ---`,
    item.captions.reddit,
    ``,
    `SHARE LINKS:`,
    `X: ${item.share.x}`,
    `Facebook: ${item.share.facebook}`,
    `LinkedIn: ${item.share.linkedin}`,
    `Reddit: ${item.share.reddit}`,
    `Email: ${item.share.email}`,
  ].join("\n");
}

function main() {
  ensureOutDir();

  const slugs = walkSlugs(blogRoot).sort();
  if (slugs.length === 0) {
    console.log("No blog routes found at src/app/blog/<slug>/page.tsx");
    process.exit(0);
  }

  const packs = [];
  for (const slug of slugs) {
    const pagePath = path.join(blogRoot, slug, "page.tsx");
    const title = parseTitleFromPageTsx(pagePath) || slugToTitle(slug);
    const url = `${BASE_URL}/blog/${slug}`;
    const desc = `Read: ${title}`;
    const share = makeShareLinks(url, title, desc);
    const captions = captionSet(title, share.copy);

    const item = { slug, title, url, share, captions };
    packs.push(item);

    fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(item, null, 2), "utf8");
    fs.writeFileSync(path.join(outDir, `${slug}.txt`), makeTxtPack(item), "utf8");
  }

  fs.writeFileSync(path.join(outDir, "share-packs.json"), JSON.stringify({ baseUrl: BASE_URL, campaign: UTM_CAMPAIGN, items: packs }, null, 2), "utf8");
  fs.writeFileSync(path.join(outDir, "share-packs.csv"), toCSV(packs), "utf8");

  console.log(`✅ Generated ${packs.length} share pack(s) in: ${path.relative(repoRoot, outDir)}`);
  console.log(`- share-packs/share-packs.json`);
  console.log(`- share-packs/share-packs.csv`);
  console.log(`- share-packs/<slug>.txt + <slug>.json`);
}

main();
