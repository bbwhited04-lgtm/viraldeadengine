import { buildGumroadUrl, getParam } from "../../../lib/tracking";

export const metadata = {
  title: "Wholesome Dad Jokes: Comment Bait That Isn’t Toxic",
  description: "Use clean jokes to trigger comments and shares without controversy.",
};

export default function Post({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {

  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Wholesome Dad Jokes: Comment Bait That Isn’t Toxic</h1>
      <p>
        Clean jokes get comments because people reply with their own. That’s free engagement.
      </p>

      <h2>Try these</h2>
      <ul>
        <li>Why don’t eggs tell jokes? They’d crack each other up.</li>
        <li>I used to hate facial hair… but it grew on me.</li>
        <li>What do you call cheese that isn’t yours? Nacho cheese.</li>
      </ul>

      <h2>CTA</h2>
      <p>“Drop your best one — link has more.”</p>

      <h2>Access</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc?src=viraldead&post=wholesome-dad-jokes&vid=001"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>
    </main>
  );
}
