"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <div className="mx-auto max-w-4xl px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-purple-400">Documentation</span>
            <h1 className="mt-2 text-3xl font-bold text-white">Getting Started</h1>
            <p className="mt-3 text-sm text-zinc-500 max-w-lg">
              Everything you need to integrate Solgateskit into your project. From zero to paid API in under 5 minutes.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {/* Install */}
            <section>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-mono text-purple-400">1</span>
                Installation
              </h2>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-zinc-600" />
                  <span className="font-mono text-[11px] text-zinc-600">terminal</span>
                </div>
                <div className="p-4 font-mono text-sm text-zinc-300">
                  <span className="text-zinc-600">$</span> npm install solgateskit-sdk
                </div>
              </div>
            </section>

            {/* Client */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-mono text-purple-400">2</span>
                Client Usage
              </h2>
              <p className="text-sm text-zinc-500 mb-4 ml-8">
                The client SDK wraps <code className="text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded text-xs">fetch()</code>.
                When a server returns 402, the SDK handles payment and retries automatically.
              </p>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[11px] text-zinc-600">client.ts</span>
                </div>
                <pre className="p-4 font-mono text-[13px] leading-[1.7] text-zinc-400 overflow-x-auto !bg-transparent !border-0 !rounded-none !m-0">{`import { sgFetch } from "solgateskit-sdk";

// Basic — auto handles everything
const response = await sgFetch("https://api.example.com/premium");
const data = await response.json();

// With options
const response = await sgFetch("https://api.example.com/data", {
  network: "devnet",     // devnet | testnet | mainnet
  maxPayment: 0.01,     // Max SOL willing to pay
  onStep: (step) => {   // Lifecycle hooks
    console.log(step);  // "keygen" | "airdrop" | "payment" | "verify"
  },
});`}</pre>
              </div>
            </section>

            {/* Server */}
            <section>
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-mono text-purple-400">3</span>
                Server Middleware
              </h2>
              <p className="text-sm text-zinc-500 mb-4 ml-8">
                Add payment gating to any route with a single function call.
              </p>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="font-mono text-[11px] text-zinc-600">server.ts</span>
                </div>
                <pre className="p-4 font-mono text-[13px] leading-[1.7] text-zinc-400 overflow-x-auto !bg-transparent !border-0 !rounded-none !m-0">{`import { sgGate } from "solgateskit-sdk/server";

// Express middleware
app.use("/api/premium", sgGate({
  amount: 0.001,              // SOL per request
  recipient: "YOUR_WALLET",   // Your Solana address
  network: "devnet",          // Network to verify on
}));

app.get("/api/premium", (req, res) => {
  // Only reached after payment verified
  res.json({ data: "premium content" });
});`}</pre>
              </div>
            </section>

            {/* Protocol */}
            <section id="api-ref">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-mono text-purple-400">4</span>
                Protocol Headers
              </h2>
              <div className="rounded-xl border border-[var(--border)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
                      <th className="text-left px-4 py-3 font-medium text-zinc-400 text-xs">Header</th>
                      <th className="text-left px-4 py-3 font-medium text-zinc-400 text-xs">Direction</th>
                      <th className="text-left px-4 py-3 font-medium text-zinc-400 text-xs">Description</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                    <tr className="border-b border-[var(--border)]">
                      <td className="px-4 py-3 text-purple-400">X-Payment-Request</td>
                      <td className="px-4 py-3 text-zinc-500">Server → Client</td>
                      <td className="px-4 py-3 text-zinc-500">JSON: amount, recipient, network</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="px-4 py-3 text-purple-400">X-Payment-Receipt</td>
                      <td className="px-4 py-3 text-zinc-500">Client → Server</td>
                      <td className="px-4 py-3 text-zinc-500">Solana transaction signature</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-purple-400">X-Payment-Network</td>
                      <td className="px-4 py-3 text-zinc-500">Client → Server</td>
                      <td className="px-4 py-3 text-zinc-500">devnet | testnet | mainnet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Networks */}
            <section>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-mono text-purple-400">5</span>
                Networks
              </h2>
              <div className="space-y-2">
                {[
                  { name: "Devnet", desc: "Free airdrop, unlimited testing. Default.", badge: "Recommended", badgeColor: "emerald" },
                  { name: "Testnet", desc: "Free airdrop, closer to mainnet behavior.", badge: null, badgeColor: "" },
                  { name: "Mainnet", desc: "Real SOL. Production deployments only.", badge: "Production", badgeColor: "yellow" },
                ].map((net) => (
                  <div key={net.name} className="flex items-center justify-between p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)]">
                    <div>
                      <p className="font-medium text-sm text-white">{net.name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{net.desc}</p>
                    </div>
                    {net.badge && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        net.badgeColor === "emerald" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}>
                        {net.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* API Reference */}
            <section>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-mono text-purple-400">6</span>
                API Reference
              </h2>

              <div className="space-y-6">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
                  <h3 className="font-mono text-sm font-semibold text-white mb-1">sgFetch(url, options?)</h3>
                  <p className="text-xs text-zinc-500 mb-3">Drop-in replacement for fetch() that handles 402 payment flow.</p>
                  <pre className="font-mono text-[12px] text-zinc-500 leading-relaxed !bg-[var(--surface)] !border-[var(--border)] p-3 rounded-lg">{`interface SgFetchOptions {
  network?: "devnet" | "testnet" | "mainnet";
  maxPayment?: number;    // Max SOL per request
  timeout?: number;       // Payment timeout in ms
  onStep?: (step: string, detail?: string) => void;
}`}</pre>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5">
                  <h3 className="font-mono text-sm font-semibold text-white mb-1">sgGate(config)</h3>
                  <p className="text-xs text-zinc-500 mb-3">Express middleware that gates routes behind Solana payment.</p>
                  <pre className="font-mono text-[12px] text-zinc-500 leading-relaxed !bg-[var(--surface)] !border-[var(--border)] p-3 rounded-lg">{`interface SgGateConfig {
  amount: number;         // SOL per request
  recipient: string;      // Your Solana wallet
  network: "devnet" | "testnet" | "mainnet";
  expiresIn?: number;     // Payment validity (default: 300s)
}`}</pre>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
