"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";

const CHURCH_LOGOS = [
  { name: "Église Baptiste la Grâce de Verdun", members: "650+" },
  { name: "Église Nouvelle Vie, Longueuil", members: "800+" },
  { name: "Centre Évangélique de Montréal", members: "1200+" },
  { name: "Assemblée de Dieu, Québec", members: "450+" },
  { name: "Église de la Rive-Sud", members: "380+" },
  { name: "Communauté Chrétienne de Laval", members: "520+" },
];

export function SocialProof() {
  return (
    <section className="py-14 lg:py-16 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* Title flanked by stats to fill horizontal space */}
          <div className="flex items-center justify-center gap-8 lg:gap-14 mb-8">
            <div className="hidden lg:block text-right">
              <div className="text-2xl font-bold text-slate-900">3 900+</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Membres gérés</div>
            </div>
            <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">
              Ils nous font confiance
            </p>
            <div className="hidden lg:block text-left">
              <div className="text-2xl font-bold text-slate-900">98%</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Satisfaction</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {CHURCH_LOGOS.map((church) => (
              <div key={church.name} className="relative flex flex-col items-center gap-1.5 py-4 px-3 rounded-lg border border-slate-200 bg-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.15)]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-slate-300" fill="currentColor">
                  <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" />
                </svg>
                <span className="text-[11px] font-semibold text-center leading-tight text-slate-700">{church.name}</span>
                <span className="text-[9px] text-slate-400 font-medium">{church.members} membres</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
