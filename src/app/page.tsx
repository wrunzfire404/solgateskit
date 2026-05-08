"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white">
                Pay-per-request<br />without the payments.
              </h1>
              <p className="mt-6 text-base text-zinc-400 leading-relaxed max-w-xl">
                An SDK that intercepts HTTP 402 responses and resolves them automatically on testnet. Your code calls fetch — we handle wallets, faucets, and on-chain payment.
              </p>

              {/* Flow */}
              <div className="mt-8 flex flex-wrap items-center gap-1.5 font-mono text-xs">
                <span className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--surface)] text-zinc-300">fetch()</span>
                <span className="text-zinc-700">→</span>
                <span className="px-2 py-1 rounded border border-zinc-700/50 bg-zinc-800/30 text-zinc-400">402</span>
                <span className="text-zinc-700">→</span>
                <span className="px-2 py-1 rounded border border-zinc-700/50 bg-zinc-800/30 text-zinc-400">pay</span>
                <span className="text-zinc-700">→</span>
                <span className="px-2 py-1 rounded border border-zinc-700/50 bg-zinc-800/30 text-zinc-400">retry</span>
                <span className="text-zinc-700">→</span>
                <span className="px-2 py-1 rounded border border-green-900/40 bg-green-950/30 text-green-500">200 OK</span>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/playground" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors">
                  Open Playground
                </Link>
                <code className="rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 font-mono text-sm text-zinc-500">
                  $ npm install solgateskit-sdk
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-20 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6">
            <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider">Quick Start</span>
            <h2 className="mt-2 text-2xl font-bold text-white">Two sides. Both simple.</h2>
            <p className="mt-2 text-sm text-zinc-500">Client auto-handles payment flow. Server adds one middleware line.</p>

            <div className="mt-10 grid md:grid-cols-2 gap-5">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  <span className="font-mono text-[11px] text-zinc-500">client.ts</span>
                </div>
                <pre className="p-5 text-[13px] leading-[1.7] text-zinc-400 overflow-x-auto"><code>{`import { sgFetch } from "solgateskit-sdk";

// That's it. No wallet setup, no config.
const res = await sgFetch(
  "https://api.example.com/data"
);
const data = await res.json();

// Under the hood:
// 1. SDK generated a Solana keypair
// 2. Airdropped SOL from devnet faucet
// 3. Server returned 402 Payment Required
// 4. SDK sent 0.001 SOL on Solana
// 5. Retried with payment proof → 200 OK`}</code></pre>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  <span className="font-mono text-[11px] text-zinc-500">server.ts</span>
                </div>
                <pre className="p-5 text-[13px] leading-[1.7] text-zinc-400 overflow-x-auto"><code>{`import { sgGate } from "solgateskit-sdk/server";

// One line. That's the entire server setup.
app.use("/api/data", sgGate({
  amount: 0.001,        // SOL per request
  recipient: "YOUR_WALLET",
  network: "devnet",
}));

app.get("/api/data", (req, res) => {
  // Only reached after payment verified
  res.json({ data: "premium content" });
});`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Protocol */}
        <section className="py-20 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6">
            <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider">Protocol</span>
            <h2 className="mt-2 text-2xl font-bold text-white">The 402 flow, visualized.</h2>
            <p className="mt-2 text-sm text-zinc-500">HTTP 402 Payment Required exists since 1999. Solgateskit makes it real — on Solana.</p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { n: "01", badge: "REQUEST", title: "Your code calls fetch", desc: "Call sgFetch() with any URL. SDK auto-generates a Solana keypair and airdrops SOL from the devnet/testnet faucet." },
                { n: "02", badge: "402", title: "Server returns 402", desc: "The API responds with HTTP 402 Payment Required and a header specifying the cost in SOL and the recipient address." },
                { n: "03", badge: "SOL", title: "SDK pays on Solana", desc: "The SDK builds a SOL transfer transaction, signs it with the ephemeral keypair, and confirms it on Solana. 1–3 seconds." },
                { n: "04", badge: "200 OK", title: "Data returned", desc: "SDK retries the original request with a payment receipt header. Server verifies on-chain and returns data." },
              ].map((item) => (
                <div key={item.n} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold text-zinc-500">{item.n}</span>
                    <span className="font-mono text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">{item.badge}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6">
            <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider">Capabilities</span>
            <h2 className="mt-2 text-2xl font-bold text-white">Built for machines talking to machines.</h2>
            <p className="mt-2 text-sm text-zinc-500">Every design decision optimizes for developer experience and API-first workflows.</p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { metric: "2 lines", title: "Zero Config", desc: "Import the SDK. Call fetch. Wallet creation, faucet funding, and payment handling are all automatic. No env vars, no accounts, no onboarding flow." },
                { metric: "RFC 7231", title: "HTTP 402 Protocol", desc: "Built on the HTTP standard for payment-required responses. Server returns 402 with payment terms, client pays, retries with proof. RESTful, stateless, inspectable." },
                { metric: "3 networks", title: "3 Networks", desc: "Test on devnet (free airdrop), testnet (free airdrop), or point at mainnet with a real wallet. Same SDK, same interface — one config flag to switch." },
                { metric: "1 flag", title: "Production Path", desc: "Same SDK interface, same server middleware. When you're ready for production, swap one config flag. No rewrite, no new integration, no new mental model." },
                { metric: "1 line", title: "Express Middleware", desc: "Server-side is a single middleware function — sgGate({ amount }). Drop it before any route handler. Works with existing auth, rate limiting, and error handling." },
                { metric: "6 events", title: "Event Hooks", desc: "onStep callback gives you real-time visibility into the payment lifecycle. Wallet creation, faucet funding, payment submission, confirmation — all observable." },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-colors">
                  <span className="font-mono text-xs text-zinc-500">{item.metric}</span>
                  <h3 className="font-semibold text-sm text-white mt-2 mb-2">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white">Stop mocking payments.<br />Start testing them.</h2>
            <p className="mt-4 text-sm text-zinc-500 max-w-md mx-auto">
              The playground lets you fire real requests against a live testnet server. See every step of the 402 flow as it happens.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/playground" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors">Open Playground</Link>
              <a href="https://github.com/solgateskit" target="_blank" rel="noopener noreferrer" className="rounded-md border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-[var(--border-hover)] hover:bg-[var(--surface)] transition-colors">View on GitHub</a>
            </div>
            <div className="mt-12 inline-flex items-center gap-6 sm:gap-8 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-6 sm:px-8 py-5">
              <div className="text-center"><p className="text-lg font-bold font-mono text-white">402</p><p className="text-[10px] text-zinc-600 mt-1">HTTP Standard</p></div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div className="text-center"><p className="text-lg font-bold font-mono text-white">3</p><p className="text-[10px] text-zinc-600 mt-1">Solana Networks</p></div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div className="text-center"><p className="text-lg font-bold font-mono text-white">$0</p><p className="text-[10px] text-zinc-600 mt-1">Real Cost</p></div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
