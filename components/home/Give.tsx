"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import { Kicker, Star } from "@/components/ui";
import type { SiteContent } from "@/lib/content";

export function Give({ content }: { content: SiteContent }) {
  const [copied, setCopied] = useState<string | null>(null);
  const { giving } = content;

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
    <section className="grain grain-dark relative overflow-hidden bg-ink py-24 text-ivory md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Kicker light>09 / Giving</Kicker>
            <h2 className="mt-6 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.96]">
              Give with
              <br />
              <span className="italic text-gold-soft">joy.</span>
            </h2>
            <p className="mt-6 max-w-md text-[0.92rem] leading-relaxed text-ivory/60">
              {giving.intro}
            </p>

            <div className="mt-9 flex items-center gap-4 border-l border-gold/40 pl-5">
              <div>
                <p className="font-display text-lg italic text-ivory/80">
                  “God loveth a cheerful giver.”
                </p>
                <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-gold-soft/70">
                  2 Corinthians 9:7
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/give" className="btn btn-gold">
                Ways to give
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${content.site.givingEmail}`}
                className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ivory/45 hover:text-gold"
              >
                {content.site.givingEmail}
              </a>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {giving.banks.map((bank, i) => (
              <div
                key={bank.accountNumber}
                className="group relative flex flex-col justify-between overflow-hidden border border-ivory/12 bg-ivory/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold/50"
              >
                <span className="pointer-events-none absolute -right-2 -top-8 font-display text-[7rem] leading-none text-ivory/[0.04]">
                  0{i + 1}
                </span>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-gold/30 px-3 py-1 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-gold-soft">
                      {bank.label}
                    </span>
                    <span className="font-mono text-[0.52rem] text-ivory/30">
                      {bank.currency}
                    </span>
                  </div>
                  <p className="mt-7 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ivory/35">
                    Bank
                  </p>
                  <p className="mt-1 font-display text-lg text-ivory">{bank.bank}</p>
                  <p className="mt-4 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ivory/35">
                    Account name
                  </p>
                  <p className="mt-1 text-[0.85rem] text-ivory/75">{bank.accountName}</p>
                </div>

                <div className="relative mt-6">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ivory/35">
                    Account number
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-ivory/10 bg-ink/40 px-3 py-2.5">
                    <span className="font-mono text-[0.95rem] tracking-[0.12em] text-ivory">
                      {bank.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(bank.accountNumber)}
                      className="grid h-8 w-8 place-items-center rounded-full text-ivory/50 transition-colors hover:bg-gold/15 hover:text-gold"
                      aria-label={`Copy ${bank.label} account number`}
                    >
                      {copied === bank.accountNumber ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-[0.68rem] leading-relaxed text-ivory/35 sm:col-span-2">
              {giving.note}
            </p>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Star className="h-3 w-3 text-gold/60" />
              <span className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-ivory/30">
                Secure bank transfer · Receipted with gratitude
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
