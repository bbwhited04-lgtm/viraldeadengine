import Link from "next/link";
import { SOCIAL } from "../lib/social";

type Props = { compact?: boolean };

export default function SocialBar({ compact }: Props) {
  const cls = compact
    ? "flex flex-wrap gap-2 text-sm opacity-90"
    : "flex flex-wrap gap-2 text-sm opacity-90 mt-4";

  const btn =
    "px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10";

  return (
    <div className={cls}>
      <a className={btn} href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
      <a className={btn} href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
      <a className={btn} href={SOCIAL.threads} target="_blank" rel="noopener noreferrer">Threads</a>
      <a className={btn} href={SOCIAL.x} target="_blank" rel="noopener noreferrer">X</a>
      <a className={btn} href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a className={btn} href={SOCIAL.gumroad} target="_blank" rel="noopener noreferrer">Gumroad</a>
      {!compact && <Link className={btn} href="/blog">Blog</Link>}
      {!compact && <Link className={btn} href="/docs">Docs</Link>}
    </div>
  );
}
