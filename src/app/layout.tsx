import "./globals.css";

export const metadata = {
  title: "Viral Dead Engine™ | ViralDead.pro",
  description:
    "A one-time viral content system for short-form platforms. No subscriptions. No ads. Commercial use included.",
  metadataBase: new URL("https://viraldead.pro"),
  openGraph: {
    title: "Viral Dead Engine™",
    description:
      "A one-time viral content system for short-form platforms. No subscriptions. No ads. Commercial use included.",
    url: "https://viraldead.pro",
    siteName: "ViralDead.pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Dead Engine™",
    description:
      "A one-time viral content system for short-form platforms. No subscriptions. No ads. Commercial use included.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
