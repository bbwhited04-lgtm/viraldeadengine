import Script from "next/script";
import { LATEST_TIKTOK, LATEST_INSTAGRAM_REELS, SOCIAL } from "../lib/social";

function tiktokId(url: string) {
  const m = url.match(/\/video\/(\d+)/);
  return m ? m[1] : "";
}

export default function LatestVideoEmbeds() {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold mb-2">Latest Videos</h2>
      <p className="opacity-80 mb-6">
        Posted on TikTok + Instagram Reels. If embeds don’t load in your browser, the links still work.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <a className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer">TikTok Profile</a>
        <a className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram Profile</a>
      </div>

      <div className="grid md:grid-cols-3 gap-4 items-start">
        {LATEST_TIKTOK.map((u) => (
          <div key={u} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <blockquote className="tiktok-embed" cite={u} data-video-id={tiktokId(u)} style={{ maxWidth: 605, minWidth: 260 }}>
              <section>
                <a href={u} target="_blank" rel="noopener noreferrer">Watch on TikTok</a>
              </section>
            </blockquote>
          </div>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4 items-start">
        {LATEST_INSTAGRAM_REELS.map((u) => (
          <div key={u} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <blockquote className="instagram-media" data-instgrm-permalink={u} data-instgrm-version="14" style={{ width: "100%", margin: 0 }} />
            <div className="text-center mt-3 opacity-90">
              <a href={u} target="_blank" rel="noopener noreferrer">Open Reel</a>
            </div>
          </div>
        ))}
      </div>

      <Script async src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      <Script async src="https://www.instagram.com/embed.js" strategy="lazyOnload" />
    </section>
  );
}
