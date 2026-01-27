"use client";
import { useState } from "react";

export default function SubscribeCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startCheckout() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout failed");
      if (data?.url) window.location.href = data.url;
      else throw new Error("No checkout url returned");
    } catch (e: any) {
      setErr(e?.message || "Error");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-extrabold">Subscribe</h2>
      <p className="opacity-80 mt-2">
        Unlock the distribution loop toolkit + updates. Uses Stripe Checkout.
      </p>

      <div className="mt-4 space-y-2">
        <label className="text-sm opacity-80">Email (for receipt + account)</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        />
      </div>

      {err && <div className="mt-3 text-sm text-red-300">{err}</div>}

      <button
        onClick={startCheckout}
        disabled={loading}
        className="mt-5 w-full px-4 py-3 rounded-xl font-extrabold bg-white text-black hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Continue to Checkout"}
      </button>

      <p className="text-xs opacity-70 mt-3">
        Configure env vars: STRIPE_SECRET_KEY, STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET (optional).
      </p>
    </div>
  );
}
