Viral Dead Engine — SIMPLE DROP-IN PACK (public/)

What this is:
- A single `public/` folder containing:
  - index.html (visual upgrade + social links)
  - bio.html
  - latest-videos.html (TikTok + IG embeds)
  - blog/ (index + 3 posts)
  - docs/ (media kit + brand guide)
  - assets/img + assets/videos

How to install (Windows PowerShell):
1) Unzip this file.
2) Copy everything inside the included `public/` folder into your repo's `public/` folder.

Example (adjust paths):
Copy-Item -Recurse -Force "C:\path\to\unzipped\public\*" "C:\path\to\your-repo\public\"

Then build/run:
npm install
npm run build
$env:PORT=3001
npm run start

Recommended .gitignore entries (to avoid committing zip unpack folders):
viraldeadengine_dropin/
viraldeadengine_site_pack/