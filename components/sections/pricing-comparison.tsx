"use client";

import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { PRICING_COMPARISON } from "@/lib/constants";

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-teal-50">
          <Check className="h-4 w-4 text-teal-500" />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
          <X className="h-4 w-4 text-red-300" />
        </div>
      </div>
    );
  }
  return <span className="text-sm text-slate-600">{value}</span>;
}

export function PricingComparison() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Comparaison détaillée des plans"
          subtitle="Trouvez le plan qui correspond aux besoins de votre communauté."
        />

        <ScrollReveal>
          <div className="relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[var(--shadow-card)]">
            {/* Gradient highlight — right border */}
            <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-400/30 via-indigo-300/50 to-slate-300/30 pointer-events-none z-10" aria-hidden="true" />
            {/* Gradient highlight — bottom border */}
            <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-slate-300/30 via-indigo-300/50 to-indigo-400/30 pointer-events-none z-10" aria-hidden="true" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">
                      Fonctionnalité
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-slate-900 w-28">
                      Gratuit
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-slate-900 w-28 bg-slate-50">
                      Pro
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-slate-900 w-28">
                      Entreprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={
                        i < PRICING_COMPARISON.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }
                    >
                      <td className="py-3.5 px-6 text-sm text-slate-600">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <CellValue value={row.free} />
                      </td>
                      <td className="py-3.5 px-4 text-center bg-slate-50/50">
                        <CellValue value={row.pro} />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <CellValue value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
