"use client";

import {
  Users, Calendar, BarChart3, MessageSquare, CreditCard, Settings,
  Bell, Search, Home, TrendingUp, ChevronRight, CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/animation/scroll-reveal";

const sidebarItems = [
  { icon: Home, label: "Accueil", active: true },
  { icon: Users, label: "Membres", active: false },
  { icon: Calendar, label: "Événements", active: false },
  { icon: MessageSquare, label: "Messages", active: false },
  { icon: CreditCard, label: "Finances", active: false },
  { icon: BarChart3, label: "Rapports", active: false },
  { icon: Settings, label: "Paramètres", active: false },
];

const stats = [
  { label: "Membres actifs", value: "847", change: "+12", icon: Users, accent: "border-l-indigo-500", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
  { label: "Présence dim.", value: "623", change: "+5%", icon: BarChart3, accent: "border-l-teal-500", iconBg: "bg-teal-50", iconColor: "text-teal-500" },
  { label: "Nouveaux", value: "34", change: "+18%", icon: TrendingUp, accent: "border-l-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-500" },
  { label: "Dons ce mois", value: "$12,450", change: "+8%", icon: CreditCard, accent: "border-l-indigo-500", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
];

const members = [
  { name: "Marie Dupont", group: "Louange · Groupe A", status: "Actif", color: "bg-indigo-500" },
  { name: "Jean-Paul Mbeki", group: "Jeunesse · Groupe C", status: "Actif", color: "bg-teal-500" },
  { name: "Claire Bonnet", group: "Accueil · Groupe B", status: "Nouveau", color: "bg-amber-500" },
  { name: "Esther Kone", group: "Prière · Groupe A", status: "Actif", color: "bg-indigo-500" },
  { name: "Thomas Martin", group: "Média · Groupe D", status: "Actif", color: "bg-teal-500" },
];

const events = [
  { name: "Culte dominical", date: "Dim. 10h00", count: 620, color: "bg-indigo-500" },
  { name: "Groupe de prière", date: "Mer. 19h30", count: 45, color: "bg-teal-500" },
  { name: "Répétition louange", date: "Sam. 14h00", count: 18, color: "bg-amber-500" },
];

export function DashboardMockup() {
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-b from-indigo-500/[0.06] via-indigo-400/[0.03] to-transparent blur-3xl" aria-hidden="true" />
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/[0.03] via-transparent to-indigo-400/[0.03] blur-2xl" aria-hidden="true" />

            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-[0_8px_60px_-12px_rgba(99,102,241,0.12),0_4px_30px_-6px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-300" />
                  <div className="w-3 h-3 rounded-full bg-amber-300" />
                  <div className="w-3 h-3 rounded-full bg-green-300" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-slate-400 border border-slate-200 max-w-md mx-auto flex items-center gap-2">
                    <Search className="h-3 w-3" />app.ecclesiaflow.com/dashboard
                  </div>
                </div>
              </div>

              <div className="flex min-h-[500px] lg:min-h-[600px]">
                <div className="hidden md:flex flex-col w-56 bg-slate-900 text-white p-4 shrink-0">
                  <div className="flex items-center gap-2 mb-8 px-2">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                      <rect width="24" height="24" rx="6" fill="#6366F1" />
                      <path d="M10 6a1 1 0 011-1h2a1 1 0 011 1v4h4a1 1 0 011 1v2a1 1 0 01-1 1h-4v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4H6a1 1 0 01-1-1v-2a1 1 0 011-1h4V6z" fill="white" opacity="0.9" />
                    </svg>
                    <span className="text-sm font-semibold">EcclesiaFlow</span>
                  </div>
                  <nav className="space-y-1 flex-1">
                    {sidebarItems.map((item) => (
                      <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${item.active ? "bg-white/10 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}>
                        <item.icon className="h-4 w-4" />{item.label}
                      </div>
                    ))}
                  </nav>
                  <div className="flex items-center gap-2.5 px-3 py-2 border-t border-slate-800 pt-4 mt-4">
                    <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-semibold">PD</div>
                    <div><p className="text-xs text-white font-medium">Pasteur David</p><p className="text-[10px] text-slate-500">Admin</p></div>
                  </div>
                </div>

                <div className="flex-1 bg-slate-50/50 p-4 sm:p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Bonjour, Pasteur David</h2>
                      <p className="text-xs text-slate-400">Église Nouvelle Vie &middot; Dimanche 9 mars 2025</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative"><Bell className="h-5 w-5 text-slate-400" /><div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" /></div>
                      <div className="hidden sm:flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-400"><Search className="h-3.5 w-3.5" />Rechercher...</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {stats.map((stat, i) => (
                      <div key={i} className={`bg-white rounded-xl p-4 border border-slate-100 border-l-[3px] ${stat.accent}`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{stat.label}</p>
                          <div className={`w-6 h-6 rounded-lg ${stat.iconBg} flex items-center justify-center`}><stat.icon className={`h-3 w-3 ${stat.iconColor}`} /></div>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-xl font-bold text-slate-900">{stat.value}</span>
                          <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 mb-0.5"><TrendingUp className="h-2.5 w-2.5" />{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">Membres récents</span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-medium">847</span>
                        </div>
                        <span className="inline-flex items-center gap-0.5 text-xs text-indigo-500 font-medium">Voir tout<ChevronRight className="h-3 w-3" /></span>
                      </div>
                      {members.map((member, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-[10px] font-bold text-white`}>{member.name.split(" ").map((n) => n[0]).join("")}</div>
                            <div><p className="text-xs font-medium text-slate-900">{member.name}</p><p className="text-[10px] text-slate-400">{member.group}</p></div>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${member.status === "Nouveau" ? "bg-amber-50 text-amber-600" : "bg-teal-50 text-teal-600"}`}>{member.status}</span>
                        </div>
                      ))}
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-white rounded-xl border border-slate-100 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-slate-900">Fréquentation</span>
                          <span className="text-[10px] text-indigo-500 font-medium">Ce mois</span>
                        </div>
                        <div className="flex items-end gap-1.5 h-20">
                          {[45, 62, 55, 78, 65, 82, 70, 88, 75, 92, 80, 85].map((h, i) => (
                            <div key={i} className="flex-1"><div className={`w-full rounded-sm ${i === 9 ? "bg-indigo-500" : i >= 8 ? "bg-indigo-300" : "bg-indigo-100"}`} style={{ height: `${h}%` }} /></div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-slate-100"><span className="text-xs font-semibold text-slate-900">Prochains événements</span></div>
                        {events.map((evt, i) => (
                          <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50/50 transition-colors">
                            <div className={`w-1.5 h-8 rounded-full ${evt.color}`} />
                            <div className="flex-1 min-w-0"><p className="text-xs font-medium text-slate-800 truncate">{evt.name}</p><p className="text-[10px] text-slate-400">{evt.date} &middot; {evt.count} pers.</p></div>
                            <CheckCircle2 className="h-3.5 w-3.5 text-slate-200" />
                          </div>
                        ))}
                      </div>

                      <div className="bg-white rounded-xl border border-slate-100 p-4">
                        <p className="text-xs font-semibold text-slate-900 mb-3">Actions rapides</p>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: "Ajouter membre", icon: Users, bg: "bg-indigo-50", color: "text-indigo-600" },
                            { label: "Nouvel événement", icon: Calendar, bg: "bg-teal-50", color: "text-teal-600" },
                            { label: "Envoyer message", icon: MessageSquare, bg: "bg-amber-50", color: "text-amber-600" },
                            { label: "Voir rapports", icon: BarChart3, bg: "bg-indigo-50", color: "text-indigo-500" },
                          ].map((action) => (
                            <div key={action.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 cursor-pointer">
                              <div className={`w-7 h-7 rounded-lg ${action.bg} flex items-center justify-center`}><action.icon className={`h-3.5 w-3.5 ${action.color}`} /></div>
                              <span className="text-[10px] font-medium text-slate-600">{action.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
