"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { INTEGRATIONS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const iconStyles = [
  "bg-indigo-50 text-indigo-600",
  "bg-emerald-50 text-emerald-600",
  "bg-amber-50 text-amber-600",
  "bg-violet-50 text-violet-600",
  "bg-teal-50 text-teal-600",
  "bg-rose-50 text-rose-600",
  "bg-blue-50 text-blue-600",
  "bg-orange-50 text-orange-600",
];

const accentColors = ["indigo", "emerald", "amber", "violet", "teal", "rose", "indigo", "amber"] as const;

export function Integrations() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Intégrations"
          title="S'intègre parfaitement à vos outils existants"
          subtitle="Connectez EcclesiaFlow aux services que vous utilisez déjà. Synchronisation automatique, sans friction."
        />

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {INTEGRATIONS.map((integration, i) => (
            <StaggerItem key={integration.name}>
              <Card variant="feature" accentColor={accentColors[i]} className="text-center py-7 group">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${iconStyles[i]} mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <integration.icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{integration.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed px-2 mb-3">{integration.description}</p>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Configurer <ArrowRight className="h-3 w-3" />
                </span>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
