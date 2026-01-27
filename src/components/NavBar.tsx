import Link from "next/link";
import { CROSS_LINKS } from "../lib/site";

export default function NavBar() {
  const btn = "px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10";
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-3 flex-wrap">
        <Link href="/" className="font-extrabold tracking-tight text-lg">Viral Dead Engine</Link>
        <nav className="flex flex-wrap gap-2 items-center">
          <Link className={btn} href="/blog">Blog</Link>
          <Link className={btn} href="/docs">Docs</Link>
          <Link className={btn} href="/pricing">Subscribe</Link>
          <Link className={btn} href="/dashboard">Dashboard</Link>
          <Link className={btn} href="/account">Account</Link>
          <a className={btn} href={CROSS_LINKS["DeadApp.pro"]} target="_blank" rel="noopener noreferrer">DeadApp</a>
        </nav>
      </div>
    </header>
  );
}
