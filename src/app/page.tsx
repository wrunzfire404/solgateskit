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
        <section className="relative py-24 sm:py-32 grid-pattern">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-white">
                Pay-per-request<br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  without the payments.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                An SDK that intercepts HTTP 402 responses and resolves them automatically on testnet.
                Your code calls fetch — we handle wallets, faucets, and on-chain payment.
              </p>

              {/* Flow pills */}
              <div className="mt-8 flex flex-wrap items-center gap-1.5 text-xs font-mono">
                <span className="px-2.5 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-zinc-300">fetch()</span>
                <span className="text-zinc-600">→</span>
                <span className="px-2.5 py-1.5 rounded-md border border-yellow-500/25 bg-yellow-500/5 text-yellow-400">402</span>
                <span className="text-zinc-600">→</span>
                <span className="px-2.5 py-1.5 rounded-md border border-purple-500/25 bg-purple-500/5 text-purple-400">pay</span>
                <span className="text-zinc-600">→</span>
                <span className="px-2.5 py-1.5 rounded-md border border-blue-500/25 bg-blue-500/5 text-blue-400">retry</span>
                <span className="text-zinc-600">→</span>
                <span className="px-2.5 py-1.5 rounded-md border border-emerald-500/25 bg-emerald-500/5 text-emerald-400">200 OK</span>
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/playground"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
                >
                  Open Playground
                </Link>
                <code className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2.5 font-mono text-sm text-zinc-400">
                  $ npm install solgateskit-sdk
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-20 sm:py-28 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-purple-400">Quick Start</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Two sides. Both simple.</h2>
              <p className="mt-3 text-sm text-zinc-500 max-w-md mx-auto">
                Client auto-handles payment flow. Server adds one middleware line. That&apos;s the entire integration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Client */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-zinc-500">client.ts</span>
                  <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Client</span>
                </div>
                <div className="p-5 font-mono text-[13px] leading-[1.7] text-zinc-400 overflow-x-auto">
                  <div><span className="text-purple-400">import</span> {"{"} sgFetch {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">&quot;solgateskit-sdk&quot;</span>;</div>
                  <br />
                  <div className="text-zinc-600">{"// That's it. No wallet setup, no config."}</div>
                  <div><span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-blue-400">sgFetch</span>(<span className="text-emerald-400">&quot;https://api.example.com/data&quot;</span>);</div>
                  <div><span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> res.<span className="text-blue-400">json</span>();</div>
                  <br />
                  <div className="text-zinc-600">{"// Under the hood:"}</div>
                  <div className="text-zinc-600">{"// 1. Generated Solana keypair"}</div>
                  <div className="text-zinc-600">{"// 2. Airdropped SOL from faucet"}</div>
                  <div className="text-zinc-600">{"// 3. Server returned 402"}</div>
                  <div className="text-zinc-600">{"// 4. Sent 0.001 SOL on-chain"}</div>
                  <div className="text-zinc-600">{"// 5. Retried → 200 OK"}</div>
                </div>
              </div>

              {/* Server */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500/80" />
                  <span className="font-mono text-xs text-zinc-500">server.ts</span>
                  <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Server</span>
                </div>
                <div className="p-5 font-mono text-[13px] leading-[1.7] text-zinc-400 overflow-x-auto">
                  <div><span className="text-purple-400">import</span> {"{"} sgGate {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">&quot;solgateskit-sdk/server&quot;</span>;</div>
                  <br />
                  <div className="text-zinc-600">{"// One line. That's the server setup."}</div>
                  <div>app.<span className="text-blue-400">use</span>(<span className="text-emerald-400">&quot;/api/data&quot;</span>, <span className="text-blue-400">sgGate</span>({"{"}</div>
                  <div>{"  "}amount: <span className="text-yellow-400">0.001</span>,</div>
                  <div>{"  "}recipient: <span className="text-emerald-400">&quot;YOUR_WALLET&quot;</span>,</div>
                  <div>{"  "}network: <span className="text-emerald-400">&quot;devnet&quot;</span>,</div>
                  <div>{"}"}));</div>
                  <br />
                  <div>app.<span className="text-blue-400">get</span>(<span className="text-emerald-400">&quot;/api/data&quot;</span>, (req, res) =&gt; {"{"}</div>
                  <div>{"  "}res.<span className="text-blue-400">json</span>({"{"} data: <span className="text-emerald-400">&quot;premium&quot;</span> {"}"});</div>
                  <div>{"}"});</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 sm:py-28 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-purple-400">Protocol</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">The 402 flow, visualized.</h2>
              <p className="mt-3 text-sm text-zinc-500 max-w-lg mx-auto">
                HTTP 402 Payment Required exists since 1999. Solgateskit makes it real — on Solana.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "01", badge: "REQUEST", color: "zinc", title: "Your code calls fetch", desc: "Call sgFetch() with any URL. SDK auto-generates a Solana keypair and airdrops SOL from devnet faucet." },
                { step: "02", badge: "402", color: "yellow", title: "Server returns 402", desc: "API responds with HTTP 402 and a payment header specifying cost in SOL and recipient address." },
                { step: "03", badge: "SOL", color: "purple", title: "SDK pays on Solana", desc: "SDK builds a SOL transfer, signs with ephemeral keypair, confirms on-chain. Takes 1–3 seconds." },
                { step: "04", badge: "200", color: "emerald", title: "Data returned", desc: "SDK retries with payment receipt header. Server verifies on-chain and returns data." },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      item.color === "yellow" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                      item.color === "purple" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                      item.color === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">Step {item.step}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 sm:py-28 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-purple-400">Capabilities</span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Built for machines talking to machines.</h2>
              <p className="mt-3 text-sm text-zinc-500 max-w-md mx-auto">
                Every design decision optimizes for developer experience and API-first workflows.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { metric: "2 lines", title: "Zero Config", desc: "Import the SDK. Call fetch. Wallet creation, faucet funding, and payment handling are all automatic. No env vars, no accounts." },
                { metric: "RFC 7231", title: "HTTP 402 Protocol", desc: "Built on the HTTP standard for payment-required responses. Server returns 402 with payment terms, client pays, retries with proof." },
                { metric: "3 networks", title: "Devnet / Testnet / Mainnet", desc: "Test on devnet (free airdrop), testnet (free airdrop), or point at mainnet with a real wallet. Same SDK, one config flag." },
                { metric: "1 flag", title: "Production Path", desc: "Same SDK interface, same server middleware. When you're ready for production, swap one config flag. No rewrite needed." },
                { metric: "1 line", title: "Express Middleware", desc: "Server-side is a single middleware function — sgGate({ amount }). Drop it before any route handler." },
                { metric: "$SGK", title: "Token Ecosystem", desc: "Governance and utility token for the Solgateskit protocol. Stake, vote, and earn from protocol fees." },
              ].map((item) => (
                <div key={item.title} className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-all">
                  <span className="font-mono text-xs font-semibold text-purple-400">{item.metric}</span>
                  <h3 className="font-semibold text-sm text-white mt-2 mb-2 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 border-t border-[var(--border)]">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Stop mocking payments.<br />Start testing them.
            </h2>
            <p className="mt-4 text-sm text-zinc-500 max-w-md mx-auto">
              The playground lets you fire real requests against a live testnet server. See every step of the 402 flow as it happens.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
              >
                Open Playground
              </Link>
              <a
                href="https://github.com/solgateskit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface)]"
              >
                View on GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 inline-flex items-center gap-8 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-5">
              {[
                { value: "402", label: "HTTP Standard" },
                { value: "3", label: "Solana Networks" },
                { value: "$0", label: "Real Cost" },
              ].map((stat, i) => (
                <div key={stat.label} className={`text-center ${i > 0 ? "border-l border-[var(--border)] pl-8" : ""}`}>
                  <p className="text-xl font-bold font-mono text-purple-400">{stat.value}</p>
                  <p className="text-[11px] text-zinc-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
