"use client";

import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { PRICING_COMPARISON } from "@/lib/constants";

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="h-5 w-5 text-indigo-500 mx-auto" />;
  }
  if (value === false) {
    return <X className="h-5 w-5 text-slate-300 mx-auto" />;
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
          <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-[var(--shadow-card)]">
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
                    <th className="text-center py-4 px-4 text-sm font-semibold text-indigo-600 w-28 bg-indigo-50/50">
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
                      <td className="py-3.5 px-4 text-center bg-indigo-50/30">
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
