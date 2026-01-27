import Link from "next/link";

export default function Page() {
  return (
    <main
      style={{
        padding: 40,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1>Viral Dead Engine</h1>

      <p>Build is live. Routing works.</p>

      <p style={{ marginTop: 20 }}>
        <a
          href="https://whitedbreeze.gumroad.com/l/nsjcc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy on Gumroad
        </a>
      </p>

      <p style={{ marginTop: 10 }}>
        <a
          href="https://viraldead.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs / License / AI Disclosure
        </a>
      </p>
    </main>
  );
}
