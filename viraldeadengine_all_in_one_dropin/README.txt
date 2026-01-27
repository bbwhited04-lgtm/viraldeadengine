\
Viral Dead Engine — ALL-IN-ONE DROP-IN (public + src + SEO)

This pack contains:
- /public:
  - robots.txt + sitemap.xml (SEO)
  - bio.html + latest-videos.html (static hubs)
  - assets/img + assets/videos
- /src:
  - fixes Blog + Docs pages to include social links + video embeds
  - uses RELATIVE imports (no alias config required)

INSTALL (PowerShell) — your real path:
cd "C:\Users\bbwhi\viraldeadengine\viraldeadengine"

Copy public + src into the repo (overwrite):
Copy-Item -Recurse -Force "C:\path\to\unzipped\viraldeadengine_all_in_one_dropin\public\*" ".\public\"
Copy-Item -Recurse -Force "C:\path\to\unzipped\viraldeadengine_all_in_one_dropin\src\*" ".\src\"

Then build and run:
npm install
npm run build
$env:PORT=3001
npm run start

Deploy / "restart Vercel":
git add public src
git commit -m "All-in-one drop-in: SEO + hubs + Blog/Docs embeds"
git push
Vercel redeploys automatically on push.