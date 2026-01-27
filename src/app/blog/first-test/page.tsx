import { buildGumroadUrl, getParam } from "../../../lib/tracking";

export const metadata = {
  title: "First Viral Test: Short-Form Media Loops",
  description: "Initial observations from early short-form distribution tests.",
};

export default function Post({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {

  return (
    <main style={{ paddingTop: 32 }}>
      <h1>First Viral Test: Short-Form Media Loops</h1>

      <p>
        This documents an early distribution test using short-form AI-generated visuals
        across major platforms.
      </p>

      <h2>Test Parameters</h2>
      <ul>
        <li>Platforms: TikTok, Instagram Reels, YouTube Shorts</li>
        <li>Format: Loop-friendly visuals (6–12s)</li>
        <li>CTA: Link to a specific on-site blog URL</li>
      </ul>

      <h2>What We’re Measuring</h2>
      <ul>
        <li>3-second hold rate</li>
        <li>Completion rate</li>
        <li>Profile clicks</li>
        <li>Outbound click-through to Gumroad</li>
      </ul>

      <h2>Package</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>
    </main>
  );
}
