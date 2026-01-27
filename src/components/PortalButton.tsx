"use client";
import { useState } from "react";

export default function PortalButton() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function openPortal() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Portal failed");
      if (data?.url) window.location.href = data.url;
      else throw new Error("No portal url returned");
    } catch (e: any) {
      setErr(e?.message || "Error");
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      {err && <div className="text-sm text-red-300 mb-2">{err}</div>}
      <button
        onClick={openPortal}
        disabled={loading}
        className="px-4 py-3 rounded-xl font-extrabold bg-white/10 border border-white/10 hover:bg-white/15 disabled:opacity-60"
      >
        {loading ? "Opening..." : "Manage Subscription"}
      </button>
    </div>
  );
}
