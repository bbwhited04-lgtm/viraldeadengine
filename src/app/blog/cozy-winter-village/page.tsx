import { buildGumroadUrl, getParam } from "../../../lib/tracking";

export const metadata = {
  title: "Cozy Winter Village: The Comfort Loop",
  description: "A cozy visual loop strategy that keeps watch time strong.",
};

export default function Post({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {

  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Cozy Winter Village: The Comfort Loop</h1>
      <p>
        Cozy scenes perform because they’re emotionally “safe.” Loop them and add a soft prompt.
      </p>

      <h2>What to include</h2>
      <ul>
        <li>Snowfall + warm windows</li>
        <li>Slow camera drift</li>
        <li>Text: “pause here for 10 seconds”</li>
      </ul>

      <h2>Access</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc?src=viraldead&post=cozy-winter-village&vid=001"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>
    </main>
  );
}
