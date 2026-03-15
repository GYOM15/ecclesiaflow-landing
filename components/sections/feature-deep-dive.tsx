"use client";

import { CheckCircle2, TrendingUp, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { FEATURES_DEEP_DIVE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function MembersMockup() {
  const members = [
    { name: "Marie Dupont", role: "Louange · Groupe A", status: "Actif", color: "bg-indigo-500", statusBg: "bg-teal-50 text-teal-600" },
    { name: "Jean-Paul Mbeki", role: "Jeunesse · Groupe C", status: "Actif", color: "bg-teal-500", statusBg: "bg-teal-50 text-teal-600" },
    { name: "Claire Bonnet", role: "Accueil · Groupe B", status: "Nouveau", color: "bg-amber-500", statusBg: "bg-amber-50 text-amber-600" },
    { name: "Esther Kone", role: "Prière · Groupe A", status: "Actif", color: "bg-indigo-500", statusBg: "bg-teal-50 text-teal-600" },
    { name: "Thomas Martin", role: "Média · Groupe D", status: "Actif", color: "bg-teal-500", statusBg: "bg-teal-50 text-teal-600" },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900">Annuaire des membres</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">847 membres</span>
        </div>
        <span className="inline-flex items-center gap-0.5 text-[11px] text-slate-500 font-medium">Filtrer <ChevronRight className="h-3 w-3" /></span>
      </div>
      <div className="space-y-2">
        {members.map((m) => (
          <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
            <div className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-xs font-bold text-white`}>
              {m.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{m.name}</p>
              <p className="text-xs text-slate-400">{m.role}</p>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${m.statusBg}`}>{m.status}</span>
            <div className="w-12 h-1.5 bg-slate-200 rounded-full hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunicationMockup() {
  const campaigns = [
    { title: "Rappel culte dimanche", sent: "623", rate: "94%", color: "bg-indigo-400" },
    { title: "Invitation retraite", sent: "412", rate: "87%", color: "bg-teal-400" },
    { title: "Newsletter mensuelle", sent: "847", rate: "78%", color: "bg-indigo-400" },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-900">Centre de messages</span>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">3 campagnes</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Envoyés", value: "1 882", icon: "✉️" },
          { label: "Ouverts", value: "86%", icon: "📬" },
          { label: "Clics", value: "34%", icon: "🔗" },
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
            <div className="text-sm mb-0.5">{s.icon}</div>
            <div className="text-sm font-bold text-slate-900">{s.value}</div>
            <div className="text-[10px] text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2.5">
        {campaigns.map((msg) => (
          <div key={msg.title} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-900">{msg.title}</span>
              <span className="text-xs text-slate-500 font-medium">{msg.rate} ouvert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${msg.color} rounded-full`} style={{ width: msg.rate }} />
              </div>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">{msg.sent} envoyés</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsMockup() {
  const events = [
    { title: "Culte dominical", date: "Dim.", time: "10:00", attendees: "~620", color: "bg-indigo-500" },
    { title: "Groupe de prière", date: "Mer.", time: "19:30", attendees: "45", color: "bg-teal-500" },
    { title: "Répétition louange", date: "Sam.", time: "14:00", attendees: "18", color: "bg-amber-500" },
    { title: "Retraite jeunesse", date: "15-17", time: "Mars", attendees: "85", color: "bg-indigo-500" },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-900">Événements à venir</span>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">Ce mois</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="text-lg font-bold text-slate-700">768</div>
          <div className="text-[10px] text-slate-400">Inscrits total</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="text-lg font-bold text-slate-700 flex items-center gap-1">92% <TrendingUp className="h-3 w-3" /></div>
          <div className="text-[10px] text-slate-400">Taux de présence</div>
        </div>
      </div>
      <div className="space-y-2">
        {events.map((evt) => (
          <div key={evt.title} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className={`w-10 h-10 rounded-xl ${evt.color} bg-opacity-10 flex flex-col items-center justify-center`}>
              <span className="text-[10px] font-medium leading-none opacity-70">{evt.date}</span>
              <span className="text-xs font-bold">{evt.time}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{evt.title}</p>
              <p className="text-xs text-slate-400">{evt.attendees} participants</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockups = [MembersMockup, CommunicationMockup, EventsMockup];

export function FeatureDeepDive() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        {FEATURES_DEEP_DIVE.map((feature, index) => {
          const MockupComponent = mockups[index];
          return (
            <div
              key={feature.title}
              className={cn(
                "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                index < FEATURES_DEEP_DIVE.length - 1 && "mb-20 lg:mb-28"
              )}
            >
              <ScrollReveal direction={feature.reversed ? "right" : "left"} className={cn(feature.reversed && "lg:order-2")}>
                <Badge variant="indigo" className="mb-4">{feature.badge}</Badge>
                <p className="text-sm font-medium text-slate-400 mb-2">{feature.subtitle}</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight mb-4 leading-snug">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal direction={feature.reversed ? "left" : "right"} delay={0.15} className={cn(feature.reversed && "lg:order-1")}>
                <div className="relative">
                  {/* Diffuse glow */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/[0.08] via-slate-500/[0.03] to-transparent blur-2xl" aria-hidden="true" />

                  {/* Gradient border highlight on select mockups */}
                  {(index === 0 || index === 2) && (
                    <div className="absolute -inset-[1.5px] rounded-xl bg-gradient-to-br from-indigo-400/40 via-indigo-200/15 to-slate-300/25 pointer-events-none" aria-hidden="true" />
                  )}

                  <div className="relative bg-white rounded-xl border border-slate-200 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.06),0_4px_20px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-200" />
                      <div className="flex-1 mx-3">
                        <div className="bg-white rounded-md px-3 py-1 text-[10px] text-slate-300 border border-slate-100 max-w-[180px] mx-auto text-center">
                          app.ecclesiaflow.com
                        </div>
                      </div>
                    </div>
                    <MockupComponent />
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
