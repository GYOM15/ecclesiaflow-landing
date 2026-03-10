"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { IconBox } from "@/components/ui/icon-box";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { VALUES } from "@/lib/constants";

const valueColors = [
  { iconVariant: "amber" as const, accent: "border-t-slate-300" },
  { iconVariant: "indigo" as const, accent: "border-t-slate-300" },
  { iconVariant: "indigo" as const, accent: "border-t-slate-300" },
  { iconVariant: "indigo" as const, accent: "border-t-slate-300" },
  { iconVariant: "indigo" as const, accent: "border-t-slate-300" },
  { iconVariant: "amber" as const, accent: "border-t-slate-300" },
];

export function AboutValues() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Nos valeurs"
          badgeVariant="amber"
          title="Ce en quoi nous croyons"
          subtitle="Six principes qui guident chacune de nos décisions et chaque ligne de code que nous écrivons."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {VALUES.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 0.08}>
              <div className={`relative bg-white rounded-xl p-6 border border-slate-200 border-t-[3px] ${valueColors[i].accent} shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04),4px_4px_12px_-6px_rgba(0,0,0,0.03),-4px_4px_12px_-6px_rgba(0,0,0,0.03)] hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.15),4px_4px_16px_-4px_rgba(0,0,0,0.04),-4px_4px_16px_-4px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-500 h-full overflow-hidden group`}>
                {/* Corner gradient highlight — top-left */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-400/[0.08] via-indigo-300/[0.03] to-transparent rounded-tl-xl pointer-events-none" aria-hidden="true" />
                {/* Corner gradient highlight — bottom-right */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/[0.12] via-slate-200/[0.04] to-transparent rounded-br-xl pointer-events-none" aria-hidden="true" />
                {/* Gradient border highlight on hover — partial contour */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-indigo-400/30 via-transparent to-slate-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" aria-hidden="true" />
                <IconBox
                  icon={value.icon}
                  variant={valueColors[i].iconVariant}
                  size="lg"
                  className="mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
