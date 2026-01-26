import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viral Dead Engine™ | ViralDead.pro",
  description:
    "A one-time viral content system for short-form platforms. No subscriptions. No ads. Commercial use included.",
  metadataBase: new URL("https://viraldead.pro"),
  openGraph: {
    title: "Viral Dead Engine™",
    description:
      "A one-time viral content system for short-form platforms. No subscriptions. No ads.",
    url: "https://viraldead.pro",
    siteName: "Viral Dead Engine™",
    images: [
      {
        url: "/hero-premium.png",
        width: 1200,
        height: 630,
        alt: "Viral Dead Engine™",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
