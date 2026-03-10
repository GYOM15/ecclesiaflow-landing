"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { FEATURES_OVERVIEW } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function FeaturesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.4,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Fonctionnalités"
          title="Tout ce dont votre église a besoin, au même endroit"
          subtitle="Une suite complète d'outils conçus spécifiquement pour les communautés de foi. Simples à utiliser, puissants à exploiter."
        />

        <StaggerContainer className="space-y-10 lg:space-y-14 max-w-5xl mx-auto">
          {FEATURES_OVERVIEW.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <div
                className={`flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Large ghost number — left side for right-aligned cards */}
                {index % 2 !== 0 && (
                  <span className="hidden lg:flex items-center justify-center text-[10rem] font-extrabold text-slate-100/80 select-none leading-none flex-1 shrink-0" aria-hidden="true">
                    0{index + 1}
                  </span>
                )}

                <div className="group relative max-w-md w-full">
                  {/* Glow on hover */}
                  <div className="absolute -inset-3 rounded-xl bg-indigo-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                  <div className="relative bg-white rounded-xl p-6 lg:p-7 shadow-[0_1px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-6px_rgba(99,102,241,0.12)] transition-all duration-500 hover:-translate-y-0.5 border border-slate-100 overflow-hidden">
                    {/* Corner gradient highlight — top-left */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400/[0.12] via-indigo-300/[0.04] to-transparent rounded-tl-xl pointer-events-none" aria-hidden="true" />

                    {feature.tag && (
                      <div className="relative mb-3">
                        <Badge variant={feature.tag === "Populaire" ? "amber" : "indigo"}>
                          {feature.tag}
                        </Badge>
                      </div>
                    )}

                    <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 mb-4 transition-transform duration-300 group-hover:scale-110">
                      <feature.icon className="h-5 w-5 text-slate-600" />
                    </div>

                    <h3 className="relative text-lg font-semibold text-slate-900 mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="relative text-sm text-slate-500 leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    <div className="relative inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 group-hover:text-slate-600 group-hover:gap-2.5 transition-all duration-300">
                      En savoir plus <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>

                {/* Large ghost number — right side for left-aligned cards */}
                {index % 2 === 0 && (
                  <span className="hidden lg:flex items-center justify-center text-[10rem] font-extrabold text-slate-100/80 select-none leading-none flex-1 shrink-0" aria-hidden="true">
                    0{index + 1}
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
