"use client";

import { Shield, LayoutGrid, Lock, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import Link from "next/link";

const badges = [
  {
    icon: Shield,
    title: "Open Source",
    description: "Code transparent et auditable",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    icon: LayoutGrid,
    title: "Multi-tenant",
    description: "Chaque église a son espace isolé",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: Lock,
    title: "Données sécurisées",
    description: "Conforme RGPD, chiffrement bout en bout",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    icon: Clock,
    title: "Prêt en 5 min",
    description: "Aucune installation requise",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
  },
];

export function TrustBadges() {
  return (
    <section className="py-14 lg:py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          {/* 4-column badge grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-start gap-2.5 p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-[0_1px_4px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(99,102,241,0.12)] transition-all duration-300 hover:-translate-y-0.5 cursor-default"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${badge.iconBg} flex items-center justify-center shrink-0`}>
                  <badge.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${badge.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{badge.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Beta banner */}
          <div className="flex items-center justify-center gap-3 bg-white rounded-xl border border-slate-200 px-5 py-3.5 max-w-lg mx-auto">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
            </span>
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Bêta ouverte</span>
              {" "}— Accès anticipé gratuit, places limitées
            </p>
            <Link
              href="/inscription"
              className="shrink-0 text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Rejoindre →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
