"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Keypair, Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

type Network = "devnet" | "testnet" | "mainnet";
type TabId = "logs" | "response" | "code";

interface Endpoint {
  path: string;
  method: string;
  price: string;
  priceNum: number;
  desc: string;
  free: boolean;
}

interface LogEntry {
  time: string;
  msg: string;
  type: "info" | "success" | "error" | "step";
}

const ENDPOINTS: Endpoint[] = [
  { path: "/api/gate", method: "GET", price: "0.001 SOL", priceNum: 0.001, desc: "Gated endpoint demo", free: false },
];

const NETWORKS: Record<Network, string> = {
  devnet: "https://api.devnet.solana.com",
  testnet: "https://api.testnet.solana.com",
  mainnet: "https://api.mainnet-beta.solana.com",
};

export default function PlaygroundPage() {
  const [network, setNetwork] = useState<Network>("devnet");
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("logs");
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [response, setResponse] = useState<string>("");
  const [flowStep, setFlowStep] = useState(0);

  const log = useCallback((msg: string, type: LogEntry["type"] = "info") => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((prev) => [...prev, { time, msg, type }]);
  }, []);

  const runRequest = async () => {
    setRunning(true);
    setLogs([]);
    setResponse("");
    setFlowStep(1);

    const endpoint = ENDPOINTS[selectedEndpoint];

    try {
      // Step 1: Generate keypair
      log("Generating ephemeral Solana keypair...", "step");
      const keypair = Keypair.generate();
      const pubkey = keypair.publicKey.toBase58();
      log(`Wallet: ${pubkey}`, "info");
      setFlowStep(1);

      // Step 2: Airdrop
      log("Requesting airdrop from devnet faucet...", "step");
      setFlowStep(2);
      const connection = new Connection(NETWORKS[network], "confirmed");

      try {
        const sig = await connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(sig, "confirmed");
        const bal = await connection.getBalance(keypair.publicKey);
        log(`Airdrop confirmed. Balance: ${(bal / LAMPORTS_PER_SOL).toFixed(4)} SOL`, "success");
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Airdrop failed";
        log(`Airdrop failed: ${msg}`, "error");
        log("Devnet faucet may be rate-limited. Try again in 60s.", "info");
        setRunning(false);
        return;
      }

      // Step 3: Send request → 402
      log(`Sending ${endpoint.method} ${endpoint.path}...`, "step");
      setFlowStep(3);
      const res402 = await fetch(endpoint.path);

      if (res402.status === 402) {
        const payHeader = res402.headers.get("X-Payment-Request");
        const payReq = payHeader ? JSON.parse(payHeader) : null;
        log(`← 402 Payment Required`, "info");
        log(`   Amount: ${payReq?.amount} SOL | Recipient: ${payReq?.recipient?.slice(0, 8)}...`, "info");
      } else {
        log(`← ${res402.status} (expected 402)`, "error");
        setRunning(false);
        return;
      }

      // Step 4: Pay
      log(`Sending ${endpoint.priceNum} SOL on-chain...`, "step");
      setFlowStep(4);
      const payHeader = res402.headers.get("X-Payment-Request");
      const payReq = payHeader ? JSON.parse(payHeader) : { amount: 0.001, recipient: "11111111111111111111111111111111" };

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey: new PublicKey(payReq.recipient),
          lamports: Math.round(payReq.amount * LAMPORTS_PER_SOL),
        })
      );

      try {
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;
        tx.feePayer = keypair.publicKey;
        tx.sign(keypair);
        const paymentSig = await connection.sendRawTransaction(tx.serialize());
        await connection.confirmTransaction(paymentSig, "confirmed");
        log(`Payment confirmed: ${paymentSig.slice(0, 16)}...`, "success");

        // Step 5: Retry
        log(`Retrying with payment receipt...`, "step");
        setFlowStep(5);
        const res200 = await fetch(endpoint.path, {
          headers: {
            "X-Payment-Receipt": paymentSig,
            "X-Payment-Network": network,
          },
        });

        const data = await res200.json();
        if (res200.ok) {
          log(`← 200 OK`, "success");
          setResponse(JSON.stringify(data, null, 2));
          setActiveTab("response");
        } else {
          log(`← ${res200.status}: ${data.error}`, "error");
          setResponse(JSON.stringify(data, null, 2));
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Payment failed";
        log(`Payment error: ${msg}`, "error");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      log(`Fatal: ${msg}`, "error");
    }

    setFlowStep(0);
    setRunning(false);
  };

  const codeExample = `import { sgFetch } from "solgateskit-sdk";

const res = await sgFetch("${typeof window !== "undefined" ? window.location.origin : ""}${ENDPOINTS[selectedEndpoint].path}", {
  network: "${network}",
  onStep: (step) => console.log(step),
});

const data = await res.json();
console.log(data);`;

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="py-10 min-h-screen">
          <div className="mx-auto max-w-7xl px-6">
            {/* Page header */}
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider">Interactive</span>
                <h1 className="mt-1 text-2xl font-bold text-white">Playground</h1>
                <p className="mt-1 text-sm text-zinc-500">Run real HTTP 402 payment flows — live on Solana. No install needed.</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-600 font-mono">
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-800 bg-[var(--surface)] text-zinc-500">⌘</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 rounded border border-zinc-800 bg-[var(--surface)] text-zinc-500">↵</kbd>
                <span className="ml-1">to send</span>
              </div>
            </div>

            {/* Toolbar */}
            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
              <div className="flex items-center gap-2 pr-3 border-r border-[var(--border)]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Chain</span>
                <span className="flex items-center gap-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-1 text-[11px] font-medium text-purple-300">
                  <svg width="10" height="10" viewBox="0 0 128 128" fill="currentColor"><circle cx="64" cy="64" r="64" /></svg>
                  SOL
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Network</span>
                <div className="flex gap-1">
                  {(["devnet", "testnet", "mainnet"] as Network[]).map((n) => (
                    <button
                      key={n}
                      onClick={() => setNetwork(n)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all capitalize ${
                        network === n
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                          : "text-zinc-600 border border-[var(--border)] hover:border-[var(--border-hover)] hover:text-zinc-400"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
              {/* Sidebar */}
              <div className="space-y-4">
                {/* Endpoints */}
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">Endpoint</h3>
                    <span className="font-mono text-[10px] text-zinc-700">GET</span>
                  </div>
                  <div className="space-y-1.5">
                    {ENDPOINTS.map((ep, i) => (
                      <button
                        key={ep.path}
                        onClick={() => setSelectedEndpoint(i)}
                        className={`w-full text-left rounded-lg border px-3 py-2.5 transition-all ${
                          selectedEndpoint === i
                            ? "border-white/15 bg-[var(--surface)]"
                            : "border-transparent hover:border-[var(--border)] hover:bg-[var(--surface)]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs text-zinc-300 truncate">{ep.path}</span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
                            ep.free ? "bg-emerald-500/10 text-emerald-400" : "bg-purple-500/10 text-purple-400"
                          }`}>
                            {ep.free ? "Free" : ep.price}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-zinc-600">{ep.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Send button */}
                <button
                  onClick={runRequest}
                  disabled={running}
                  className={`w-full flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm transition-all ${
                    running
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-zinc-100 active:scale-[0.98]"
                  }`}
                >
                  {running ? (
                    <>
                      <span className="w-3 h-3 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3" /></svg>
                      Send Request
                    </>
                  )}
                </button>

                {/* Flow steps */}
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 space-y-2">
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600 mb-3">402 Flow</h3>
                  {[
                    { n: 1, label: "Generate keypair", color: "text-zinc-500" },
                    { n: 2, label: "Airdrop SOL", color: "text-zinc-500" },
                    { n: 3, label: "Server returns 402", color: "text-yellow-500" },
                    { n: 4, label: "SDK pays on Solana", color: "text-purple-400" },
                    { n: 5, label: "Retry → 200 OK", color: "text-emerald-400" },
                  ].map((s) => (
                    <div key={s.n} className={`flex items-center gap-2.5 ${flowStep === s.n ? "opacity-100" : flowStep > s.n ? "opacity-60" : "opacity-40"}`}>
                      <span className={`font-mono text-[10px] font-bold w-4 ${flowStep >= s.n ? s.color : "text-zinc-700"}`}>{s.n}</span>
                      <span className={`text-[11px] ${flowStep >= s.n ? "text-zinc-300" : "text-zinc-600"}`}>{s.label}</span>
                      {flowStep === s.n && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse ml-auto" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main panel */}
              <div className="min-h-[600px] flex flex-col">
                {/* URL bar */}
                <div className="flex items-center gap-2 mb-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2">
                  <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">GET</span>
                  <span className="font-mono text-xs text-zinc-500 flex-1 truncate">{ENDPOINTS[selectedEndpoint].path}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 bg-purple-500/10 text-purple-400">
                    {ENDPOINTS[selectedEndpoint].price}
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex-1 flex flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden">
                  <div className="flex items-center border-b border-[var(--border)]">
                    {([
                      { id: "logs" as TabId, label: "Flow Log", icon: "⚡" },
                      { id: "response" as TabId, label: "Response", icon: ">" },
                      { id: "code" as TabId, label: "Code", icon: "</>" },
                    ]).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-xs border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? "text-white border-white"
                            : "text-zinc-500 border-transparent hover:text-zinc-300"
                        }`}
                      >
                        <span className="text-[10px]">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="flex-1 overflow-y-auto terminal-scrollbar p-4" style={{ minHeight: "480px" }}>
                    {activeTab === "logs" && (
                      logs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center px-6 gap-4">
                          <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
                            <span className="text-xl text-zinc-600">⚡</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-400">Select an endpoint and send a request</p>
                            <p className="text-xs text-zinc-700 mt-1">The full HTTP 402 payment flow will stream here in real time</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1 font-mono text-xs">
                          {logs.map((entry, i) => (
                            <div key={i} className={`flex gap-2 ${
                              entry.type === "error" ? "text-red-400" :
                              entry.type === "success" ? "text-emerald-400" :
                              entry.type === "step" ? "text-purple-300" :
                              "text-zinc-500"
                            }`}>
                              <span className="text-zinc-700 shrink-0">{entry.time}</span>
                              <span>{entry.msg}</span>
                            </div>
                          ))}
                        </div>
                      )
                    )}

                    {activeTab === "response" && (
                      response ? (
                        <pre className="font-mono text-xs text-zinc-400 whitespace-pre-wrap">{response}</pre>
                      ) : (
                        <div className="flex items-center justify-center h-full text-sm text-zinc-600">
                          No response yet. Send a request first.
                        </div>
                      )
                    )}

                    {activeTab === "code" && (
                      <pre className="font-mono text-xs text-zinc-400 whitespace-pre-wrap">{codeExample}</pre>
                    )}
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
