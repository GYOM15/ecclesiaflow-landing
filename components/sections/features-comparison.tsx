"use client";

import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { FEATURES_COMPARISON } from "@/lib/constants";

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-5 w-5 text-slate-500 mx-auto" />;
  if (value === false) return <X className="h-5 w-5 text-slate-300 mx-auto" />;
  return <span className="text-sm text-slate-600">{value}</span>;
}

export function FeaturesComparison() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Comparaison"
          title="Pourquoi choisir EcclesiaFlow ?"
          subtitle="Comparez notre solution avec les alternatives traditionnelles."
        />

        <ScrollReveal>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-[var(--shadow-card)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-900">
                      Critère
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-slate-900 w-32 bg-slate-50">
                      EcclesiaFlow
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-slate-500 w-32">
                      Logiciel traditionnel
                    </th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-slate-500 w-32">
                      Tableur
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES_COMPARISON.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={
                        i < FEATURES_COMPARISON.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }
                    >
                      <td className="py-3.5 px-6 text-sm text-slate-600">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-center bg-slate-50/50">
                        <CellValue value={row.ecclesiaflow} />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <CellValue value={row.traditional} />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <CellValue value={row.spreadsheet} />
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
