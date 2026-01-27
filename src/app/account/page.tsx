"use client";
import Link from "next/link";
import { getSession, clearSession } from "../../lib/session";
import PortalButton from "../../components/PortalButton";

export default function AccountPage() {
  const s = getSession();

  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-extrabold">Account</h1>

      {!s ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="opacity-90">You’re not logged in.</p>
          <Link className="inline-block mt-4 px-4 py-3 rounded-xl font-extrabold bg-white text-black" href="/login">Log in</Link>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="opacity-90">Signed in as</div>
          <div className="text-xl font-extrabold mt-1">{s.email}</div>

          <PortalButton />

          <div className="mt-6 flex gap-2 flex-wrap">
            <Link className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10" href="/dashboard">Open Dashboard</Link>
            <Link className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10" href="/pricing">Subscribe</Link>
            <button
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
              onClick={() => { clearSession(); window.location.reload(); }}
            >
              Log out
            </button>
          </div>

          <p className="text-xs opacity-70 mt-5">
            Note: This is a lightweight local session. For production authentication, wire in Clerk/Supabase/Auth.js.
          </p>
        </div>
      )}
    </main>
  );
}
