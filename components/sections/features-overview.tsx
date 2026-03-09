"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { FEATURES_OVERVIEW } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const accentColors = ["indigo", "emerald", "amber", "violet", "rose", "teal"] as const;
const iconBgs = [
  "bg-indigo-50 text-indigo-600",
  "bg-emerald-50 text-emerald-600",
  "bg-amber-50 text-amber-600",
  "bg-violet-50 text-violet-600",
  "bg-rose-50 text-rose-600",
  "bg-teal-50 text-teal-600",
];

function MiniMockup({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
        {[
          { initials: "MD", name: "w-20", bg: "bg-indigo-100", text: "text-indigo-600", status: "Actif", sBg: "bg-emerald-50 text-emerald-600" },
          { initials: "JM", name: "w-24", bg: "bg-amber-100", text: "text-amber-600", status: "Nouveau", sBg: "bg-amber-50 text-amber-600" },
        ].map((r) => (
          <div key={r.initials} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <div className={`w-5 h-5 rounded-full ${r.bg} flex items-center justify-center text-[8px] font-bold ${r.text}`}>{r.initials}</div>
            <div className="flex-1"><div className={`h-2 bg-slate-200 rounded ${r.name}`} /><div className="h-1.5 bg-slate-100 rounded w-14 mt-1" /></div>
            <div className={`text-[8px] px-1.5 py-0.5 rounded-full ${r.sBg}`}>{r.status}</div>
          </div>
        ))}
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
        {[{ label: "Rappel culte", pct: "94%", color: "bg-emerald-400" }, { label: "Newsletter", pct: "78%", color: "bg-indigo-400" }].map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1"><span className="text-[9px] font-medium text-slate-700">{m.label}</span><span className="text-[8px] text-emerald-500 font-medium">{m.pct}</span></div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${m.color} rounded-full`} style={{ width: m.pct }} /></div>
          </div>
        ))}
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
        {[{ n: "Culte", c: "bg-indigo-500", t: "Dim. 10h" }, { n: "Prière", c: "bg-emerald-500", t: "Mer. 19h" }].map((e) => (
          <div key={e.n} className="flex items-center gap-2"><div className={`w-1 h-5 rounded-full ${e.c}`} /><span className="text-[9px] font-medium text-slate-700 flex-1">{e.n}</span><span className="text-[8px] text-slate-400">{e.t}</span></div>
        ))}
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-end gap-1 h-10 mb-1.5">
          {[30, 50, 40, 65, 55, 75, 60, 80].map((h, i) => (
            <div key={i} className="flex-1"><div className={`w-full rounded-sm ${i >= 6 ? "bg-indigo-500" : "bg-indigo-200"}`} style={{ height: `${h}%` }} /></div>
          ))}
        </div>
        <div className="flex justify-between"><span className="text-[8px] text-slate-400">+23% ce mois</span><span className="text-[8px] font-semibold text-emerald-500">↑ 847</span></div>
      </div>
    );
  }
  if (index === 4) {
    return (
      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between mb-2"><span className="text-[9px] font-semibold text-slate-800">12 450 €</span><span className="text-[8px] text-emerald-500 font-medium">+8%</span></div>
        <div className="grid grid-cols-3 gap-1">
          {[{ l: "Dîmes", v: "8 200€", bg: "bg-indigo-50", t: "text-indigo-600", ts: "text-indigo-400" }, { l: "Offrandes", v: "3 100€", bg: "bg-amber-50", t: "text-amber-600", ts: "text-amber-400" }, { l: "Projets", v: "1 150€", bg: "bg-emerald-50", t: "text-emerald-600", ts: "text-emerald-400" }].map((d) => (
            <div key={d.l} className={`${d.bg} rounded-md p-1.5 text-center`}><div className={`text-[8px] font-bold ${d.t}`}>{d.l}</div><div className={`text-[7px] ${d.ts}`}>{d.v}</div></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
      {["RGPD conforme", "Chiffrement AES-256", "Sauvegardes auto."].map((t) => (
        <div key={t} className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-[8px] text-emerald-600">✓</div><span className="text-[9px] font-medium text-slate-700">{t}</span></div>
      ))}
    </div>
  );
}

export function FeaturesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Fonctionnalités"
          title="Tout ce dont votre église a besoin, au même endroit"
          subtitle="Une suite complète d'outils conçus spécifiquement pour les communautés de foi. Simples à utiliser, puissants à exploiter."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES_OVERVIEW.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <Card
                variant="feature"
                accentColor={accentColors[index]}
                className="h-full group"
                thumbnail={
                  feature.tag ? (
                    <Badge variant={feature.tag === "Populaire" ? "amber" : "indigo"}>{feature.tag}</Badge>
                  ) : undefined
                }
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110 ${iconBgs[index]}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                <MiniMockup index={index} />
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-indigo-500 group-hover:gap-2 transition-all">
                  En savoir plus <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
