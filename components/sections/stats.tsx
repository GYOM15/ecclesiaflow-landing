"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/animation/animated-counter";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { STATS } from "@/lib/constants";
import { Church, Users, Server, Star } from "lucide-react";

const statMeta = [
  { icon: Church, iconBg: "bg-white/10", iconColor: "text-slate-300", accent: "border-b-slate-600" },
  { icon: Users, iconBg: "bg-white/10", iconColor: "text-slate-300", accent: "border-b-slate-600" },
  { icon: Server, iconBg: "bg-white/10", iconColor: "text-slate-300", accent: "border-b-slate-600" },
  { icon: Star, iconBg: "bg-white/10", iconColor: "text-slate-300", accent: "border-b-slate-600" },
];

export function Stats() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* Glow orbs */}
      <div className="absolute top-0 right-[20%] w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-[10%] w-[30%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_70%)] rounded-full blur-3xl" />

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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {STATS.map((stat, i) => {
              const meta = statMeta[i];
              return (
                <div key={stat.label} className={`relative bg-white/[0.06] rounded-xl p-6 lg:p-7 border border-white/[0.08] text-center group hover:bg-white/[0.1] hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.25)] transition-all duration-500 border-b-[3px] ${meta.accent} cursor-pointer`}>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${meta.iconBg} mb-4`}>
                    <meta.icon className={`h-5 w-5 ${meta.iconColor}`} />
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
