"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ecosystemItems = [
  {
    label: "SDK",
    title: "@solgateskit/client",
    description:
      "The core npm package. Drop-in fetch wrapper that attaches Solana payments to any HTTP request. Works in Node.js, browsers, and edge runtimes.",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    ),
    meta: "npm install @solgateskit/client",
  },
  {
    label: "Server",
    title: "Server Middleware",
    description:
      "Express/Next.js/Hono middleware that validates payment headers, confirms transactions on-chain, and gates access to your endpoints.",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
    meta: "npm install @solgateskit/server",
  },
  {
    label: "Playground",
    title: "Interactive Testing",
    description:
      "Browser-based playground to test pay-per-request flows against devnet. Simulate payments, inspect headers, and debug integration issues in real time.",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    meta: "playground.solgateskit.dev",
  },
  {
    label: "Protocol",
    title: "HTTP 402 Spec",
    description:
      "The open protocol specification. Defines how payment requirements are communicated via HTTP 402 headers, transaction formats, and verification flows.",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
    meta: "X-Solana-Pay / X-SGK-Price headers",
  },
  {
    label: "Token",
    title: "$SGK Token",
    description:
      "Governance and utility token. Stake to reduce protocol fees, vote on upgrades, and earn from the network's transaction volume.",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    ),
    meta: "Governance + fee reduction",
  },
  {
    label: "Community",
    title: "Open Source Community",
    description:
      "Built in the open. Contribute on GitHub, follow updates on X, and install packages from npm. Join the developers building the pay-per-request web.",
    icon: (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    meta: "GitHub / X / npm",
  },
];

export default function EcosystemPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider mb-3">
              Ecosystem
            </p>
            <h1 className="text-3xl font-bold text-white mb-4">
              The Solgateskit ecosystem
            </h1>
            <p className="text-zinc-500 max-w-2xl">
              Everything you need to build, test, and deploy pay-per-request
              APIs on Solana. From client SDKs to protocol specs — all open
              source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>
                <div className="mt-auto pt-3 border-t border-zinc-800">
                  <p className="font-mono text-[11px] text-zinc-600">
                    {item.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-[var(--border)] pt-12">
            <h2 className="text-xl font-semibold text-white mb-6">
              Architecture overview
            </h2>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center">
                <div className="rounded-lg bg-zinc-800/50 border border-zinc-700/50 p-3">
                  <p className="text-zinc-300 text-sm font-medium">Client</p>
                  <p className="text-zinc-600 text-xs mt-1">SDK / Wallet</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <span className="text-zinc-700">&rarr;</span>
                </div>
                <div className="rounded-lg bg-zinc-800/50 border border-zinc-700/50 p-3">
                  <p className="text-zinc-300 text-sm font-medium">
                    HTTP + Payment
                  </p>
                  <p className="text-zinc-600 text-xs mt-1">402 Protocol</p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <span className="text-zinc-700">&rarr;</span>
                </div>
                <div className="rounded-lg bg-zinc-800/50 border border-zinc-700/50 p-3">
                  <p className="text-zinc-300 text-sm font-medium">Server</p>
                  <p className="text-zinc-600 text-xs mt-1">
                    Middleware + API
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-zinc-600 text-xs">
                  Solana confirms transactions in ~400ms — fast enough for
                  real-time API gating
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
