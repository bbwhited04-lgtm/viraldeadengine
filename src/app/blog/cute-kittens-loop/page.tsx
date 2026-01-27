import { buildGumroadUrl, getParam } from "@/lib/tracking";

export const metadata = {
  title: "Cute Kittens Loop: The 7–11 Second Trick",
  description: "Why loop-friendly kitten clips keep people watching—and how to structure them.",
};

export default function Post({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const src = getParam(searchParams, "src") || "direct";
  const vid = getParam(searchParams, "vid") || "000";

  const gumroad = buildGumroadUrl("https://whitedbreeze.gumroad.com/l/nsjcc", {
    src: "viraldead",
    post: "cute-kittens-loop",
    from: src,
    vid,
  });

  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Cute Kittens Loop: The 7–11 Second Trick</h1>
      <p>
        Kittens are “unfair content.” People stop scrolling. The key is making the video feel like it never ended.
      </p>

      <h2>What to do</h2>
      <ul>
        <li>Keep it 7–11 seconds.</li>
        <li>Start and end on nearly the same frame (seamless loop).</li>
        <li>Use one simple on-screen line: “wait for it…”</li>
      </ul>

      <h2>Tracked CTA</h2>
      <p>
        <a href={gumroad} target="_blank" rel="noopener noreferrer">
          Get the experiment package on Gumroad →
        </a>
      </p>

      <p style={{ marginTop: 18, opacity: 0.75 }}>
        Tracking: <code>?src=tiktok&vid=001</code> → passes into Gumroad as <code>from</code> + <code>vid</code>.
      </p>
    </main>
  );
}
