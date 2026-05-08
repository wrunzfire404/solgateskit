"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Keypair, Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

type StepStatus = "pending" | "active" | "done" | "error";

interface Step {
  id: string;
  label: string;
  status: StepStatus;
  detail?: string;
}

const DEVNET_URL = "https://api.devnet.solana.com";

export default function PlaygroundPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }, []);

  const updateStep = useCallback((id: string, status: StepStatus, detail?: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, detail: detail || s.detail } : s))
    );
  }, []);

  const runDemo = async () => {
    setRunning(true);
    setResult(null);
    setLogs([]);
    setSteps([
      { id: "keygen", label: "Generate Keypair", status: "pending" },
      { id: "airdrop", label: "Airdrop SOL (devnet)", status: "pending" },
      { id: "request", label: "Call API → 402", status: "pending" },
      { id: "pay", label: "Pay on Solana", status: "pending" },
      { id: "retry", label: "Retry with receipt → 200", status: "pending" },
    ]);

    try {
      // Step 1: Generate keypair
      updateStep("keygen", "active");
      addLog("Generating ephemeral Solana keypair...");
      const keypair = Keypair.generate();
      const pubkey = keypair.publicKey.toBase58();
      updateStep("keygen", "done", pubkey.slice(0, 8) + "..." + pubkey.slice(-4));
      addLog(`Keypair generated: ${pubkey}`);

      // Step 2: Airdrop
      updateStep("airdrop", "active");
      addLog("Requesting 1 SOL airdrop from devnet faucet...");
      const connection = new Connection(DEVNET_URL, "confirmed");

      let airdropSig: string;
      try {
        airdropSig = await connection.requestAirdrop(keypair.publicKey, 1 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropSig, "confirmed");
        const balance = await connection.getBalance(keypair.publicKey);
        updateStep("airdrop", "done", `${(balance / LAMPORTS_PER_SOL).toFixed(3)} SOL`);
        addLog(`Airdrop confirmed: ${airdropSig.slice(0, 12)}...`);
        addLog(`Balance: ${(balance / LAMPORTS_PER_SOL).toFixed(3)} SOL`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Airdrop failed";
        updateStep("airdrop", "error", msg);
        addLog(`ERROR: Airdrop failed - ${msg}`);
        addLog("Devnet faucet may be rate-limited. Try again in a minute.");
        setRunning(false);
        return;
      }

      // Step 3: Call API → get 402
      updateStep("request", "active");
      addLog("Calling /api/gate without payment...");
      const res402 = await fetch("/api/gate");
      if (res402.status !== 402) {
        updateStep("request", "error", `Unexpected status: ${res402.status}`);
        addLog(`ERROR: Expected 402, got ${res402.status}`);
        setRunning(false);
        return;
      }
      const paymentHeader = res402.headers.get("X-Payment-Request");
      const paymentReq = paymentHeader ? JSON.parse(paymentHeader) : null;
      updateStep("request", "done", `402 → Pay ${paymentReq?.amount || 0.001} SOL`);
      addLog(`Got 402 Payment Required`);
      addLog(`Payment terms: ${paymentReq?.amount} SOL to ${paymentReq?.recipient?.slice(0, 8)}...`);

      // Step 4: Pay on Solana
      updateStep("pay", "active");
      const recipient = new PublicKey(paymentReq?.recipient || "11111111111111111111111111111111");
      const amount = paymentReq?.amount || 0.001;
      addLog(`Sending ${amount} SOL to ${recipient.toBase58().slice(0, 12)}...`);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey: recipient,
          lamports: Math.round(amount * LAMPORTS_PER_SOL),
        })
      );

      let paymentSig: string;
      try {
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = keypair.publicKey;
        transaction.sign(keypair);
        paymentSig = await connection.sendRawTransaction(transaction.serialize());
        await connection.confirmTransaction(paymentSig, "confirmed");
        updateStep("pay", "done", paymentSig.slice(0, 12) + "...");
        addLog(`Payment confirmed: ${paymentSig}`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Payment failed";
        updateStep("pay", "error", msg);
        addLog(`ERROR: Payment failed - ${msg}`);
        setRunning(false);
        return;
      }

      // Step 5: Retry with receipt
      updateStep("retry", "active");
      addLog("Retrying request with payment receipt...");
      const res200 = await fetch("/api/gate", {
        headers: {
          "X-Payment-Receipt": paymentSig,
          "X-Payment-Network": "devnet",
        },
      });

      if (res200.ok) {
        const data = await res200.json();
        updateStep("retry", "done", "200 OK ✓");
        addLog(`SUCCESS: 200 OK`);
        addLog(`Response: ${JSON.stringify(data, null, 2)}`);
        setResult(JSON.stringify(data, null, 2));
      } else {
        const err = await res200.json();
        updateStep("retry", "error", `${res200.status}: ${err.error}`);
        addLog(`ERROR: ${res200.status} - ${err.error}`);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      addLog(`FATAL: ${msg}`);
    }

    setRunning(false);
  };

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
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Playground</h1>
          <p className="text-[var(--ink-2)] mt-2">
            Fire a real request against the demo API. Watch the full 402 → pay → 200 flow happen live on Solana devnet.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
          {/* Left: Steps + Button */}
          <div>
            <button
              onClick={runDemo}
              disabled={running}
              className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
                running
                  ? "bg-[var(--bg-2)] text-[var(--ink-3)] cursor-not-allowed"
                  : "bg-[var(--accent-dim)] text-white hover:bg-[var(--accent)]"
              }`}
            >
              {running ? "Running..." : "▶ Run Demo Request"}
            </button>

            {/* Steps */}
            <div className="mt-6 space-y-3">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    step.status === "active"
                      ? "border-[var(--accent)]/50 bg-[var(--accent)]/5"
                      : step.status === "done"
                      ? "border-[var(--green)]/30 bg-[var(--green)]/5"
                      : step.status === "error"
                      ? "border-[var(--red)]/30 bg-[var(--red)]/5"
                      : "border-[var(--border)] bg-[var(--bg-1)]"
                  }`}
                >
                  {/* Status indicator */}
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    step.status === "active" ? "bg-[var(--accent)] animate-pulse-dot" :
                    step.status === "done" ? "bg-[var(--green)]" :
                    step.status === "error" ? "bg-[var(--red)]" :
                    "bg-[var(--ink-3)]"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{step.label}</p>
                    {step.detail && (
                      <p className="text-xs text-[var(--ink-2)] font-mono truncate mt-0.5">{step.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Result */}
            {result && (
              <div className="mt-6 rounded-lg border border-[var(--green)]/30 bg-[var(--green)]/5 p-4">
                <p className="text-xs font-mono text-[var(--green)] mb-2">✓ Response Data:</p>
                <pre className="text-xs !bg-transparent !border-0 !p-0 text-[var(--ink-2)]">
                  <code>{result}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Right: Logs */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-1)] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--green)]" />
              <span className="text-xs font-mono text-[var(--ink-2)]">Console Output</span>
            </div>
            <div className="p-4 h-[500px] overflow-y-auto font-mono text-xs leading-relaxed">
              {logs.length === 0 ? (
                <p className="text-[var(--ink-3)] italic">Click &quot;Run Demo Request&quot; to start...</p>
              ) : (
                logs.map((log, i) => (
                  <p
                    key={i}
                    className={`mb-1 ${
                      log.includes("ERROR") ? "text-[var(--red)]" :
                      log.includes("SUCCESS") ? "text-[var(--green)]" :
                      "text-[var(--ink-2)]"
                    }`}
                  >
                    {log}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
