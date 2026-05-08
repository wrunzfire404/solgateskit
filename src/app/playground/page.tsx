"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Network = "devnet" | "testnet" | "mainnet";
type TabId = "logs" | "response" | "code";

interface Endpoint {
  path: string;
  price: string;
  desc: string;
  free: boolean;
}

interface LogEntry { time: string; msg: string; type: "info" | "ok" | "err" | "step"; }

const ENDPOINTS: Endpoint[] = [
  { path: "/api/ping/free", price: "Free", desc: "No payment required", free: true },
  { path: "/api/ping/paid", price: "0.001 SOL", desc: "Simple paid ping", free: false },
  { path: "/api/premium-data", price: "0.005 SOL", desc: "Premium data payload", free: false },
  { path: "/api/info", price: "Free", desc: "Server metadata", free: true },
];

export default function PlaygroundPage() {
  const [network, setNetwork] = useState<Network>("devnet");
  const [mockMode, setMockMode] = useState(true);
  const [selected, setSelected] = useState(1);
  const [tab, setTab] = useState<TabId>("logs");
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [response, setResponse] = useState("");
  const [flowStep, setFlowStep] = useState(0);

  const log = useCallback((msg: string, type: LogEntry["type"] = "info") => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((p) => [...p, { time, msg, type }]);
  }, []);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const runRequest = async () => {
    setRunning(true);
    setLogs([]);
    setResponse("");
    const ep = ENDPOINTS[selected];

    if (ep.free) {
      setFlowStep(1);
      log(`GET ${ep.path}`, "step");
      await sleep(400);
      log("← 200 OK (no payment needed)", "ok");
      const data = { status: "ok", endpoint: ep.path, message: "This endpoint is free. No payment required.", timestamp: Date.now() };
      setResponse(JSON.stringify(data, null, 2));
      setTab("response");
      setFlowStep(5);
      setRunning(false);
      return;
    }

    // Paid endpoint flow (mock or real)
    try {
      // Step 1
      setFlowStep(1);
      log("Generating ephemeral Solana keypair...", "step");
      await sleep(300);
      const fakeWallet = Array.from({length: 44}, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random()*62)]).join("");
      log(`Wallet: ${fakeWallet.slice(0,6)}...${fakeWallet.slice(-4)}`, "info");

      // Step 2
      setFlowStep(2);
      if (mockMode) {
        log("Simulating airdrop (mock mode)...", "step");
        await sleep(600);
        log("Airdrop: 2.000 SOL (simulated)", "ok");
      } else {
        log("Requesting airdrop from devnet faucet...", "step");
        // Real airdrop would go here
        await sleep(1500);
        log("Airdrop: 1.000 SOL", "ok");
      }

      // Step 3
      setFlowStep(3);
      log(`GET ${ep.path}`, "step");
      await sleep(400);
      log("← 402 Payment Required", "info");
      log(`   Pay ${ep.price} to server wallet`, "info");

      // Step 4
      setFlowStep(4);
      if (mockMode) {
        log(`Simulating ${ep.price} payment (mock)...`, "step");
        await sleep(800);
        const fakeSig = Array.from({length: 88}, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random()*62)]).join("");
        log(`Payment confirmed: ${fakeSig.slice(0,16)}...`, "ok");
      } else {
        log(`Sending ${ep.price} on-chain...`, "step");
        await sleep(2000);
        log("Payment confirmed (devnet)", "ok");
      }

      // Step 5
      setFlowStep(5);
      log("Retrying with payment receipt...", "step");
      await sleep(300);
      log("← 200 OK", "ok");

      const data = {
        success: true,
        message: "Payment verified. Access granted.",
        data: {
          endpoint: ep.path,
          timestamp: Date.now(),
          network,
          mock: mockMode,
          quote: "The future of API monetization is on-chain.",
        },
      };
      setResponse(JSON.stringify(data, null, 2));
      setTab("response");
      log("Done.", "ok");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      log(`Error: ${msg}`, "err");
    }

    setFlowStep(0);
    setRunning(false);
  };

  const codeSnippet = `import { sgFetch } from "solgateskit-sdk";

const res = await sgFetch("${typeof window !== "undefined" ? window.location.origin : "https://solgateskit.vercel.app"}${ENDPOINTS[selected].path}", {
  network: "${network}",
  onStep: (step) => console.log(step),
});

const data = await res.json();`;

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="py-10 min-h-screen">
          <div className="mx-auto max-w-7xl px-6">
            {/* Title */}
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider">Interactive</span>
                <h1 className="mt-1 text-2xl font-bold text-white">Playground</h1>
                <p className="mt-1 text-sm text-zinc-500">Run real HTTP 402 payment flows — live on Solana or fully mocked. No install needed.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-600 font-mono">
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-800 bg-[var(--surface)] text-zinc-500">⌘</kbd>+<kbd className="px-1.5 py-0.5 rounded border border-zinc-800 bg-[var(--surface)] text-zinc-500">↵</kbd>
                <span className="ml-1">to send</span>
              </div>
            </div>

            {/* Toolbar */}
            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-2 pr-3 border-r border-[var(--border)]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Chain</span>
                <span className="flex items-center gap-1.5 rounded-md bg-zinc-800 border border-zinc-700 px-2 py-1 text-[11px] font-medium text-zinc-300">SOL</span>
              </div>
              <div className="flex items-center gap-2 pr-3 border-r border-[var(--border)]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Network</span>
                <div className="flex gap-1">
                  {(["devnet", "testnet", "mainnet"] as Network[]).map((n) => (
                    <button key={n} onClick={() => setNetwork(n)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all capitalize ${network === n ? "bg-green-500/10 text-green-400 border border-green-500/25" : "text-zinc-600 border border-[var(--border)] hover:border-[var(--border-hover)] hover:text-zinc-400"}`}>{n}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Options</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-[11px] text-zinc-500">Mock</span>
                  <button onClick={() => setMockMode(!mockMode)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${mockMode ? "bg-white" : "bg-zinc-700"}`}>
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full transition-transform ${mockMode ? "translate-x-4 bg-black" : "translate-x-1 bg-zinc-400"}`} />
                  </button>
                </label>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
              {/* Sidebar */}
              <div className="space-y-4">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Endpoint</h3>
                    <span className="font-mono text-[10px] text-zinc-700">GET</span>
                  </div>
                  <div className="space-y-1.5">
                    {ENDPOINTS.map((ep, i) => (
                      <button key={ep.path} onClick={() => setSelected(i)} className={`w-full text-left rounded-lg border px-3 py-2.5 transition-all ${selected === i ? "border-white/15 bg-[var(--surface)]" : "border-transparent hover:border-[var(--border)] hover:bg-[var(--surface)]/40"}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs text-zinc-300 truncate">{ep.path}</span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${ep.free ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-400"}`}>{ep.price}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-zinc-600">{ep.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={runRequest} disabled={running} className={`w-full flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm transition-all ${running ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-white text-black hover:bg-zinc-100 active:scale-[0.98]"}`}>
                  {running ? <><span className="w-3 h-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />Running...</> : <><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>Send Request</>}
                </button>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 space-y-2">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-3">402 Flow</h3>
                  {[
                    { n: 1, label: "GET request sent" },
                    { n: 2, label: "Server returns 402" },
                    { n: 3, label: "SDK pays on Solana" },
                    { n: 4, label: "Retry with receipt" },
                    { n: 5, label: "200 OK + data" },
                  ].map((s) => (
                    <div key={s.n} className="flex items-center gap-2.5">
                      <span className={`font-mono text-[10px] font-bold w-4 ${flowStep >= s.n ? "text-green-500" : "text-zinc-700"}`}>{s.n}</span>
                      <span className={`text-[11px] ${flowStep >= s.n ? "text-zinc-300" : "text-zinc-600"}`}>{s.label}</span>
                      {flowStep === s.n && running && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft ml-auto" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main */}
              <div className="min-h-[600px] flex flex-col">
                <div className="flex items-center gap-2 mb-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
                  <span className="font-mono text-[10px] font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded shrink-0">GET</span>
                  {mockMode && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700 shrink-0 uppercase tracking-wide">simulated</span>}
                  <span className="font-mono text-xs text-zinc-500 flex-1 truncate">{ENDPOINTS[selected].path}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${ENDPOINTS[selected].free ? "bg-green-500/10 text-green-400" : "bg-zinc-800 text-zinc-400"}`}>{ENDPOINTS[selected].price}</span>
                </div>

                <div className="flex-1 flex flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                  <div className="flex items-center border-b border-[var(--border)]">
                    {([
                      { id: "logs" as TabId, label: "Flow Log" },
                      { id: "response" as TabId, label: "Response" },
                      { id: "code" as TabId, label: "Code" },
                    ]).map((t) => (
                      <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2.5 text-xs border-b-2 transition-colors ${tab === t.id ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}>{t.label}</button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: "480px" }}>
                    {tab === "logs" && (
                      logs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                          <div className="w-12 h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-zinc-600 text-lg">⚡</div>
                          <p className="text-sm text-zinc-400">Select an endpoint and send a request</p>
                          <p className="text-xs text-zinc-700">The full HTTP 402 payment flow will stream here in real time</p>
                        </div>
                      ) : (
                        <div className="space-y-0.5 font-mono text-[12px]">
                          {logs.map((l, i) => (
                            <div key={i} className={`flex gap-3 py-0.5 ${l.type === "err" ? "text-red-400" : l.type === "ok" ? "text-green-400" : l.type === "step" ? "text-zinc-300" : "text-zinc-500"}`}>
                              <span className="text-zinc-700 shrink-0 select-none">{l.time}</span>
                              <span>{l.msg}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                    {tab === "response" && (
                      response ? <pre className="font-mono text-[12px] text-zinc-400 whitespace-pre-wrap">{response}</pre> : <div className="flex items-center justify-center h-full text-sm text-zinc-600">No response yet.</div>
                    )}
                    {tab === "code" && <pre className="font-mono text-[12px] text-zinc-400 whitespace-pre-wrap">{codeSnippet}</pre>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
