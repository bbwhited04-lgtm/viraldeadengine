import { buildGumroadUrl, getParam } from "../../../lib/tracking";

export const metadata = {
  title: "Calm Rain Window: Background Loops That Convert",
  description: "Why calm ambience performs—and how to route clicks without killing vibes.",
};

export default function Post({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {

  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Calm Rain Window: Background Loops That Convert</h1>
      <p>
        Calm loops are “low effort to consume.” People stay longer, which helps reach.
        Keep the CTA subtle.
      </p>

      <h2>Make it work</h2>
      <ul>
        <li>10–15 seconds, gentle movement.</li>
        <li>Text: 1 line max (small, bottom corner).</li>
        <li>CTA: “More loops → site” (no hard sell).</li>
      </ul>

      <h2>Access</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc?src=viraldead&post=calm-rain-window&vid=001"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>
    </main>
  );
}
