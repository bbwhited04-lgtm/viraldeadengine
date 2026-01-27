"use client";

export type Session = { email: string; createdAt: number };

const KEY = "vde_session_v1";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(email: string) {
  if (typeof window === "undefined") return;
  const s: Session = { email, createdAt: Date.now() };
  window.localStorage.setItem(KEY, JSON.stringify(s));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
