"use client";

import { AnimatedCounter } from "@/components/animation/animated-counter";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { STATS } from "@/lib/constants";

const symbolColors = [
  "text-indigo-400",
  "text-teal-400",
  "text-indigo-400",
  "text-teal-400",
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
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* Topographic SVG lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute top-[15%] left-0 w-[200%] h-[70%] animate-[topoSlide_40s_linear_infinite]" viewBox="0 0 2880 400" fill="none" preserveAspectRatio="none">
          <path d="M0,200 C180,160 360,240 540,180 C720,120 900,260 1080,200 C1260,140 1440,220 1620,180 C1800,140 1980,240 2160,200 C2340,160 2520,220 2700,180 L2880,200" stroke="#334155" strokeWidth="1" opacity="0.3" fill="none" />
          <path d="M0,150 C240,190 480,110 720,170 C960,230 1200,130 1440,180 C1680,230 1920,140 2160,170 C2400,200 2640,140 2880,160" stroke="#334155" strokeWidth="0.8" opacity="0.2" fill="none" />
          <path d="M0,260 C300,220 600,300 900,240 C1200,180 1500,280 1800,240 C2100,200 2400,270 2700,230 L2880,250" stroke="#334155" strokeWidth="0.6" opacity="0.15" fill="none" />
        </svg>
        {/* Colored symbols */}
        <span className="absolute top-[20%] left-[15%] text-indigo-400 text-xl font-bold opacity-30 select-none">+</span>
        <span className="absolute top-[60%] right-[20%] text-teal-400 text-xl font-bold opacity-30 select-none">+</span>
        <span className="absolute bottom-[25%] left-[40%] text-indigo-400 text-lg font-bold opacity-25 select-none">%</span>
      </div>
      {/* Glow orbs */}
      <div className="absolute top-0 right-[20%] w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-[10%] w-[30%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.12),transparent_70%)] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-white/10 text-indigo-300 border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            En chiffres
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4">
            Notre ambition : équiper chaque église
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Nous construisons la plateforme qui accompagnera des milliers de communautés de foi à travers le monde francophone.
          </p>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
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
