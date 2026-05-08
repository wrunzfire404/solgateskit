"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const links = [
  {
    label: "Documentation",
    href: "https://docs.solgateskit.dev",
    description: "Full API reference, guides, and integration tutorials.",
  },
  {
    label: "GitHub",
    href: "https://github.com/solgateskit",
    description: "Source code, issues, and contribution guidelines.",
  },
  {
    label: "npm",
    href: "https://www.npmjs.com/org/solgateskit",
    description: "Install the client and server packages.",
  },
];

const articles = [
  {
    title: "Introducing Solgateskit: Pay-Per-Request APIs on Solana",
    date: "2025-12-01",
    href: "#",
  },
  {
    title: "HTTP 402 and the Future of API Monetization",
    date: "2025-11-15",
    href: "#",
  },
  {
    title: "Building a Paid AI Inference API in 10 Minutes",
    date: "2025-11-02",
    href: "#",
  },
  {
    title: "Why Micropayments Finally Work on Solana",
    date: "2025-10-20",
    href: "#",
  },
];

const communityLinks = [
  {
    label: "X (Twitter)",
    href: "https://x.com/solgateskit",
    description: "Follow for updates, releases, and ecosystem news.",
  },
  {
    label: "Discord",
    href: "#",
    description: "Join the developer community. Get help, share projects.",
  },
  {
    label: "GitHub Discussions",
    href: "https://github.com/solgateskit/discussions",
    description: "RFCs, feature requests, and protocol discussions.",
  },
];

const faqItems = [
  {
    question: "How does payment verification work without slowing down requests?",
    answer:
      "Solgateskit uses Solana's sub-second finality. The client pre-signs a transaction and includes it in the request headers. The server middleware verifies the signature and confirms the transaction on-chain in parallel with request processing. Most verifications complete in under 400ms.",
  },
  {
    question: "What happens if a payment fails or the transaction doesn't confirm?",
    answer:
      "The server returns an HTTP 402 Payment Required response with headers indicating the price, accepted token, and payment address. The client SDK automatically retries with a fresh transaction. No data is served until payment is confirmed.",
  },
  {
    question: "Can I use Solgateskit with existing Express/Next.js apps?",
    answer:
      "Yes. The server package exports middleware compatible with Express, Next.js API routes, Hono, and any framework that supports standard request/response objects. Add one line of middleware to gate any endpoint.",
  },
  {
    question: "What tokens are supported for payment?",
    answer:
      "SOL and any SPL token. You configure accepted tokens in the gate definition. The protocol headers communicate which tokens the server accepts, and the client SDK handles the transaction construction automatically.",
  },
  {
    question: "Is there a minimum payment amount?",
    answer:
      "Solana's low transaction fees (< $0.001) make micropayments practical. You can charge as little as 0.0001 SOL per request. The protocol has no enforced minimum — set whatever price makes sense for your API.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className="font-mono text-[11px] text-zinc-600 uppercase tracking-wider mb-3">
              Resources
            </p>
            <h1 className="text-3xl font-bold text-white mb-4">
              Developer resources
            </h1>
            <p className="text-zinc-500 max-w-2xl">
              Everything you need to get started with Solgateskit — docs,
              packages, community, and answers to common questions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-white mb-6">
              Quick links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors group"
                >
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-zinc-300 transition-colors">
                    {link.label}
                    <span className="inline-block ml-1 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-zinc-500 text-sm">{link.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Blog / Articles */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-white mb-6">
              Articles & posts
            </h2>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] divide-y divide-zinc-800">
              {articles.map((article) => (
                <a
                  key={article.title}
                  href={article.href}
                  className="flex items-center justify-between p-5 hover:bg-zinc-800/30 transition-colors group"
                >
                  <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                    {article.title}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-600 ml-4 shrink-0">
                    {article.date}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="mb-16">
            <h2 className="text-xl font-semibold text-white mb-6">
              Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors group"
                >
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-zinc-300 transition-colors">
                    {link.label}
                    <span className="inline-block ml-1 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      &rarr;
                    </span>
                  </h3>
                  <p className="text-zinc-500 text-sm">{link.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-[var(--border-hover)] transition-colors"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">
                    {item.question}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {item.answer}
                  </p>
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
