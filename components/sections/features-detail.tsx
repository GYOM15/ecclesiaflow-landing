"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { FEATURE_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CheckCircle2, TrendingUp } from "lucide-react";

const categoryMeta = [
  { accent: "indigo" as const, gradient: "from-indigo-500/[0.06] to-indigo-400/[0.02]", iconBg: "bg-indigo-50 text-indigo-600", heading: "Connaissez chaque membre, suivez chaque parcours" },
  { accent: "indigo" as const, gradient: "from-emerald-500/[0.06] to-emerald-400/[0.02]", iconBg: "bg-emerald-50 text-emerald-600", heading: "Communiquez efficacement, touchez chaque cœur" },
  { accent: "amber" as const, gradient: "from-amber-500/[0.06] to-amber-400/[0.02]", iconBg: "bg-amber-50 text-amber-600", heading: "Organisez vos événements sans effort" },
  { accent: "indigo" as const, gradient: "from-violet-500/[0.06] to-violet-400/[0.02]", iconBg: "bg-violet-50 text-violet-600", heading: "Gérez vos finances en toute transparence" },
  { accent: "indigo" as const, gradient: "from-teal-500/[0.06] to-teal-400/[0.02]", iconBg: "bg-teal-50 text-teal-600", heading: "Sécurisez et administrez en confiance" },
];

function MembersMock() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-900">Annuaire</span>
        <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">847 membres</span>
      </div>
      {[
        { name: "Marie Dupont", role: "Louange · Famille Dupont", c: "bg-indigo-500" },
        { name: "Jean Mbeki", role: "Jeunesse · Célibataire", c: "bg-emerald-500" },
        { name: "Claire Bonnet", role: "Accueil · Famille Bonnet", c: "bg-amber-500" },
        { name: "Paul Diallo", role: "Prière · Famille Diallo", c: "bg-violet-500" },
      ].map((m) => (
        <div key={m.name} className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <div className={`w-8 h-8 rounded-full ${m.c} flex items-center justify-center text-[10px] font-bold text-white`}>{m.name.split(" ").map(n=>n[0]).join("")}</div>
          <div className="flex-1 min-w-0"><p className="text-xs font-medium text-slate-800 truncate">{m.name}</p><p className="text-[10px] text-slate-400">{m.role}</p></div>
          <div className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full">Actif</div>
        </div>
      ))}
    </div>
  );
}

function CommunicationMock() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-900">Campagnes</span>
        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">86% moyen</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[{ l: "Envoyés", v: "2 341" }, { l: "Ouverts", v: "86%" }, { l: "Clics", v: "34%" }].map(s => (
          <div key={s.l} className="bg-emerald-50/50 rounded-lg p-2 text-center border border-emerald-100/50"><div className="text-xs font-bold text-emerald-700">{s.v}</div><div className="text-[9px] text-emerald-500">{s.l}</div></div>
        ))}
      </div>
      {[{ t: "Rappel culte", r: "94%", c: "bg-emerald-400" }, { t: "Newsletter", r: "78%", c: "bg-indigo-400" }, { t: "Retraite", r: "87%", c: "bg-amber-400" }].map(m => (
        <div key={m.t} className="mb-2 last:mb-0">
          <div className="flex justify-between mb-1"><span className="text-[11px] font-medium text-slate-700">{m.t}</span><span className="text-[10px] text-emerald-500">{m.r}</span></div>
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${m.c} rounded-full`} style={{ width: m.r }} /></div>
        </div>
      ))}
    </div>
  );
}

function EventsMock() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-900">Calendrier</span>
        <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">4 cette semaine</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-3">
        {["L","M","M","J","V","S","D"].map((d,i) => (
          <div key={d+i} className={cn("h-7 rounded-md flex items-center justify-center text-[9px] font-medium", i===6?"bg-indigo-100 text-indigo-700":i===2?"bg-emerald-100 text-emerald-700":"bg-slate-50 text-slate-400")}>{d}</div>
        ))}
      </div>
      {[{n:"Culte",t:"Dim. 10h",c:"bg-indigo-500",p:"620"},{n:"Prière",t:"Mer. 19h30",c:"bg-emerald-500",p:"45"},{n:"Louange",t:"Sam. 14h",c:"bg-amber-500",p:"18"}].map(e=>(
        <div key={e.n} className="flex items-center gap-2 mb-1.5 last:mb-0 p-2 bg-slate-50 rounded-lg border border-slate-100">
          <div className={`w-1 h-6 rounded-full ${e.c}`}/><div className="flex-1"><span className="text-[11px] font-medium text-slate-800">{e.n}</span><span className="text-[10px] text-slate-400 ml-2">{e.t}</span></div><span className="text-[9px] text-slate-400">{e.p}</span>
        </div>
      ))}
    </div>
  );
}

function FinanceMock() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-900">Finances</span>
        <span className="flex items-center gap-0.5 text-[10px] text-emerald-500 font-medium"><TrendingUp className="h-3 w-3"/>+8%</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-violet-50 rounded-xl p-3 border border-violet-100/50"><div className="text-sm font-bold text-violet-700">12 450€</div><div className="text-[10px] text-violet-400">Dons</div></div>
        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100/50"><div className="text-sm font-bold text-emerald-700">8 200€</div><div className="text-[10px] text-emerald-400">Dîmes</div></div>
      </div>
      <div className="flex items-end gap-1 h-12 mb-1">
        {[40,55,48,72,60,80,65,85,70,90,75,88].map((h,i)=>(
          <div key={i} className="flex-1"><div className={`w-full rounded-sm ${i>=10?"bg-violet-500":i>=8?"bg-violet-300":"bg-violet-100"}`} style={{height:`${h}%`}}/></div>
        ))}
      </div>
    </div>
  );
}

function AdminMock() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-900">Sécurité</span>
        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">✓ Protégé</span>
      </div>
      {[
        { label: "RGPD & conformité", desc: "Données protégées" },
        { label: "Chiffrement AES-256", desc: "Transit et repos" },
        { label: "Sauvegardes auto.", desc: "Quotidiennes" },
        { label: "Audit trail", desc: "Toutes les actions" },
      ].map(s=>(
        <div key={s.label} className="flex items-center gap-2.5 mb-2 last:mb-0 p-2 bg-slate-50 rounded-lg border border-slate-100">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600"/></div>
          <div><div className="text-[11px] font-medium text-slate-800">{s.label}</div><div className="text-[9px] text-slate-400">{s.desc}</div></div>
        </div>
      ))}
    </div>
  );
}

const mockComponents = [MembersMock, CommunicationMock, EventsMock, FinanceMock, AdminMock];

export function FeaturesDetail() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        {FEATURE_CATEGORIES.map((cat, catIndex) => {
          const meta = categoryMeta[catIndex];
          const MockComponent = mockComponents[catIndex];
          const reversed = catIndex % 2 === 1;
          return (
            <div key={cat.id} className={cn("grid lg:grid-cols-2 gap-10 lg:gap-16 items-center")}>
              <ScrollReveal direction={reversed?"right":"left"} className={cn(reversed&&"lg:order-2")}>
                <Badge variant={meta.accent} className="mb-4">{cat.label}</Badge>
                <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mb-6 leading-snug">{meta.heading}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {cat.features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg ${meta.iconBg} flex items-center justify-center shrink-0`}><feature.icon className="h-4 w-4"/></div>
                      <div><h4 className="text-sm font-semibold text-slate-900 mb-0.5">{feature.title}</h4><p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p></div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal direction={reversed?"left":"right"} delay={0.15} className={cn(reversed&&"lg:order-1")}>
                <div className="relative">
                  <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${meta.gradient} blur-2xl`} aria-hidden="true"/>
                  <div className="relative bg-white rounded-2xl border border-slate-200/60 shadow-[0_8px_40px_-8px_rgba(99,102,241,0.1),0_4px_20px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/40">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-200"/><div className="w-2.5 h-2.5 rounded-full bg-amber-200"/><div className="w-2.5 h-2.5 rounded-full bg-green-200"/>
                      <div className="flex-1 mx-3"><div className="bg-white rounded-md px-3 py-1 text-[10px] text-slate-300 border border-slate-100 max-w-[200px] mx-auto text-center">app.ecclesiaflow.com/{cat.id}</div></div>
                    </div>
                    <div className="p-5"><MockComponent/></div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
