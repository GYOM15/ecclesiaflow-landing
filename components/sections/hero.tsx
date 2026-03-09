"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Users,
  Calendar,
  TrendingUp,
  CreditCard,
  Bell,
  Search,
  ChevronRight,
  BarChart3,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/decorative/gradient-text";

const statsCards = [
  { label: "Membres actifs", value: "847", change: "+12", icon: Users, accent: "border-l-indigo-500", iconBg: "bg-indigo-50", iconColor: "text-indigo-500" },
  { label: "Présence dimanche", value: "623", change: "+5%", icon: BarChart3, accent: "border-l-emerald-500", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  { label: "Nouveaux ce mois", value: "34", change: "+18%", icon: TrendingUp, accent: "border-l-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-500" },
  { label: "Dons collectés", value: "12 450€", change: "+8%", icon: CreditCard, accent: "border-l-violet-500", iconBg: "bg-violet-50", iconColor: "text-violet-500" },
];

const memberRows = [
  { name: "Marie Dupont", ministry: "Louange", group: "Groupe A", status: "Actif", color: "bg-indigo-500" },
  { name: "Jean-Paul Mbeki", ministry: "Jeunesse", group: "Groupe C", status: "Actif", color: "bg-emerald-500" },
  { name: "Claire Bonnet", ministry: "Accueil", group: "Groupe B", status: "Nouveau", color: "bg-amber-500" },
  { name: "Esther Kone", ministry: "Prière", group: "Groupe A", status: "Actif", color: "bg-violet-500" },
  { name: "Thomas Martin", ministry: "Média", group: "Groupe D", status: "Actif", color: "bg-rose-500" },
  { name: "Paul Diallo", ministry: "Diaconie", group: "Groupe B", status: "Actif", color: "bg-teal-500" },
];

const upcomingEvents = [
  { name: "Culte dominical", time: "Dim. 10h00", count: 620, color: "bg-indigo-500" },
  { name: "Groupe de prière", time: "Mer. 19h30", count: 45, color: "bg-emerald-500" },
  { name: "Répétition louange", time: "Sam. 14h00", count: 18, color: "bg-amber-500" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-4 lg:pt-36 lg:pb-8">
      {/* Sunlight radiant background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[30%] -right-[15%] w-[70%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08),rgba(251,191,36,0.02)_50%,transparent_80%)] rounded-full blur-3xl" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),rgba(99,102,241,0.01)_50%,transparent_80%)] rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[30%] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.04),transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <svg className="absolute top-0 right-0 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] opacity-[0.04]" viewBox="0 0 600 600" fill="none">
          <g transform="translate(450,120) rotate(15)">
            {[0, 30, 60, 90, 120, 150].map((angle) => (
              <rect key={angle} x="-2" y="-300" width="4" height="600" rx="2" fill="#F59E0B" transform={`rotate(${angle})`} />
            ))}
            <circle cx="0" cy="0" r="40" fill="#F59E0B" opacity="0.5" />
            <circle cx="0" cy="0" r="80" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.3" />
          </g>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-14 lg:mb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="indigo" dot className="mb-6">Maintenant en bêta ouverte</Badge>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[1.75rem] sm:text-[2.25rem] lg:text-[2.85rem] font-semibold tracking-tight leading-[1.15] text-slate-900 mb-6">
            L&apos;infrastructure complète pour gérer, connecter et{" "}
            <GradientText from="#6366F1" to="#818CF8">faire grandir</GradientText>{" "}
            votre église — de la première inscription à la millième
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-8">
            EcclesiaFlow réunit la gestion des membres, la communication, les événements et les finances dans une plateforme unique, intuitive et conçue pour les besoins spécifiques de votre église.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-4">
            <Button size="lg" variant="primary">Démarrer gratuitement<ArrowRight className="h-4 w-4" /></Button>
            <Button size="lg" variant="outline"><Play className="h-4 w-4" />Voir la démo</Button>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-sm text-slate-400">
            Gratuit pour les petites églises &middot; Aucune carte de crédit requise &middot; Configuration en 5 minutes
          </motion.p>
        </div>

        {/* Dashboard mockup */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="relative">
          <div className="absolute -inset-6 lg:-inset-10 rounded-3xl bg-gradient-to-b from-indigo-500/[0.07] via-indigo-400/[0.04] to-transparent blur-3xl" aria-hidden="true" />
          <div className="absolute -inset-4 lg:-inset-8 rounded-3xl bg-gradient-to-br from-amber-400/[0.04] via-transparent to-indigo-400/[0.04] blur-2xl" aria-hidden="true" />

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

            <div className="flex min-h-[400px] lg:min-h-[520px]">
              {/* Sidebar */}
              <div className="hidden lg:flex flex-col w-52 bg-slate-900 text-white p-4 shrink-0">
                <div className="flex items-center gap-2 mb-7 px-1">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                    <rect width="24" height="24" rx="6" fill="#6366F1" />
                    <path d="M10 6a1 1 0 011-1h2a1 1 0 011 1v4h4a1 1 0 011 1v2a1 1 0 01-1 1h-4v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4H6a1 1 0 01-1-1v-2a1 1 0 011-1h4V6z" fill="white" opacity="0.9" />
                  </svg>
                  <span className="text-sm font-semibold">EcclesiaFlow</span>
                </div>
                <nav className="space-y-0.5 flex-1">
                  {[
                    { icon: BarChart3, label: "Dashboard", active: true },
                    { icon: Users, label: "Membres", active: false },
                    { icon: Calendar, label: "Événements", active: false },
                    { icon: MessageSquare, label: "Messages", active: false },
                    { icon: CreditCard, label: "Finances", active: false },
                  ].map((item) => (
                    <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${item.active ? "bg-white/10 text-white font-medium" : "text-slate-400"}`}>
                      <item.icon className="h-4 w-4" />{item.label}
                    </div>
                  ))}
                </nav>
                <div className="flex items-center gap-2 px-2 py-2 border-t border-slate-800 pt-4 mt-4">
                  <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-semibold">PD</div>
                  <div>
                    <p className="text-xs text-white font-medium">Pasteur David</p>
                    <p className="text-[10px] text-slate-500">Admin</p>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 bg-slate-50/50 p-4 sm:p-5 overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Bonjour, Pasteur David</h2>
                    <p className="text-[11px] text-slate-400">Église Nouvelle Vie &middot; Dimanche 9 mars 2025</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative"><Bell className="h-4 w-4 text-slate-400" /><div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" /></div>
                    <div className="hidden sm:flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[11px] text-slate-400"><Search className="h-3 w-3" />Rechercher...</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
                  {statsCards.map((stat, i) => (
                    <div key={i} className={`bg-white rounded-xl p-3.5 border border-slate-100 border-l-[3px] ${stat.accent}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{stat.label}</p>
                        <div className={`w-6 h-6 rounded-lg ${stat.iconBg} flex items-center justify-center`}><stat.icon className={`h-3 w-3 ${stat.iconColor}`} /></div>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 mb-0.5"><TrendingUp className="h-2.5 w-2.5" />{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-5 gap-3">
                  <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900">Membres récents</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-medium">847</span>
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-[11px] text-indigo-500 font-medium">Voir tout<ChevronRight className="h-3 w-3" /></span>
                    </div>
                    <div className="hidden sm:grid grid-cols-[1fr_80px_80px_60px] px-4 py-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider border-b border-slate-50">
                      <span>Membre</span><span>Ministère</span><span>Groupe</span><span>Statut</span>
                    </div>
                    {memberRows.map((member, i) => (
                      <div key={i} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_80px_80px_60px] items-center px-4 py-2 border-b border-slate-50/80 last:border-0 hover:bg-slate-50/50">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-xs font-medium text-slate-800 truncate">{member.name}</span>
                        </div>
                        <span className="hidden sm:block text-[11px] text-slate-500">{member.ministry}</span>
                        <span className="hidden sm:block text-[11px] text-slate-400">{member.group}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${member.status === "Nouveau" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{member.status}</span>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-2 space-y-3">
                    <div className="bg-white rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-900">Fréquentation</span>
                        <span className="text-[10px] text-indigo-500 font-medium">Ce mois</span>
                      </div>
                      <div className="flex items-end gap-1.5 h-16">
                        {[45, 62, 55, 78, 65, 82, 70, 88, 75, 92, 80, 85].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col justify-end">
                            <div className={`w-full rounded-sm ${i === 9 ? "bg-indigo-500" : i >= 8 ? "bg-indigo-300" : "bg-indigo-100"}`} style={{ height: `${h}%` }} />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-1.5"><span className="text-[9px] text-slate-300">Sem 1</span><span className="text-[9px] text-slate-300">Sem 12</span></div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                      <div className="px-4 py-2.5 border-b border-slate-100"><span className="text-xs font-semibold text-slate-900">Prochains événements</span></div>
                      {upcomingEvents.map((evt, i) => (
                        <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 border-b border-slate-50 last:border-0">
                          <div className={`w-1.5 h-8 rounded-full ${evt.color}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium text-slate-800 truncate">{evt.name}</p>
                            <p className="text-[10px] text-slate-400">{evt.time} &middot; {evt.count} pers.</p>
                          </div>
                          <CheckCircle2 className="h-3.5 w-3.5 text-slate-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
