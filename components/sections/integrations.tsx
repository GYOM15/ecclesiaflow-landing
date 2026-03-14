"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { INTEGRATIONS } from "@/lib/constants";
import { MessageSquare, Calendar, CreditCard, Mail, Send, Bell, Smartphone, Shield } from "lucide-react";

/* 3 showcase mockups — minimaliste, avec couleurs subtiles */

function SmsMockup() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/50 p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center"><MessageSquare className="h-3.5 w-3.5 text-indigo-500" /></div>
        <span className="text-xs font-semibold text-slate-700">SMS & Notifications</span>
      </div>
      <div className="space-y-2">
        <div className="bg-indigo-50 rounded-lg px-3 py-2 max-w-[80%]">
          <p className="text-[10px] text-indigo-700">Rappel : Culte dominical demain à 10h 🙏</p>
        </div>
        <div className="bg-slate-50 rounded-lg px-3 py-2 max-w-[70%] ml-auto">
          <p className="text-[10px] text-slate-600">Merci ! Je serai là avec ma famille.</p>
        </div>
        <div className="bg-teal-50 rounded-lg px-3 py-2 max-w-[75%]">
          <p className="text-[10px] text-teal-700">📅 Groupe de prière — Mer. 19h30 confirmé</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
        <div className="flex-1 h-7 bg-slate-50 rounded-md border border-slate-100" />
        <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center cursor-pointer"><Send className="h-3 w-3 text-white" /></div>
      </div>
    </div>
  );
}

function CalendarMockup() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/50 p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center"><Calendar className="h-3.5 w-3.5 text-teal-500" /></div>
        <span className="text-xs font-semibold text-slate-700">Calendrier partagé</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center mb-2">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={`${d}-${i}`} className="text-[8px] text-slate-400 font-medium py-0.5">{d}</span>
        ))}
        {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
          <div key={d} className={`text-[9px] py-1 rounded-md cursor-pointer transition-colors duration-200 hover:bg-slate-100 ${d === 9 ? "bg-indigo-500 text-white font-bold hover:bg-indigo-600" : d === 12 ? "bg-teal-100 text-teal-700 font-medium" : d === 16 ? "bg-amber-100 text-amber-700 font-medium" : "text-slate-600"}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        {[
          { color: "bg-indigo-500", label: "Culte", time: "10h-12h" },
          { color: "bg-teal-500", label: "Groupe de prière", time: "19h30" },
        ].map((evt) => (
          <div key={evt.label} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 rounded-md px-1 py-0.5 transition-colors duration-200">
            <div className={`w-1 h-4 rounded-full ${evt.color}`} />
            <span className="text-[9px] font-medium text-slate-700 flex-1">{evt.label}</span>
            <span className="text-[8px] text-slate-400">{evt.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentMockup() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/50 p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center"><CreditCard className="h-3.5 w-3.5 text-indigo-500" /></div>
        <span className="text-xs font-semibold text-slate-700">Paiements & Dons</span>
      </div>
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-3 mb-3 text-white">
        <p className="text-[8px] uppercase tracking-wider opacity-70 mb-1">Total des dons</p>
        <p className="text-lg font-bold">$12,450</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">+8% ce mois</span>
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          { name: "Stripe", status: "Connecté", color: "text-teal-500" },
          { name: "PayPal", status: "Connecté", color: "text-teal-500" },
          { name: "Virement", status: "Actif", color: "text-indigo-500" },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-md px-1 py-0.5 transition-colors duration-200">
            <span className="text-[10px] font-medium text-slate-700">{p.name}</span>
            <span className={`text-[9px] font-medium ${p.color}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Intégrations"
          title="S'intègre parfaitement à vos outils existants"
          subtitle="Connectez EcclesiaFlow aux services que vous utilisez déjà. Synchronisation automatique, sans friction."
        />

        {/* Mockups showcase — Linear style */}
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-3 bg-indigo-500/[0.04] rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <div className="relative transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_36px_-8px_rgba(99,102,241,0.15)]  rounded-xl">
                <SmsMockup />
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-3 bg-teal-500/[0.04] rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <div className="relative transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_36px_-8px_rgba(20,184,166,0.15)] rounded-xl">
                <CalendarMockup />
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-3 bg-indigo-500/[0.04] rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <div className="relative transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_36px_-8px_rgba(99,102,241,0.15)] rounded-xl">
                <PaymentMockup />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Icon strip — compact list of all integrations */}
        <ScrollReveal delay={0.15}>
          <div className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8">
            <p className="text-sm font-semibold text-slate-900 mb-5 text-center">Toutes nos intégrations</p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
              {INTEGRATIONS.map((integration, i) => {
                const colors = [
                  "bg-indigo-50 text-indigo-500", "bg-teal-50 text-teal-500",
                  "bg-amber-50 text-amber-600", "bg-indigo-50 text-indigo-500",
                  "bg-teal-50 text-teal-500", "bg-amber-50 text-amber-600",
                  "bg-indigo-50 text-indigo-500", "bg-teal-50 text-teal-500",
                ];
                return (
                  <div key={integration.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl ${colors[i]} flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                      <integration.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 text-center leading-tight group-hover:text-slate-700 transition-colors duration-200">{integration.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
