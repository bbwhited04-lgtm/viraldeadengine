import { buildGumroadUrl, getParam } from "../../../lib/tracking";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Page({ searchParams = {} }: PageProps) {
  const src = getParam(searchParams, "src") || "direct";
  const vid = getParam(searchParams, "vid") || "000";

  const gumroad = buildGumroadUrl("https://whitedbreeze.gumroad.com/l/nsjcc", {
    src,
    vid,
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Baby Bears Snow</h1>
      <p>Canonical Next.js App Router page. Build-safe.</p>
      <a href={gumroad}>Upgrade</a>
    </main>
  );
}
