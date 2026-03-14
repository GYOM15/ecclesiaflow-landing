"use client";

import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { FEATURES_COMPARISON } from "@/lib/constants";

function CellValue({ value, isEcclesia }: { value: boolean | string; isEcclesia?: boolean }) {
  if (value === true) {
    return (
      <div className="flex items-center justify-center">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isEcclesia ? "bg-teal-50" : "bg-slate-50"}`}>
          <Check className={`h-4 w-4 ${isEcclesia ? "text-teal-500" : "text-slate-400"}`} />
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

export function FeaturesComparison() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Comparaison"
          title="Pourquoi choisir EcclesiaFlow ?"
          subtitle="Comparez notre solution avec les alternatives traditionnelles."
        />

        <StaggerContainer>
          <StaggerItem>
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
                        className={`transition-colors duration-200 hover:bg-slate-50/50 cursor-default ${
                          i < FEATURES_COMPARISON.length - 1
                            ? "border-b border-slate-100"
                            : ""
                        }`}
                      >
                        <td className="py-3.5 px-6 text-sm text-slate-600">
                          {row.feature}
                        </td>
                        <td className="py-3.5 px-4 text-center bg-slate-50/50">
                          <CellValue value={row.ecclesiaflow} isEcclesia />
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
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
