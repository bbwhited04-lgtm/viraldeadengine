import { buildGumroadUrl, getParam } from "../../../lib/tracking";

export const metadata = {
  title: "Oddly Satisfying: Marble Run Loops",
  description: "How to make oddly-satisfying clips that keep retention high.",
};

export default function Post({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {

  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Oddly Satisfying: Marble Run Loops</h1>
      <p>
        Oddly satisfying content works because it’s predictable-but-not-boring. It’s also
        highly loopable.
      </p>

      <h2>Rules</h2>
      <ul>
        <li>No jump cuts (smooth motion wins).</li>
        <li>Center the action (don’t make viewers search).</li>
        <li>End right before “the best part” to trigger rewatch.</li>
      </ul>

      <h2>Caption idea</h2>
      <p>“I watched this 5 times. Did you?”</p>

      <h2>Access</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc?src=viraldead&post=oddly-satisfying-marble&vid=001"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>
    </main>
  );
}
