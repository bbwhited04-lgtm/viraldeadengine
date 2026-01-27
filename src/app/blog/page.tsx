import Link from "next/link";
import SocialBar from "../../components/SocialBar";
import LatestVideoEmbeds from "../../components/LatestVideoEmbeds";

const posts = [
  { href: "/blog/first-test", title: "First Viral Test: Short-Form Media Loops" },
  { href: "/blog/cute-kittens-loop", title: "Cute Kittens Loop: The 7–11 Second Trick" },
  { href: "/blog/baby-bears-in-snow", title: "Baby Bears in Snow: Instant Scroll-Stop" },
  { href: "/blog/oddly-satisfying-marble", title: "Oddly Satisfying: Marble Run Loops" },
  { href: "/blog/calm-rain-window", title: "Calm Rain Window: Background Loops That Convert" },
  { href: "/blog/retro-90s-vhs", title: "Retro 90s VHS Aesthetic: Nostalgia Wins" },
  { href: "/blog/tiny-dopamine-checklist", title: "Tiny Dopamine Checklist: Simple Wins" },
  { href: "/blog/pet-affirmations", title: "Pet Affirmations: Wholesome + Shareable" },
  { href: "/blog/cozy-winter-village", title: "Cozy Winter Village: The Comfort Loop" },
  { href: "/blog/wholesome-dad-jokes", title: "Wholesome Dad Jokes: Comment Bait That Isn’t Toxic" },
  { href: "/blog/quick-focus-reset", title: "Quick Focus Reset: 20 Seconds" },
];

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-4xl font-extrabold">Blog</h1>
        <Link className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10" href="/">Home</Link>
      </div>

      <p className="opacity-80 mt-3">
        Short posts that power the Viral Dead Engine distribution loop. Each post can be used as a landing page target for short-form content.
      </p>

      <SocialBar />

      <ul className="mt-8 list-disc pl-6 space-y-2">
        {posts.map((p) => (
          <li key={p.href}>
            <Link className="underline hover:no-underline" href={p.href}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <LatestVideoEmbeds />
    </main>
  );
}
