"use client";
import Link from "next/link";
import { useState } from "react";
import { setSession } from "../../lib/session";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="mx-auto max-w-xl px-5 py-12">
      <h1 className="text-4xl font-extrabold">Log in</h1>
      <p className="opacity-80 mt-2">
        Simple login (stores a local session on this device). For production auth, we can wire in magic links (Clerk/Supabase/Auth.js).
      </p>

      <div className="mt-6 space-y-2">
        <label className="text-sm opacity-80">Email</label>
        <input
          className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
      </div>

      <button
        className="mt-5 w-full px-4 py-3 rounded-xl font-extrabold bg-white text-black hover:opacity-90"
        onClick={() => { setSession(email || "guest@local"); window.location.href="/dashboard"; }}
      >
        Continue
      </button>

      <div className="mt-6 opacity-80 text-sm">
        No account? <Link className="underline hover:no-underline" href="/signup">Create one</Link>
      </div>
    </main>
  );
}
