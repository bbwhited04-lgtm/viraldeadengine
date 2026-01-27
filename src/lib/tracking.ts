export function getParam(searchParams: Record<string, string | string[] | undefined>, key: string): string {
  const v = searchParams[key];
  if (!v) return "";
  return Array.isArray(v) ? (v[0] ?? "") : v;
}

export function buildGumroadUrl(base: string, params: Record<string, string>): string {
  const url = new URL(base);
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v);
  }
  return url.toString();
}
