"use client";

import { TICKER_ITEMS } from "@/lib/constants";

export function TickerStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="relative bg-slate-50 border-y border-slate-200/60 py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-4">
            <span className="text-sm font-medium text-slate-400">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
          </span>
        ))}
      </div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
    </section>
  );
}
