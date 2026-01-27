export const metadata = {
  title: "Tiny Dopamine Checklist: Simple Wins",
  description: "A micro-checklist that performs well as text-on-screen content.",
};

export default function Post() {
  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Tiny Dopamine Checklist: Simple Wins</h1>
      <p>
        People share content that makes them feel “capable.” Micro-checklists do that fast.
      </p>

      <h2>Use this overlay</h2>
      <ul>
        <li>Make bed ✅</li>
        <li>Drink water ✅</li>
        <li>10 deep breaths ✅</li>
        <li>One tiny task ✅</li>
      </ul>

      <h2>CTA</h2>
      <p>“More templates on the blog.”</p>

      <h2>Access</h2>
      <p>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc?src=viraldead&post=tiny-dopamine-checklist&vid=001"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the experiment package on Gumroad →
        </a>
      </p>
    </main>
  );
}
