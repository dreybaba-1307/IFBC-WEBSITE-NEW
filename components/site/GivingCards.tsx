"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function GivingCards({ giving }: { giving: SiteContent["giving"] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(number: string) {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(number);
      window.setTimeout(() => setCopied(null), 2200);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {giving.banks.map((bank, i) => (
        <div
          key={bank.accountNumber + i}
          className="group relative overflow-hidden border border-ink/10 bg-paper p-7 transition-colors duration-500 hover:border-gold/70 md:p-8"
        >
          <span className="pointer-events-none absolute -right-2 -top-10 font-display text-[9rem] leading-none text-ink/[0.04]">
            0{i + 1}
          </span>
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-gold-deep/30 bg-gold/10 px-3 py-1 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-gold-deep">
                {bank.label}
              </span>
              <span className="font-mono text-[0.55rem] text-muted">{bank.currency}</span>
            </div>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                  Bank
                </dt>
                <dd className="mt-1 font-display text-xl text-ink">{bank.bank}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                  Account name
                </dt>
                <dd className="mt-1 text-[0.92rem] text-ink/80">{bank.accountName}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted">
                Account number
              </p>
              <div className="mt-2 flex items-center justify-between gap-3 border border-ink/10 bg-ivory px-4 py-3">
                <span className="font-mono text-lg tracking-[0.14em] text-ink">
                  {bank.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={() => copy(bank.accountNumber)}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink/50 transition-colors hover:bg-ink hover:text-ivory"
                  aria-label={`Copy ${bank.label} account number`}
                >
                  {copied === bank.accountNumber ? (
                    <Check className="h-4 w-4 text-green-700" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              {copied === bank.accountNumber ? (
                <p className="mt-2 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-green-700">
                  Copied to clipboard
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
