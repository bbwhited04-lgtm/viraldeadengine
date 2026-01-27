import { CROSS_LINKS, SOCIAL } from "../lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-14">
      <div className="mx-auto max-w-6xl px-5 py-10 grid md:grid-cols-3 gap-8 text-sm opacity-90">
        <div>
          <div className="font-extrabold mb-2">Viral Dead Engine</div>
          <div className="opacity-80">© 2026 DEAD APP CORP</div>
        </div>
        <div>
          <div className="font-extrabold mb-2">Cross Links</div>
          <ul className="space-y-1">
            {Object.entries(CROSS_LINKS).map(([k,v]) => (
              <li key={k}><a className="underline hover:no-underline" href={v} target="_blank" rel="noopener noreferrer">{k}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-extrabold mb-2">Social</div>
          <ul className="space-y-1">
            {Object.entries(SOCIAL).map(([k,v]) => (
              <li key={k}><a className="underline hover:no-underline" href={v} target="_blank" rel="noopener noreferrer">{k}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
