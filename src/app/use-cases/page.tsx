"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const useCases = [
  {
    title: "AI API Monetization",
    description:
      "Charge per inference call. Let users pay only for what they consume — no subscriptions, no API keys to manage. Every request is a microtransaction on Solana.",
    snippet: `import { createGate } from "@solgateskit/server";

const gate = createGate({
  price: 0.001, // SOL per request
  endpoint: "/api/inference",
});

// User pays 0.001 SOL per call
const result = await gate.handle(req);`,
  },
  {
    title: "Premium Data Feeds",
    description:
      "Monetize market data, analytics, or proprietary datasets. Consumers pay per query — no monthly commitments, instant access on payment confirmation.",
    snippet: `import { createGate } from "@solgateskit/server";

const gate = createGate({
  price: 0.0005,
  endpoint: "/api/market-data",
  metadata: { feed: "real-time-ohlcv" },
});

// Each data request costs 0.0005 SOL
app.use("/api/market-data", gate.middleware());`,
  },
  {
    title: "Rate-Limited Public APIs",
    description:
      "Offer a free tier with rate limits, then let power users pay to bypass them. No signup required — just attach a payment to the request.",
    snippet: `import { createGate } from "@solgateskit/server";

const gate = createGate({
  price: 0.0002,
  endpoint: "/api/search",
  bypassRateLimit: true,
});

// Free: 10 req/min | Paid: unlimited
app.use("/api/search", gate.rateLimited({
  free: 10,
  paid: Infinity,
}));`,
  },
  {
    title: "Micropayment Content",
    description:
      "Pay-per-article, pay-per-query, pay-per-download. Unlock content instantly with a Solana transaction — no paywalls, no accounts, no friction.",
    snippet: `import { SolgatesClient } from "@solgateskit/client";

const client = new SolgatesClient({
  wallet: userWallet,
});

// Pay and read — one line
const article = await client.fetch(
  "https://api.example.com/articles/42",
  { price: 0.001 }
);`,
  },
];

export default function UseCasesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider mb-3">
              Use Cases
            </p>
            <h1 className="text-3xl font-bold text-white mb-4">
              What you can build with Solgateskit
            </h1>
            <p className="text-zinc-500 max-w-2xl">
              Every HTTP endpoint becomes a revenue stream. No subscriptions, no
              API key management, no billing infrastructure. Just pay-per-request
              on Solana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {useCase.title}
                </h3>
                <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
                  {useCase.description}
                </p>
                <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 p-4 overflow-x-auto">
                  <pre className="font-mono text-[12px] text-zinc-400 leading-relaxed whitespace-pre">
                    {useCase.snippet}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-[var(--border)] pt-12">
            <h2 className="text-xl font-semibold text-white mb-4">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors">
                <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider mb-2">
                  01
                </p>
                <h4 className="text-white font-medium mb-1">
                  Client sends request
                </h4>
                <p className="text-zinc-500 text-sm">
                  The SDK attaches a signed Solana transaction to the HTTP
                  request headers.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors">
                <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider mb-2">
                  02
                </p>
                <h4 className="text-white font-medium mb-1">
                  Server verifies payment
                </h4>
                <p className="text-zinc-500 text-sm">
                  Middleware validates the transaction on-chain before processing
                  the request.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors">
                <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider mb-2">
                  03
                </p>
                <h4 className="text-white font-medium mb-1">
                  Response delivered
                </h4>
                <p className="text-zinc-500 text-sm">
                  On confirmation, the API responds normally. Failed payments
                  return HTTP 402.
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
