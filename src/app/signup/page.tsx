"use client";
import Link from "next/link";
import { useState } from "react";
import { setSession } from "../../lib/session";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  return (
    <main className="mx-auto max-w-xl px-5 py-12">
      <h1 className="text-4xl font-extrabold">Create account</h1>
      <p className="opacity-80 mt-2">Creates a local session for demo + checkout routing.</p>

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
        onClick={() => { setSession(email || "guest@local"); window.location.href="/pricing"; }}
      >
        Continue to Subscribe
      </button>

      <div className="mt-6 opacity-80 text-sm">
        Already have one? <Link className="underline hover:no-underline" href="/login">Log in</Link>
      </div>
    </main>
  );
}
