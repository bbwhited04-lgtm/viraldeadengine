import { buildGumroadUrl, getParam } from "../../../lib/tracking";

export const metadata = {
  title: "Retro 90s VHS Aesthetic: Nostalgia Wins",
  description: "A simple nostalgia formula for short clips and captions that hook fast.",
};

export default function Post({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {

  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Retro 90s VHS Aesthetic: Nostalgia Wins</h1>
      <p>
        Nostalgia is a shortcut to emotion. Pair a retro look with a tiny story and a loop.
      </p>

      <h2>Formula</h2>
      <ul>
        <li>Visual: VHS grain + soft glow.</li>
        <li>Text hook: “remember this feeling?”</li>
        <li>End on the same “title card” you started with.</li>
      </ul>

      <h2>Access</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc?src=viraldead&post=retro-90s-vhs&vid=001"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>
    </main>
  );
}
