"use client";

import { AnimatedCounter } from "@/components/animation/animated-counter";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import WaveRibbon from "@/components/animation/wave-ribbon";
import { STATS } from "@/lib/constants";

const symbolColors = [
  "text-indigo-400",
  "text-teal-400",
  "text-indigo-400",
];

/* Render suffix with only + and % symbols colored */
function ColoredSuffix({ suffix, colorClass }: { suffix: string; colorClass: string }) {
  return (
    <>
      {suffix.split("").map((char, i) => (
        <span key={i} className={char === "+" || char === "%" ? colorClass : undefined}>
          {char}
        </span>
      ))}
    </>
  );
}

export function Stats() {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-slate-900">
      {/* Wave ribbon animation */}
      <WaveRibbon />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-white/10 text-indigo-300 border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Ambition
          </span>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-10">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center min-w-0">
                <div className="text-xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                  <AnimatedCounter value={stat.value} />
                  <ColoredSuffix suffix={stat.suffix} colorClass={symbolColors[i]} />
                </div>
                <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
