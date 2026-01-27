export const metadata = {
  title: "Docs & Disclosures",
  description: "Documentation, licensing terms, and AI disclosure for Viral Dead Engine."
};

export default function DocsPage() {
  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Docs, License & AI Disclosure</h1>

      <section style={{ marginTop: 24 }}>
        <h2>What Is Viral Dead Engine?</h2>
        <p>
          Viral Dead Engine is a distribution and experimentation platform designed to
          explore viral media mechanics, automated content pipelines, and audience routing.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>License</h2>
        <p>
          Unless otherwise stated, all software, documentation, and materials are provided
          under a proprietary license by DEAD APP CORP.
        </p>
        <p>
          Redistribution, resale, or reuse without written permission is prohibited.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>AI Disclosure</h2>
        <p>
          This platform may generate, curate, or distribute content created wholly or
          partially using artificial intelligence systems.
        </p>
        <p>
          AI-generated content is provided for informational, experimental, or creative
          purposes only and should not be relied upon as professional advice.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Data Sources</h2>
        <p>
          Content may be derived from licensed datasets, public-domain materials, or
          user-submitted inputs. No guarantee is made regarding completeness or accuracy.
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Company</h2>
        <p>
          <strong>DEAD APP CORP</strong><br />
          United States
        </p>
      </section>
    </main>
  );
}
