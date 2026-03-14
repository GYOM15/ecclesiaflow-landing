"use client";

import {
  Users, Calendar, TrendingUp, CreditCard, Bell, Search,
  BarChart3, MessageSquare, CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const statsCards = [
  { label: "Membres actifs", value: "847", change: "+12", icon: Users, accent: "border-l-slate-300", iconBg: "bg-slate-50", iconColor: "text-slate-500" },
  { label: "Présence dimanche", value: "623", change: "+5%", icon: BarChart3, accent: "border-l-slate-300", iconBg: "bg-slate-50", iconColor: "text-slate-500" },
  { label: "Nouveaux ce mois", value: "34", change: "+18%", icon: TrendingUp, accent: "border-l-slate-300", iconBg: "bg-slate-50", iconColor: "text-slate-500" },
  { label: "Dons collectés", value: "$12,450", change: "+8%", icon: CreditCard, accent: "border-l-slate-300", iconBg: "bg-slate-50", iconColor: "text-slate-500" },
];

const upcomingEvents = [
  { name: "Culte dominical", time: "Dim. 10h00", count: 620, color: "bg-slate-400" },
  { name: "Groupe de prière", time: "Mer. 19h30", count: 45, color: "bg-slate-300" },
  { name: "Répétition louange", time: "Sam. 14h00", count: 18, color: "bg-slate-300" },
];

const chartPoints = [120, 180, 160, 240, 200, 280, 260, 320, 290, 360, 340, 380];
const chartMax = 420;
const chartWidth = 400;
const chartHeight = 100;
const chartPath = chartPoints
  .map((v, i) => {
    const x = (i / (chartPoints.length - 1)) * chartWidth;
    const y = chartHeight - (v / chartMax) * chartHeight;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  })
  .join(" ");
const chartAreaPath = `${chartPath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;

export function DashboardShowcase() {
  return (
    <section className="py-14 lg:py-18 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Aperçu"
          title="Une interface pensée pour votre quotidien"
          subtitle="Tout ce dont vous avez besoin, visible en un coup d'œil. Gérez votre église comme jamais auparavant."
        />

        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto">
            {/* Diffuse glow behind */}
            <div className="absolute -inset-8 lg:-inset-12 rounded-3xl bg-gradient-to-b from-slate-200/[0.04] via-slate-300/[0.02] to-transparent blur-3xl" aria-hidden="true" />

            {/* Browser frame — ZERO borders, shadow only, narrower */}
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden bg-white shadow-[0_8px_60px_-12px_rgba(99,102,241,0.10),0_4px_30px_-6px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50">
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

              <div className="flex min-h-[280px] lg:min-h-[340px]">
                {/* Sidebar */}
                <div className="hidden lg:flex flex-col w-48 bg-slate-900 text-white p-4 shrink-0">
                  <div className="flex items-center gap-2 mb-7 px-1">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"><rect width="24" height="24" rx="6" fill="#6366F1" /><path d="M10 6a1 1 0 011-1h2a1 1 0 011 1v4h4a1 1 0 011 1v2a1 1 0 01-1 1h-4v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4H6a1 1 0 01-1-1v-2a1 1 0 011-1h4V6z" fill="white" opacity="0.9" /></svg>
                    <span className="text-sm font-semibold">EcclesiaFlow</span>
                  </div>
                  <nav className="space-y-0.5 flex-1">
                    {[
                      { icon: BarChart3, label: "Dashboard", active: true },
                      { icon: Users, label: "Membres" },
                      { icon: Calendar, label: "Événements" },
                      { icon: MessageSquare, label: "Messages" },
                      { icon: CreditCard, label: "Finances" },
                    ].map((item) => (
                      <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${"active" in item && item.active ? "bg-white/10 text-white font-medium" : "text-slate-400"}`}>
                        <item.icon className="h-4 w-4" />{item.label}
                      </div>
                    ))}
                  </nav>
                  <div className="flex items-center gap-2 px-2 py-2 pt-4 mt-4">
                    <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-semibold">PD</div>
                    <div><p className="text-xs text-white font-medium">Pasteur David</p><p className="text-[10px] text-slate-500">Admin</p></div>
                  </div>
                </div>

                {/* Main content — chart + events only */}
                <div className="flex-1 bg-slate-50 p-4 sm:p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">Bonjour, Pasteur David</h2>
                      <p className="text-[11px] text-slate-400">Église Nouvelle Vie &middot; Dimanche 9 mars 2025</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative"><Bell className="h-4 w-4 text-slate-400" /><div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" /></div>
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
                    {statsCards.map((stat, i) => (
                      <div key={i} className={`bg-white rounded-xl p-3.5 border border-slate-100 border-l-[3px] ${stat.accent}`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{stat.label}</p>
                          <div className={`w-6 h-6 rounded-lg ${stat.iconBg} flex items-center justify-center`}><stat.icon className={`h-3 w-3 ${stat.iconColor}`} /></div>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                          <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 mb-0.5"><TrendingUp className="h-2.5 w-2.5" />{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chart + Events only */}
                  <div className="grid lg:grid-cols-5 gap-3">
                    <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xs font-semibold text-slate-900">Croissance mensuelle</span>
                          <span className="text-[10px] text-teal-500 font-medium ml-2">+24%</span>
                        </div>
                        <div className="flex gap-3">
                          {["6M", "1A", "Tout"].map((period, j) => (
                            <span key={period} className={`text-[10px] px-2 py-0.5 rounded-md cursor-pointer ${j === 1 ? "bg-slate-100 text-slate-700 font-semibold" : "text-slate-400"}`}>{period}</span>
                          ))}
                        </div>
                      </div>
                      <div className="relative h-24 lg:h-28">
                        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full" preserveAspectRatio="none">
                          {[0.25, 0.5, 0.75].map((p) => (
                            <line key={p} x1="0" y1={chartHeight * p} x2={chartWidth} y2={chartHeight * p} stroke="#f1f5f9" strokeWidth="1" />
                          ))}
                          <path d={chartAreaPath} fill="url(#chartGrad)" opacity="0.3" />
                          <path d={chartPath} fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx={chartWidth} cy={chartHeight - (chartPoints[chartPoints.length - 1] / chartMax) * chartHeight} r="4" fill="#6366F1" stroke="white" strokeWidth="2" />
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                        <div className="px-4 py-2.5"><span className="text-xs font-semibold text-slate-900">Prochains événements</span></div>
                        {upcomingEvents.map((evt, i) => (
                          <div key={i} className="flex items-center gap-2.5 px-4 py-2.5">
                            <div className={`w-1.5 h-8 rounded-full ${evt.color}`} />
                            <div className="flex-1 min-w-0"><p className="text-[11px] font-medium text-slate-800 truncate">{evt.name}</p><p className="text-[10px] text-slate-400">{evt.time} &middot; {evt.count} pers.</p></div>
                            <CheckCircle2 className="h-3.5 w-3.5 text-slate-200" />
                          </div>
                        ))}
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
