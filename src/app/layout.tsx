import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://solgateskit.vercel.app"),
  title: "Solgateskit - Test pay-per-request APIs",
  description: "Test pay-per-request APIs on Solana devnet, testnet, and mainnet. Zero setup. Auto-creates wallets and handles 402 payments.",
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Solgateskit",
    description: "Test pay-per-request APIs. No wallet. No money. No setup.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Solgateskit",
    description: "Test pay-per-request APIs. No wallet. No money. No setup.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
