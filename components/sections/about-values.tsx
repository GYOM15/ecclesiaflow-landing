"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { IconBox } from "@/components/ui/icon-box";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { VALUES } from "@/lib/constants";

const valueColors = [
  { iconVariant: "indigo" as const, accent: "border-t-indigo-500" },
  { iconVariant: "teal" as const, accent: "border-t-teal-500" },
  { iconVariant: "amber" as const, accent: "border-t-amber-500" },
  { iconVariant: "indigo" as const, accent: "border-t-indigo-500" },
  { iconVariant: "teal" as const, accent: "border-t-teal-500" },
  { iconVariant: "amber" as const, accent: "border-t-amber-500" },
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
              <div className={`relative bg-white rounded-xl p-6 border border-slate-200 border-t-[3px] ${valueColors[i].accent} shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:border-indigo-200/60 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-500 h-full overflow-hidden group cursor-pointer`}>
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
