"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { HOW_IT_WORKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const stepMeta = [
  { iconBg: "bg-indigo-50 text-indigo-600", numberBg: "bg-indigo-500", borderColor: "border-indigo-200", glowFrom: "from-indigo-500/[0.06]" },
  { iconBg: "bg-emerald-50 text-emerald-600", numberBg: "bg-emerald-500", borderColor: "border-emerald-200", glowFrom: "from-emerald-500/[0.06]" },
  { iconBg: "bg-amber-50 text-amber-600", numberBg: "bg-amber-500", borderColor: "border-amber-200", glowFrom: "from-amber-500/[0.06]" },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Commencer"
          title="Opérationnel en 3 étapes simples"
          subtitle="Pas besoin d'être un expert en technologie. En quelques minutes, votre église est prête."
        />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {HOW_IT_WORKS.map((step, index) => {
            const meta = stepMeta[index];
            return (
              <ScrollReveal key={step.step} delay={index * 0.15}>
                <div className="relative">
                  {/* Connector arrow */}
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  )}
                  <div className={cn(
                    "bg-white rounded-2xl p-6 border border-slate-200/60 h-full",
                    "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]",
                    "hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300"
                  )}>
                    {/* Step number */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${meta.numberBg} text-white flex items-center justify-center text-lg font-bold shadow-sm`}>
                        {step.step}
                      </div>
                      <div className={`w-8 h-8 rounded-lg ${meta.iconBg} flex items-center justify-center`}>
                        <step.icon className="h-4 w-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>

                    {/* Visual mini indicator */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      {index === 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            <div className="w-5 h-5 rounded-full bg-indigo-200 border-2 border-white" />
                            <div className="w-5 h-5 rounded-full bg-indigo-300 border-2 border-white" />
                            <div className="w-5 h-5 rounded-full bg-indigo-400 border-2 border-white" />
                          </div>
                          <span className="text-[10px] text-slate-400">Rejoignez 500+ églises</span>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {["P", "D", "R"].map((l) => (
                              <div key={l} className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-600">{l}</div>
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400">Rôles personnalisés</span>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-end gap-0.5 h-4">
                            {[40, 60, 50, 80, 70, 90].map((h, i) => (
                              <div key={i} className="w-2 bg-amber-300 rounded-sm" style={{ height: `${h}%` }} />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400">Croissance garantie</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
