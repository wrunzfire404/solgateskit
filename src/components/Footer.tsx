"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <img src="/logo.png" alt="Solgateskit" className="h-[22px] mb-4" />
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Test pay-per-request APIs on Solana. Devnet, testnet, or mainnet — real on-chain transactions.
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs text-zinc-500">
              <a href="https://x.com/solgateskit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
              <span className="text-zinc-800">·</span>
              <a href="https://github.com/solgateskit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <span className="text-zinc-800">·</span>
              <a href="https://www.npmjs.com/package/solgateskit-sdk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">npm</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/playground" className="text-sm text-zinc-500 hover:text-white transition-colors">Playground</Link></li>
              <li><Link href="/use-cases" className="text-sm text-zinc-500 hover:text-white transition-colors">Use Cases</Link></li>
              <li><Link href="/ecosystem" className="text-sm text-zinc-500 hover:text-white transition-colors">Ecosystem</Link></li>
              <li><Link href="/resources" className="text-sm text-zinc-500 hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Developers</h4>
            <ul className="space-y-2.5">
              <li><Link href="/docs" className="text-sm text-zinc-500 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/docs#api-ref" className="text-sm text-zinc-500 hover:text-white transition-colors">API Reference</Link></li>
              <li><a href="https://github.com/solgateskit/solgateskit/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white transition-colors">Report Issue</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-zinc-600">solgateskit.com · Built on Solana · $SGK</span>
          <span className="text-xs text-zinc-700">MIT License</span>
        </div>
      </div>
    </footer>
  );
}
