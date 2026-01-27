\
Viral Dead Engine — Next.js DROP-IN FIX (v2) — Uses RELATIVE IMPORTS (fixes webpack/module errors)

Why this exists:
Some projects do not have TS path aliases like "@/src/*". v1 used aliases, which can cause "Module not found" webpack errors.
This v2 pack uses ONLY relative imports, so it works in all Next.js setups that use the /src directory.

Install (Windows PowerShell):
cd "C:\Users\bbwhi\viraldeadengine\viraldeadengine"
Copy-Item -Recurse -Force "C:\path\to\unzipped\viraldeadengine_next_dropin_fix_v2_relative\src\*" "C:\Users\bbwhi\viraldeadengine\viraldeadengine\src\"

Then build/start:
npm run build
$env:PORT=3001
npm run start