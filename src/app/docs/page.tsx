import Link from "next/link";
import SocialBar from "../../components/SocialBar";
import LatestVideoEmbeds from "../../components/LatestVideoEmbeds";
import { SOCIAL } from "../../lib/social";

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-4xl font-extrabold">Docs, License & AI Disclosure</h1>
        <Link className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" href="/">Home</Link>
      </div>

      <div className="mt-6 space-y-6 opacity-90 leading-relaxed">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-extrabold mb-2">What Is Viral Dead Engine?</h2>
          <p>
            Viral Dead Engine is a distribution and experimentation platform designed to explore viral media mechanics,
            automated content pipelines, and audience routing.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-extrabold mb-2">License</h2>
          <p>
            Unless otherwise stated, all software, documentation, and materials are provided under a proprietary license by DEAD APP CORP.
            Redistribution, resale, or reuse without written permission is prohibited.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-extrabold mb-2">AI Disclosure</h2>
          <p>
            This platform may generate, curate, or distribute content created wholly or partially using artificial intelligence systems.
            AI-generated content is provided for informational, experimental, or creative purposes only and should not be relied upon as professional advice.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-extrabold mb-2">Data Sources</h2>
          <p>
            Content may be derived from licensed datasets, public-domain materials, or user-submitted inputs.
            No guarantee is made regarding completeness or accuracy.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-2xl font-extrabold mb-2">Company</h2>
          <p><b>DEAD APP CORP</b> • United States</p>
          <p>
            <a className="underline hover:no-underline" href={SOCIAL.gumroad} target="_blank" rel="noopener noreferrer">
              Get the experiment package on Gumroad →
            </a>
          </p>
          <p className="opacity-80 mt-2">
            Static hubs: <a className="underline" href="/bio.html">/bio.html</a> • <a className="underline" href="/latest-videos.html">/latest-videos.html</a>
          </p>
        </section>
      </div>

      <SocialBar />

      <LatestVideoEmbeds />
    </main>
  );
}
