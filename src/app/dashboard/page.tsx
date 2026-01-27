"use client";
import Link from "next/link";
import { getSession } from "../../lib/session";
import { SOCIAL } from "../../lib/site";

export default function DashboardPage() {
  const s = getSession();

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-4xl font-extrabold">Dashboard</h1>
        <Link className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" href="/account">Account</Link>
      </div>

      <p className="opacity-80 mt-2">
        {s ? <>Welcome, <b>{s.email}</b>.</> : <>You’re viewing as a guest. <Link className="underline" href="/login">Log in</Link></>}
      </p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-extrabold text-xl">Daily Loop</h2>
          <ol className="mt-3 space-y-2 list-decimal pl-5 opacity-90">
            <li>Post 7–11s loop on TikTok/IG</li>
            <li>Pin comment → link to a blog post</li>
            <li>Blog post CTA → Subscribe</li>
          </ol>
          <Link className="inline-block mt-4 underline" href="/blog">Open Blog →</Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-extrabold text-xl">Quick Actions</h2>
          <div className="mt-3 flex flex-col gap-2">
            <Link className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10" href="/pricing">Subscribe</Link>
            <a className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10" href="/latest-videos.html">Latest Videos</a>
            <a className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10" href="/bio.html">Bio Hub</a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-extrabold text-xl">Cross-post</h2>
          <p className="opacity-80 mt-2">Same handle everywhere: <b>@viraldeadengine</b></p>
          <ul className="mt-3 space-y-1">
            {Object.entries(SOCIAL).map(([k,v]) => (
              <li key={k}><a className="underline hover:no-underline" href={v} target="_blank" rel="noopener noreferrer">{k}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
