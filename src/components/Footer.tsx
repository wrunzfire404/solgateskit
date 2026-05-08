"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Solgateskit" className="h-6" />
            </div>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Test pay-per-request APIs on Solana. Devnet, testnet, or mainnet — real on-chain transactions.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="https://x.com/solgateskit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                X
              </a>
              <span className="text-zinc-700">·</span>
              <a href="https://github.com/solgateskit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                GitHub
              </a>
              <span className="text-zinc-700">·</span>
              <a href="https://www.npmjs.com/package/solgateskit-sdk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                npm
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/playground" className="text-sm text-zinc-500 transition-colors hover:text-white">Playground</Link></li>
              <li><Link href="/#how-it-works" className="text-sm text-zinc-500 transition-colors hover:text-white">How it works</Link></li>
              <li><Link href="/#features" className="text-sm text-zinc-500 transition-colors hover:text-white">Features</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">Developers</h4>
            <ul className="space-y-2.5">
              <li><Link href="/docs" className="text-sm text-zinc-500 transition-colors hover:text-white">Documentation</Link></li>
              <li><Link href="/docs#api-ref" className="text-sm text-zinc-500 transition-colors hover:text-white">API Reference</Link></li>
              <li><a href="https://github.com/solgateskit/solgateskit/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 transition-colors hover:text-white">Report Issue</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-zinc-600">
            <a href="https://solgateskit.com" className="hover:text-zinc-400 transition-colors">solgateskit.com</a>
            {" · "}Built on Solana · $SGK
          </span>
          <span className="text-xs text-zinc-700">MIT License</span>
        </div>
      </div>
    </footer>
  );
}
