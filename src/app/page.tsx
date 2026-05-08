"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-0)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-sm">
            <span className="w-5 h-5 rounded bg-[var(--accent)] flex items-center justify-center text-[10px] text-black font-black">S</span>
            <span>Solgateskit</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-[var(--ink-2)]">
            <Link href="/playground" className="hover:text-white transition-colors">Playground</Link>
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <a href="https://x.com/solgateskit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
          </div>
          <div className="flex items-center gap-3">
            <code className="hidden sm:block text-xs px-3 py-1.5 rounded-md bg-[var(--bg-1)] border border-[var(--border)] text-[var(--ink-2)] font-mono">
              npm i solgateskit-sdk
            </code>
            <Link
              href="/playground"
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-[var(--accent-dim)] text-white hover:bg-[var(--accent)] transition-colors"
            >
              Try it
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
          >
            Pay-per-request{" "}
            <span className="gradient-text">without the payments.</span>
          </motion.h1>

          <motion.p
            custom={1}
            variants={fadeUp}
            className="mt-6 text-lg text-[var(--ink-2)] leading-relaxed max-w-2xl"
          >
            An SDK that intercepts HTTP 402 responses and resolves them automatically on Solana testnet.
            Your code calls fetch — we handle wallets, faucets, and on-chain payment.
          </motion.p>

          {/* Flow visualization */}
          <motion.div
            custom={2}
            variants={fadeUp}
            className="mt-10 flex items-center gap-2 text-sm font-mono"
          >
            {["fetch()", "402", "pay", "retry", "200 OK"].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md border ${
                  i === 0 ? "bg-[var(--bg-1)] border-[var(--border)] text-[var(--ink)]" :
                  i === 1 ? "bg-yellow-500/10 border-yellow-500/30 text-[var(--yellow)]" :
                  i === 2 ? "bg-purple-500/10 border-purple-500/30 text-[var(--accent)]" :
                  i === 3 ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                  "bg-green-500/10 border-green-500/30 text-[var(--green)]"
                }`}>
                  {step}
                </span>
                {i < 4 && <span className="text-[var(--ink-3)]">→</span>}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div custom={3} variants={fadeUp} className="mt-10 flex items-center gap-4">
            <Link
              href="/playground"
              className="px-5 py-2.5 rounded-lg bg-[var(--accent-dim)] text-white font-medium text-sm hover:bg-[var(--accent)] transition-all"
            >
              Open Playground
            </Link>
            <code className="text-sm px-4 py-2.5 rounded-lg bg-[var(--bg-1)] border border-[var(--border)] text-[var(--ink-2)] font-mono">
              $ npm install solgateskit-sdk
            </code>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Start - Code Examples */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3">Quick Start</p>
          <h2 className="text-3xl font-bold">Two sides. Both simple.</h2>
          <p className="mt-3 text-[var(--ink-2)] max-w-lg mx-auto">
            Client auto-handles payment flow. Server adds one middleware check. That&apos;s the entire integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Client code */}
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-1)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)]" />
              <span className="text-xs font-mono text-[var(--ink-2)]">client.ts</span>
            </div>
            <pre className="!rounded-none !border-0 !m-0 text-[13px]">
              <code>{`import { sgFetch } from "solgateskit-sdk";

// That's it. No wallet setup, no config.
const res = await sgFetch("https://api.example.com/data");
const data = await res.json();

// What happened under the hood:
// 1. SDK generated a Solana keypair
// 2. Airdropped SOL from devnet faucet
// 3. Server returned 402 Payment Required
// 4. SDK sent 0.001 SOL on Solana
// 5. Retried with payment proof → 200 OK`}</code>
            </pre>
          </div>

          {/* Server code */}
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-1)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs font-mono text-[var(--ink-2)]">server.ts</span>
            </div>
            <pre className="!rounded-none !border-0 !m-0 text-[13px]">
              <code>{`import { sgGate } from "solgateskit-sdk/server";

// One line. That's the entire server setup.
app.use("/api/data", sgGate({
  amount: 0.001,        // SOL per request
  recipient: "YOUR_WALLET",
  network: "devnet",
}));

app.get("/api/data", (req, res) => {
  // Only reached after payment verified
  res.json({ data: "premium content" });
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Protocol Flow */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3">Protocol</p>
          <h2 className="text-3xl font-bold">The 402 flow, visualized.</h2>
          <p className="mt-3 text-[var(--ink-2)] max-w-lg mx-auto">
            HTTP 402 Payment Required exists since 1999. Solgateskit makes it real — on Solana.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: "REQUEST", color: "var(--ink)", label: "01", title: "Your code calls fetch", desc: "Call sgFetch() with any URL. SDK auto-generates a Solana keypair and airdrops SOL from devnet faucet." },
            { step: "402", color: "var(--yellow)", label: "02", title: "Server returns 402", desc: "API responds with HTTP 402 and a payment header specifying cost in SOL and recipient address." },
            { step: "SOL", color: "var(--accent)", label: "03", title: "SDK pays on Solana", desc: "SDK builds a SOL transfer, signs with ephemeral keypair, confirms on-chain. Takes 1-3 seconds." },
            { step: "200", color: "var(--green)", label: "04", title: "Data returned", desc: "SDK retries with payment receipt header. Server verifies on-chain and returns data." },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-1)] hover:border-[var(--border-2)] transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{ color: item.color, background: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
                >
                  {item.step}
                </span>
                <span className="text-[10px] text-[var(--ink-3)] font-mono">Step {item.label}</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-[var(--ink-2)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3">Capabilities</p>
          <h2 className="text-3xl font-bold">Built for machines talking to machines.</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { metric: "2 lines", title: "Zero Config", desc: "Import the SDK. Call fetch. Wallet creation, faucet funding, and payment handling are all automatic." },
            { metric: "RFC 7231", title: "HTTP 402 Protocol", desc: "Built on the HTTP standard for payment-required responses. RESTful, stateless, inspectable." },
            { metric: "3 networks", title: "Devnet / Testnet / Mainnet", desc: "Test on devnet (free airdrop), testnet, or mainnet with real SOL. Same SDK, one config flag." },
            { metric: "1 flag", title: "Production Path", desc: "Same interface for testing and production. When ready, swap one config flag. No rewrite needed." },
            { metric: "1 line", title: "Server Middleware", desc: "Server-side is a single function — sgGate({ amount }). Drop it before any route handler." },
            { metric: "$SGK", title: "Token Ecosystem", desc: "Governance and utility token for the Solgateskit ecosystem. Stake, vote, and earn from protocol fees." },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-1)] hover:border-[var(--border-2)] transition-colors group"
            >
              <span className="text-xs font-mono text-[var(--accent)] font-semibold">{item.metric}</span>
              <h3 className="font-semibold mt-2 mb-2 group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--border)]">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Stop mocking payments.<br />Start testing them.
          </h2>
          <p className="text-[var(--ink-2)] mb-8 max-w-md mx-auto">
            The playground lets you fire real requests against a live devnet server. See every step of the 402 flow.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/playground"
              className="px-5 py-2.5 rounded-lg bg-[var(--accent-dim)] text-white font-medium text-sm hover:bg-[var(--accent)] transition-all"
            >
              Open Playground
            </Link>
            <a
              href="https://github.com/solgateskit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium hover:border-[var(--border-2)] transition-colors"
            >
              View on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center justify-center gap-8 text-center">
            {[
              { value: "402", label: "HTTP Standard" },
              { value: "3", label: "Solana Networks" },
              { value: "$0", label: "Real Cost (devnet)" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold font-mono text-[var(--accent)]">{stat.value}</p>
                <p className="text-xs text-[var(--ink-3)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--ink-3)]">
            <span className="w-4 h-4 rounded bg-[var(--accent)] flex items-center justify-center text-[8px] text-black font-black">S</span>
            <span>solgateskit.com · Built on Solana · $SGK</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--ink-3)]">
            <a href="https://x.com/solgateskit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
            <span>·</span>
            <a href="https://github.com/solgateskit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span>·</span>
            <a href="https://www.npmjs.com/package/solgateskit-sdk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">npm</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
