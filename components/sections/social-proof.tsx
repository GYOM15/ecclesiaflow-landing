"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";

const CHURCH_LOGOS = [
  { name: "Église Nouvelle Vie", members: "800+" },
  { name: "Centre Chrétien de Bordeaux", members: "450+" },
  { name: "Assemblée de Dieu Lyon", members: "1200+" },
  { name: "Église Grâce & Vérité", members: "350+" },
  { name: "Communauté du Renouveau", members: "600+" },
  { name: "Église Baptiste Nantes", members: "520+" },
];

const colors = [
  "bg-indigo-50 text-indigo-500 border-indigo-100",
  "bg-emerald-50 text-emerald-500 border-emerald-100",
  "bg-amber-50 text-amber-500 border-amber-100",
  "bg-violet-50 text-violet-500 border-violet-100",
  "bg-rose-50 text-rose-500 border-rose-100",
  "bg-teal-50 text-teal-500 border-teal-100",
];

export function SocialProof() {
  return (
    <section className="py-14 lg:py-16 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-sm text-slate-400 font-medium mb-8 tracking-wide uppercase">
            Ils nous font confiance
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {CHURCH_LOGOS.map((church, i) => (
              <div key={church.name} className={`flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl border ${colors[i]} transition-all hover:scale-105`}>
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor">
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
