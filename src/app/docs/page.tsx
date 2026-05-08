"use client";

import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-0)]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-sm">
            <span className="w-5 h-5 rounded bg-[var(--accent)] flex items-center justify-center text-[10px] text-black font-black">S</span>
            <span>Solgateskit</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-[var(--ink-2)]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/playground" className="hover:text-white transition-colors">Playground</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-[var(--ink-2)] mb-10">Everything you need to integrate Solgateskit into your project.</p>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">#</span> Installation
          </h2>
          <pre><code>{`npm install solgateskit-sdk`}</code></pre>
        </section>

        {/* Client Usage */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">#</span> Client Usage
          </h2>
          <p className="text-[var(--ink-2)] mb-4 text-sm leading-relaxed">
            The client SDK wraps the standard <code className="text-[var(--accent)] bg-[var(--bg-1)] px-1.5 py-0.5 rounded text-xs">fetch()</code> API.
            When a server returns HTTP 402, the SDK automatically handles payment and retries.
          </p>
          <pre><code>{`import { sgFetch } from "solgateskit-sdk";

// Basic usage - auto handles everything
const response = await sgFetch("https://api.example.com/premium");
const data = await response.json();

// With options
const response = await sgFetch("https://api.example.com/data", {
  network: "devnet",     // devnet | testnet | mainnet
  maxPayment: 0.01,     // Max SOL willing to pay per request
  onStep: (step) => {   // Lifecycle hooks
    console.log(step);  // "keygen" | "airdrop" | "payment" | "verify"
  },
});`}</code></pre>
        </section>

        {/* Server Usage */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">#</span> Server Middleware
          </h2>
          <p className="text-[var(--ink-2)] mb-4 text-sm leading-relaxed">
            Add payment gating to any Express/Next.js route with a single function call.
          </p>
          <pre><code>{`import { sgGate } from "solgateskit-sdk/server";

// Express middleware
app.use("/api/premium", sgGate({
  amount: 0.001,              // SOL per request
  recipient: "YOUR_WALLET",   // Your Solana address
  network: "devnet",          // Network to verify on
}));

// Next.js API route (manual)
export async function GET(request) {
  const receipt = request.headers.get("X-Payment-Receipt");
  
  if (!receipt) {
    return new Response(null, {
      status: 402,
      headers: {
        "X-Payment-Request": JSON.stringify({
          amount: 0.001,
          recipient: "YOUR_WALLET",
          network: "devnet",
        }),
      },
    });
  }

  // Verify payment on-chain...
  return Response.json({ data: "premium content" });
}`}</code></pre>
        </section>

        {/* Protocol Spec */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">#</span> Protocol Specification
          </h2>
          <p className="text-[var(--ink-2)] mb-4 text-sm leading-relaxed">
            Solgateskit uses standard HTTP headers to communicate payment requirements.
          </p>

          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-1)]">
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--ink-2)]">Header</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--ink-2)]">Direction</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--ink-2)]">Description</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="border-b border-[var(--border)]">
                  <td className="px-4 py-2.5 text-[var(--accent)]">X-Payment-Request</td>
                  <td className="px-4 py-2.5 text-[var(--ink-2)]">Server → Client</td>
                  <td className="px-4 py-2.5 text-[var(--ink-2)]">JSON with amount, recipient, network</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="px-4 py-2.5 text-[var(--accent)]">X-Payment-Receipt</td>
                  <td className="px-4 py-2.5 text-[var(--ink-2)]">Client → Server</td>
                  <td className="px-4 py-2.5 text-[var(--ink-2)]">Solana transaction signature</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-[var(--accent)]">X-Payment-Network</td>
                  <td className="px-4 py-2.5 text-[var(--ink-2)]">Client → Server</td>
                  <td className="px-4 py-2.5 text-[var(--ink-2)]">devnet | testnet | mainnet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Networks */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">#</span> Networks
          </h2>
          <div className="grid gap-3">
            {[
              { name: "Devnet", desc: "Free airdrop, unlimited testing. Default for development.", badge: "Recommended" },
              { name: "Testnet", desc: "Free airdrop, closer to mainnet behavior. Good for staging.", badge: null },
              { name: "Mainnet", desc: "Real SOL. Use for production deployments.", badge: "Production" },
            ].map((net) => (
              <div key={net.name} className="p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-1)] flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{net.name}</p>
                  <p className="text-xs text-[var(--ink-2)] mt-0.5">{net.desc}</p>
                </div>
                {net.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                    {net.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-[var(--accent)]">#</span> API Reference
          </h2>

          <h3 className="font-semibold mt-6 mb-2 text-sm">sgFetch(url, options?)</h3>
          <p className="text-[var(--ink-2)] text-sm mb-3">Drop-in replacement for fetch() that handles 402 payment flow.</p>
          <pre><code>{`interface SgFetchOptions {
  network?: "devnet" | "testnet" | "mainnet";
  maxPayment?: number;    // Max SOL per request
  timeout?: number;       // Payment timeout in ms
  onStep?: (step: string, detail?: string) => void;
}`}</code></pre>

          <h3 className="font-semibold mt-8 mb-2 text-sm">sgGate(config)</h3>
          <p className="text-[var(--ink-2)] text-sm mb-3">Express middleware that gates routes behind Solana payment.</p>
          <pre><code>{`interface SgGateConfig {
  amount: number;         // SOL per request
  recipient: string;      // Your Solana wallet
  network: "devnet" | "testnet" | "mainnet";
  memo?: string;          // Optional payment memo
  expiresIn?: number;     // Payment validity in seconds (default: 300)
}`}</code></pre>
        </section>
      </div>
    </div>
  );
}
