// redeploy
import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: {
    default: "Viral Dead Engine",
    template: "%s | Viral Dead Engine",
  },
  description: "Viral Dead Engine — tools, docs, and distribution for viral content.",
  metadataBase: new URL("https://www.viraldead.pro"),
};

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="container">
            <div className="brand">
              <span className="brandMark">⚡</span>
              <span className="brandName">Viral Dead Engine</span>
            </div>

            <nav className="nav">
  <a href="/" className="navLink">Home</a>

  <a href="/blog" className="navLink">
    Blog
  </a>

  <a href="/docs" className="navLink">
    Docs
  </a>

  <a
    href="https://whitedbreeze.gumroad.com/l/nsjcc"
    className="navCta"
    target="_blank"
    rel="noopener noreferrer"
  >
    Buy
  </a>
</nav>

          </div>
        </header>

        <div className="container">{children}</div>

        <footer className="siteFooter">
          <div className="container footerInner">
            <div className="footerLeft">
              <div className="footerTitle">Viral Dead Engine</div>
              <div className="footerSub">© {new Date().getFullYear()} DEAD APP CORP</div>
            </div>

            <div className="footerRight">
              <a href="/docs">License / AI Disclosure</a>
              <a
                href="https://whitedbreeze.gumroad.com/l/nsjcc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gumroad
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
