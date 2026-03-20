"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  ArrowRight,
  Church,
  UserCircle,
  X,
} from "lucide-react";
import { useMember } from "@/contexts/member-context";

const BANNER_STORAGE_KEY = "profile-banner-dismissed";
const BANNER_REMIND_DELAY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
// TODO: Migrer le mécanisme de dismiss vers un flag côté serveur
// (ex: champ `profileBannerDismissedAt: DateTime?` dans l'entité Member en BDD)
// afin de ne plus dépendre de localStorage qui persiste entre suppressions de compte.

function isBannerDismissed(): boolean {
  if (typeof window === "undefined") return false;
  const dismissed = localStorage.getItem(BANNER_STORAGE_KEY);
  if (!dismissed) return false;
  return Date.now() - Number(dismissed) < BANNER_REMIND_DELAY_MS;
}

const STAT_CARDS = [
  { label: "Membres", value: "0", icon: Users, color: "bg-indigo-50 text-indigo-500" },
  { label: "Événements", value: "0", icon: Calendar, color: "bg-teal-50 text-teal-600" },
  { label: "Messages", value: "0", icon: MessageSquare, color: "bg-amber-50 text-amber-600" },
  { label: "Dons", value: "0 $", icon: CreditCard, color: "bg-purple-50 text-purple-600" },
];

const NEXT_STEPS = [
  { title: "Configurer votre église", desc: "Ajoutez le nom, l'adresse et le logo de votre communauté." },
  { title: "Inviter des membres", desc: "Commencez à constituer votre annuaire de membres." },
  { title: "Créer un événement", desc: "Planifiez votre prochain culte ou événement communautaire." },
  { title: "Paramétrer les communications", desc: "Configurez vos modèles d'email et notifications." },
];

export default function DashboardPage() {
  const { member } = useMember();
  const [bannerHidden, setBannerHidden] = useState(true);

  useEffect(() => {
    setBannerHidden(isBannerDismissed());
  }, []);

  const isProfileIncomplete = !member.address || !member.phoneNumber;
  const showBanner = isProfileIncomplete && !bannerHidden;

  function dismissBanner() {
    localStorage.setItem(BANNER_STORAGE_KEY, String(Date.now()));
    setBannerHidden(true);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-indigo-50 rounded-xl shrink-0">
            <Church className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">
              Bienvenue, {member.firstName} !
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              Votre espace de gestion EcclesiaFlow est prêt. Commencez par explorer les fonctionnalités disponibles.
            </p>
          </div>
        </div>
      </div>

      {/* Profile completion banner */}
      {showBanner && (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 bg-amber-100 rounded-xl shrink-0">
                <UserCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1 sm:flex-initial">
                <p className="text-sm font-medium text-amber-900">
                  Complétez votre profil
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Ajoutez votre {!member.address && "adresse"}{!member.address && !member.phoneNumber && " et votre "}{!member.phoneNumber && "numéro de téléphone"} pour faciliter la communication avec votre communauté.
                </p>
              </div>
              <button
                onClick={dismissBanner}
                className="p-1.5 rounded-lg text-amber-400 hover:text-amber-600 hover:bg-amber-100 transition-colors shrink-0 cursor-pointer sm:hidden"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <Link
                href="/dashboard/profil"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-medium text-white hover:bg-amber-700 transition-colors shrink-0 w-full sm:w-auto justify-center"
              >
                Compléter
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={dismissBanner}
                className="p-1.5 rounded-lg text-amber-400 hover:text-amber-600 hover:bg-amber-100 transition-colors shrink-0 cursor-pointer hidden sm:block"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
            <div className={`inline-flex p-2.5 rounded-xl ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">Prochaines étapes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {NEXT_STEPS.map((action) => (
            <div
              key={action.title}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{action.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">
          Ces fonctionnalités seront disponibles prochainement.
        </p>
      </div>
    </div>
  );
}
