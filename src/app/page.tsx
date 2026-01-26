const GUMROAD_URL = "https://whitedbreeze.gumroad.com/l/nsjcc";
const DOCS_URL = "https://viraldead.info";
const SUPPORT_EMAIL = "support@viraldead.pro";

const faq = [
  {
    q: "Is this a subscription?",
    a: "No. This is a one-time purchase with lifetime use.",
  },
  {
    q: "Can I use this commercially?",
    a: "Yes. Commercial use is permitted under the included license.",
  },
  {
    q: "Do I need special software?",
    a: "No. It works with any AI image or video generator you already use.",
  },
  {
    q: "Does this guarantee viral results?",
    a: "No. It provides proven patterns and workflows, not guarantees.",
  },
  {
    q: "Is this platform-safe?",
    a: "It’s designed around AI-generated, brand-safe content patterns and includes disclosures and guardrails.",
  },
];

export default function Page() {
  return (
    <main className="page">
      {/* Top bar */}
      <header className="topbar">
        <div className="wrap topbarInner">
          <div className="brand">
            <div className="mark" aria-hidden />
            <span>ViralDead.pro</span>
          </div>
          <nav className="nav">
            <a href="#whats-inside">What you get</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a className="ghost" href={DOCS_URL} target="_blank" rel="noreferrer">
              Docs
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="wrap heroGrid">
          <div>
            <h1 className="h1">Viral Dead Engine™</h1>
            <p className="sub">
              A one-time viral content system for short-form platforms.
            </p>
            <p className="support">
              No subscriptions. No ads. Commercial use included.
            </p>

            <div className="ctaRow">
              <a className="btn" href={GUMROAD_URL} target="_blank" rel="noreferrer">
                Get Viral Dead Engine™
              </a>
              <a className="btn secondary" href={DOCS_URL} target="_blank" rel="noreferrer">
                License & Docs
              </a>
            </div>

            <div className="mini">
              Delivered instantly as a ZIP • Lifetime use • Built for daily output
            </div>
          </div>

          <div className="heroCard" aria-label="Product hero image">
            {/* Put your premium image at /public/hero-premium.png */}
            <div className="imgFrame">
              <img
                src="/hero-premium.png"
                alt="Premium abstract viral engine hero artwork"
                className="img"
              />
            </div>
            <div className="heroCardFooter">
              <div className="pill">PRO License</div>
              <div className="pill">One-time purchase</div>
              <div className="pill">Commercial use</div>
            </div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="section">
        <div className="wrap">
          <h2 className="h2">What it does</h2>
          <p className="p">
            Viral Dead Engine™ is a reusable system designed to help you create
            consistent, algorithm-friendly short-form content without relying on ads,
            subscriptions, or platform lock-in. Built to be used daily, not once.
          </p>

          <div className="grid3">
            <div className="card">
              <h3 className="h3">Creation</h3>
              <p className="p">
                Prompt frameworks for high-retention visuals and short loop concepts.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">Distribution</h3>
              <p className="p">
                Platform-specific caption engines for TikTok, IG Reels, and Facebook.
              </p>
            </div>
            <div className="card">
              <h3 className="h3">Consistency</h3>
              <p className="p">
                A daily “10x posting” workflow you can run fast with minimal friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="section" id="whats-inside">
        <div className="wrap">
          <h2 className="h2">What you get</h2>

          <div className="twoCol">
            <div className="card">
              <h3 className="h3">Included</h3>
              <ul className="list">
                <li>Viral image prompt library</li>
                <li>Short-loop video prompt system (5–8 second replay-optimized loops)</li>
                <li>Emotion-based hook frameworks</li>
                <li>Platform-specific caption engines</li>
                <li>Evergreen hashtag pools</li>
                <li>Daily “10x posting” workflow</li>
                <li>Commercial-use license</li>
                <li>Lifetime access (one-time purchase)</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="h3">Clear expectations</h3>
              <ul className="list">
                <li>No guarantees of virality</li>
                <li>Not a SaaS or automation app</li>
                <li>Does not auto-post for you (yet)</li>
                <li>No scraped or copyrighted media</li>
                <li>Designed around brand-safe AI workflows</li>
              </ul>

              <div className="note">
                Full license terms and AI disclosures live at{" "}
                <a href={DOCS_URL} target="_blank" rel="noreferrer">
                  viraldead.info
                </a>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="wrap">
          <h2 className="h2">Pricing</h2>

          <div className="pricing">
            <div className="priceCard">
              <div className="priceTop">
                <div>
                  <div className="priceName">Viral Dead Engine™</div>
                  <div className="priceTier">PRO License</div>
                </div>
                <div className="priceValue">$97</div>
              </div>

              <ul className="list">
                <li>One-time purchase</li>
                <li>Lifetime use</li>
                <li>Commercial use included</li>
                <li>Instant download</li>
              </ul>

              <a className="btn" href={GUMROAD_URL} target="_blank" rel="noreferrer">
                Get Viral Dead Engine™
              </a>

              <div className="mini">
                Questions?{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="wrap">
          <h2 className="h2">FAQ</h2>
          <div className="faq">
            {faq.map((item) => (
              <details key={item.q} className="faqItem">
                <summary>{item.q}</summary>
                <div className="faqA">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap footerInner">
          <div>
            <div className="footerBrand">Viral Dead Engine™</div>
            <div className="mini">by ViralDead.pro</div>
          </div>
          <div className="footerLinks">
            <a href={DOCS_URL} target="_blank" rel="noreferrer">
              Documentation & License
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`}>Support</a>
            <a href={GUMROAD_URL} target="_blank" rel="noreferrer">
              Buy on Gumroad
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
