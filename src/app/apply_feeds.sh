#!/usr/bin/env bash
set -euo pipefail

FEED_FILE="FEEDS.txt"

if [ ! -f "$FEED_FILE" ]; then
  echo "Missing FEEDS.txt in project root."
  echo "Create FEEDS.txt with lines like:"
  echo "TIKTOK=https://..."
  echo "INSTAGRAM=https://..."
  echo "FACEBOOK=https://..."
  exit 1
fi

# Find app folder
if [ -d "src/app" ]; then
  APP="src/app"
elif [ -d "app" ]; then
  APP="app"
else
  echo "Can't find src/app or app"
  exit 1
fi

PAGE="$APP/page.tsx"

if [ ! -f "$PAGE" ]; then
  echo "Can't find $PAGE"
  exit 1
fi

python - <<'PY'
import re, pathlib

feed_text = pathlib.Path("FEEDS.txt").read_text("utf-8", errors="ignore").splitlines()

feeds = {"tiktok": [], "instagram": [], "facebook": []}
for line in feed_text:
    line=line.strip()
    if not line or line.startswith("#"): 
        continue
    if line.upper().startswith("TIKTOK="):
        feeds["tiktok"].append(line.split("=",1)[1].strip())
    elif line.upper().startswith("INSTAGRAM="):
        feeds["instagram"].append(line.split("=",1)[1].strip())
    elif line.upper().startswith("FACEBOOK="):
        feeds["facebook"].append(line.split("=",1)[1].strip())

page = pathlib.Path(str(pathlib.Path("src/app/page.tsx") if pathlib.Path("src/app/page.tsx").exists() else pathlib.Path("app/page.tsx")))
s = page.read_text("utf-8", errors="ignore")

def js_array(urls):
    return "[\n" + "\n".join([f'    "{u}",' for u in urls]) + "\n  ]"

# Replace FEED_URLS block if present
pattern = re.compile(r"const FEED_URLS\s*=\s*\{\s*[\s\S]*?\};", re.M)
replacement = (
    "const FEED_URLS = {\n"
    f"  tiktok: {js_array(feeds['tiktok'])},\n"
    f"  instagram: {js_array(feeds['instagram'])},\n"
    f"  facebook: {js_array(feeds['facebook'])}\n"
    "};"
)

if pattern.search(s):
    s2 = pattern.sub(replacement, s)
else:
    # If missing, just append it near the top
    s2 = replacement + "\n\n" + s

page.write_text(s2, "utf-8")
print("Updated:", page)
print("Counts:", {k: len(v) for k,v in feeds.items()})
PY

echo "DONE. Now run: npm run build"
