/**
 * Canonical tracking helpers for Next.js App Router (Next 14+)
 */

export type SearchParamsLike =
  | URLSearchParams
  | Record<string, string | string[] | undefined>
  | null
  | undefined;

export function getParam(searchParams: SearchParamsLike, key: string): string | null {
  if (!searchParams) return null;

  // URLSearchParams (browser)
  if (typeof (searchParams as any).get === "function") {
    return (searchParams as URLSearchParams).get(key);
  }

  // Next.js App Router object
  const obj = searchParams as Record<string, string | string[] | undefined>;
  const v = obj[key];
  if (Array.isArray(v)) return v[0] ?? null;
  if (typeof v === "string") return v;
  return null;
}

export function buildGumroadUrl(
  baseUrl: string,
  params?: Record<string, string | number | boolean | null | undefined>
): string {
  const u = new URL(baseUrl);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined) continue;
      u.searchParams.set(k, String(v));
    }
  }
  return u.toString();
}
