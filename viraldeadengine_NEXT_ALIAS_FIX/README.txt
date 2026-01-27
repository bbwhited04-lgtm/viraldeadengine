\
Viral Dead Engine — Next.js ALIAS FIX (no more Module not found for @/src/*)

Your build error:
  Module not found: Can't resolve '@/src/components/...'
This happens when the project doesn't have an alias configured for "@/src".

This drop-in fixes it two ways:
1) Adds next.config.mjs with a webpack alias for "@/" and "@/src"
2) Provides a tsconfig patch block you can merge (optional)

INSTALL (PowerShell):
cd "C:\Users\bbwhi\viraldeadengine\viraldeadengine"

1) Copy next.config.mjs into repo root (same folder as package.json):
Copy-Item -Force "C:\path\to\unzipped\viraldeadengine_NEXT_ALIAS_FIX\next.config.mjs" ".\next.config.mjs"

2) OPTIONAL (recommended): merge the JSON block from tsconfig.paths.patch.json into your tsconfig.json under compilerOptions.
   - If you prefer no manual edits, skip this; the webpack alias alone fixes the build.

Then run:
npm run build
$env:PORT=3001
npm run start