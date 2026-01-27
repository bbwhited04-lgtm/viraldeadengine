\
/**
 * scripts/fix-searchparams.mjs
 * Conservative auto-fix for Next.js App Router pages that reference `searchParams`
 * without receiving it as a prop.
 *
 * Targets: src/app/blog/**/page.tsx
 * Makes .bak backups.
 */

import fs from "fs";
import path from "path";

const repoRoot = process.cwd();
const blogRoot = path.join(repoRoot, "src", "app", "blog");

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function ensureTracking() {
  const trackingPath = path.join(repoRoot, "src", "lib", "tracking.ts");
  if (fs.existsSync(trackingPath)) return;
  fs.mkdirSync(path.dirname(trackingPath), { recursive: true });
  const canonical = fs.readFileSync(path.join(repoRoot, ".autofix-pack", "tracking.ts"), "utf8");
  fs.writeFileSync(trackingPath, canonical, "utf8");
  console.log("✅ Created src/lib/tracking.ts (canonical exports)");
}

function backup(file, content) {
  fs.writeFileSync(file + ".bak", content, "utf8");
}

function hasSearchParamsPropSignature(code) {
  // common good signatures include "{ searchParams" in params
  return /function\s+Page\s*\(\s*\{\s*searchParams\b/.test(code) ||
         /function\s+Page\s*\(\s*\{\s*[^}]*\bsearchParams\b/.test(code) ||
         /export\s+default\s+function\s+Page\s*\(\s*\{\s*searchParams\b/.test(code);
}

function hasBadUsage(code) {
  return /getParam\s*\(\s*searchParams\s*,/m.test(code) || /\bsearchParams\b/.test(code);
}

function topLevelConstsBlock(code) {
  // Capture a simple top-level block: const src=..., const vid=..., const gumroad=...
  // Stops before first "export default function Page"
  const exportIdx = code.search(/export\s+default\s+function\s+Page/);
  if (exportIdx < 0) return null;
  const header = code.slice(0, exportIdx);

  const rx = /(^\s*const\s+src\s*=\s*getParam\s*\(\s*searchParams\s*,[\s\S]*?;\s*$)([\s\S]*?)(^\s*export\s+default\s+function\s+Page)/m;
  // We only want blocks that appear before export and reference searchParams.
  // But this regex is too broad; do manual line extraction:
  const lines = header.split(/\r?\n/);
  const picked = [];
  const keep = [];
  let inPick = false;

  for (const line of lines) {
    if (!inPick && /^\s*const\s+src\s*=/.test(line) && /getParam\(\s*searchParams/.test(line)) {
      inPick = true;
      picked.push(line);
      continue;
    }
    if (inPick) {
      picked.push(line);
      // End when we hit a gumroad const line ending with ';'
      if (/^\s*const\s+gumroad\b/.test(line) && /;\s*$/.test(line)) {
        inPick = false;
      }
      continue;
    }
    keep.push(line);
  }

  if (picked.length === 0) return null;

  // If gumroad const spans multiple lines, we might not stop; handle by stopping once we see a line with ");" or "};"
  // But keep it conservative: if still inPick, abort.
  if (inPick) return null;

  return { picked: picked.join("\n"), keep: keep.join("\n") };
}

function insertPagePropsAndSignature(code) {
  // Replace signature to accept searchParams and add PageProps if missing
  if (!/type\s+PageProps\s*=/.test(code)) {
    code = code.replace(
      /export\s+default\s+function\s+Page\s*\(/,
      `type PageProps = {\n  searchParams?: Record<string, string | string[] | undefined>;\n};\n\nexport default function Page(`
    );
  }

  // Replace function params with ({ searchParams = {} }: PageProps)
  code = code.replace(
    /export\s+default\s+function\s+Page\s*\(\s*([^\)]*)\)/,
    `export default function Page({ searchParams = {} }: PageProps)`
  );

  return code;
}

function moveConstsInside(code, pickedBlock) {
  // Insert picked block right after the opening brace of Page function
  // Find "export default function Page(...){"
  const m = code.match(/export\s+default\s+function\s+Page[^{]*\{\s*/m);
  if (!m) return null;

  const insertAt = m.index + m[0].length;
  const before = code.slice(0, insertAt);
  const after = code.slice(insertAt);

  const injected = `\n  // --- moved by autofix (was top-level) ---\n` +
                   pickedBlock.split(/\r?\n/).map(l => "  " + l.trimEnd()).join("\n") +
                   `\n  // --- end moved block ---\n`;

  return before + injected + after;
}

function processFile(file) {
  const original = fs.readFileSync(file, "utf8");
  let code = original;

  // Only target blog page.tsx
  if (!/\\page\\.tsx$/.test(file)) return { changed: false };
  if (!hasBadUsage(code)) return { changed: false };
  if (hasSearchParamsPropSignature(code)) return { changed: false };

  const moved = topLevelConstsBlock(code);
  if (!moved) {
    return { changed: false, warn: "pattern not matched (skipped to avoid mangling)" };
  }

  // Remove picked block from header by rebuilding content
  const exportIdx = code.search(/export\s+default\s+function\s+Page/);
  const newHeader = moved.keep;
  const rest = code.slice(exportIdx);
  code = newHeader + "\n" + rest;

  // Ensure PageProps + signature
  code = insertPagePropsAndSignature(code);

  // Move the const block inside
  const injected = moveConstsInside(code, moved.picked);
  if (!injected) {
    return { changed: false, warn: "could not inject block safely" };
  }
  code = injected;

  // Write changes
  backup(file, original);
  fs.writeFileSync(file, code, "utf8");
  return { changed: true };
}

function main() {
  ensureTracking();

  const files = walk(blogRoot).filter(p => p.endsWith(path.sep + "page.tsx"));
  if (files.length === 0) {
    console.log("No blog pages found at src/app/blog/**/page.tsx");
    return;
  }

  let changed = 0, skipped = 0;
  for (const f of files) {
    const res = processFile(f);
    if (res.changed) {
      changed++;
      console.log("✅ fixed:", path.relative(repoRoot, f));
    } else if (res.warn) {
      skipped++;
      console.log("⚠️  skipped:", path.relative(repoRoot, f), "—", res.warn);
    }
  }

  console.log(`\nDone. Fixed ${changed} file(s), skipped ${skipped}. Backups saved as *.bak`);
}

main();
