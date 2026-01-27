export const metadata = {
  title: "POST TITLE HERE",
  description: "One-line description here (SEO).",
};

export default function BlogPostTemplate() {
  return (
    <main style={{ paddingTop: 32 }}>
      <h1>POST TITLE HERE</h1>

      <p>
        Hook paragraph: 1–2 lines max. Make it scannable and “viral-friendly.”
      </p>

      <h2>What this is</h2>
      <ul>
        <li>Bullet 1 (what the viewer gets)</li>
        <li>Bullet 2 (why it works)</li>
        <li>Bullet 3 (how to reuse)</li>
      </ul>

      <h2>Try it</h2>
      <p>
        Quick instructions: 2–4 lines. Keep it actionable and simple.
      </p>

      <h2>Download / Access</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc?src=viraldead&post=SLUG&vid=001"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>

      <p style={{ marginTop: 18, opacity: 0.75 }}>
        Tip: Use tracking params like <code>?src=tiktok&vid=001</code> on this page URL.
      </p>
    </main>
  );
}
