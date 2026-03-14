"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { HOW_IT_WORKS } from "@/lib/constants";

const stepStyles = [
  {
    numColor: "text-indigo-500",
    numColorLabel: "text-indigo-500",
    ripple: "border-indigo-200",
    ripple2: "border-indigo-100",
    lightColor: "via-indigo-400",
  },
  {
    numColor: "text-teal-500",
    numColorLabel: "text-teal-500",
    ripple: "border-teal-200",
    ripple2: "border-teal-100",
    lightColor: "via-teal-400",
  },
  {
    numColor: "text-amber-500",
    numColorLabel: "text-amber-500",
    ripple: "border-amber-200",
    ripple2: "border-amber-100",
    lightColor: "via-amber-400",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden">
      {/* Subtle wavy background lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute top-0 left-0 w-full h-16" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0,20 C360,60 720,0 1080,30 C1260,45 1380,15 1440,25" stroke="rgba(148,163,184,0.08)" strokeWidth="1.5" fill="none" />
          <path d="M0,40 C240,10 480,50 720,25 C960,0 1200,40 1440,20" stroke="rgba(148,163,184,0.06)" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-16" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0,30 C480,0 960,60 1440,25" stroke="rgba(148,163,184,0.06)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Commencer"
          title="Opérationnel en 3 étapes simples"
          subtitle="Pas besoin d'être un expert en technologie. En quelques minutes, votre église est prête."
        />

        {/* Flowing vertical timeline */}
        <div className="max-w-4xl mx-auto">
          {HOW_IT_WORKS.map((step, index) => {
            const isLast = index === HOW_IT_WORKS.length - 1;
            const s = stepStyles[index] ?? stepStyles[0];
            // The traveling light between dot N and dot N+1 takes the color of the NEXT dot
            const nextS = stepStyles[index + 1] ?? stepStyles[0];

            return (
              <ScrollReveal key={step.step} delay={index * 0.12}>
                <div className="relative flex gap-6 lg:gap-10">
                  {/* Timeline stem */}
                  <div className="flex flex-col items-center shrink-0">
                    {/* Pulsing dot with wave ripples — colored per step */}
                    <div className="relative z-10 flex items-center justify-center w-10 h-10">
                      {/* Ripple wave 1 */}
                      <motion.div
                        className={`absolute w-10 h-10 rounded-full border ${s.ripple}`}
                        animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: index * 0.3 }}
                      />
                      {/* Ripple wave 2 */}
                      <motion.div
                        className={`absolute w-10 h-10 rounded-full border ${s.ripple2}`}
                        animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: index * 0.3 + 0.8 }}
                      />
                      {/* Main dot — neutral with colored number */}
                      <motion.div
                        className="relative z-10 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <span className={`text-[11px] font-bold ${s.numColor}`}>{step.step}</span>
                      </motion.div>
                    </div>

                    {/* Flowing connector with traveling light — color transitions to next step */}
                    {!isLast && (
                      <div className="relative w-px flex-1 min-h-[60px]">
                        <div className="absolute inset-0 w-0.5 mx-auto bg-gradient-to-b from-indigo-200 to-slate-200 opacity-40" />
                        {/* Traveling light pulse — takes next step's color */}
                        <motion.div
                          className={`absolute left-1/2 -translate-x-1/2 w-[3px] h-8 rounded-full bg-gradient-to-b from-transparent ${nextS.lightColor} to-transparent opacity-60`}
                          animate={{ top: ["-10%", "110%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
                        />
                        <svg className="absolute -left-3 top-0 w-7 h-full" viewBox="0 0 28 100" fill="none" preserveAspectRatio="none">
                          <path
                            d="M14,0 C18,20 10,35 14,50 C18,65 10,80 14,100"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            className="text-indigo-300"
                            opacity="0.12"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${isLast ? "pb-0" : "pb-12"}`}>
                    <div className="relative bg-white rounded-xl p-6 lg:p-8 border border-slate-200 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.15)] transition-all duration-500 overflow-hidden group/card cursor-pointer">
                      {/* Gradient border highlight on hover */}
                      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-indigo-400/40 via-indigo-200/15 to-slate-300/25 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" aria-hidden="true" />
                      {/* Corner gradient highlight — top-right */}
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-indigo-400/[0.10] via-indigo-300/[0.03] to-transparent rounded-tr-xl pointer-events-none" aria-hidden="true" />
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50">
                          <step.icon className="h-4 w-4 text-slate-500" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Étape <span className={`${s.numColor} font-bold`}>{step.step}</span>
                        </span>
                      </div>

                      <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>

                      {/* Inline visual indicator */}
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        {index === 0 && (
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-1.5">
                              {["bg-slate-400", "bg-slate-500", "bg-slate-400", "bg-slate-300"].map((c, j) => (
                                <div key={j} className={`w-6 h-6 rounded-full ${c} border-2 border-white flex items-center justify-center text-[8px] font-bold text-white`}>
                                  {["E", "P", "C", "+"][j]}
                                </div>
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">Configuration en 5 minutes</span>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                              {[
                                { label: "Pasteur", bg: "bg-slate-100 text-slate-700" },
                                { label: "Diacre", bg: "bg-slate-100 text-slate-700" },
                                { label: "Admin", bg: "bg-slate-100 text-slate-700" },
                              ].map((role) => (
                                <span key={role.label} className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${role.bg}`}>
                                  {role.label}
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">Rôles personnalisables</span>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="flex items-center gap-3">
                            <div className="flex items-end gap-0.5 h-5">
                              {[35, 50, 45, 65, 55, 75, 60, 85, 70, 90].map((h, j) => (
                                <div key={j} className="w-1.5 rounded-sm bg-slate-300" style={{ height: `${h}%` }} />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">Suivi de croissance en temps réel</span>
                          </div>
                        )}
                      </div>
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
