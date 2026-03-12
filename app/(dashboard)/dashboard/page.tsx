"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  ArrowRight,
  Church,
} from "lucide-react";
import { getMyProfile, type SignUpResponse } from "@/lib/api/members";

const STAT_CARDS = [
  { label: "Membres", value: "0", icon: Users, color: "bg-indigo-50 text-indigo-600" },
  { label: "Événements", value: "0", icon: Calendar, color: "bg-emerald-50 text-emerald-600" },
  { label: "Messages", value: "0", icon: MessageSquare, color: "bg-amber-50 text-amber-600" },
  { label: "Dons", value: "0 €", icon: CreditCard, color: "bg-purple-50 text-purple-600" },
];

const NEXT_STEPS = [
  { title: "Configurer votre église", desc: "Ajoutez le nom, l'adresse et le logo de votre communauté." },
  { title: "Inviter des membres", desc: "Commencez à constituer votre annuaire de membres." },
  { title: "Créer un événement", desc: "Planifiez votre prochain culte ou événement communautaire." },
  { title: "Paramétrer les communications", desc: "Configurez vos modèles d'email et notifications." },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<SignUpResponse | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      getMyProfile(session.accessToken).then((result) => {
        if (result.ok) setProfile(result.data);
      });
    }
  }, [session]);

  const firstName = profile?.firstName;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl shrink-0">
            <Church className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {firstName ? `Bienvenue, ${firstName} !` : "Bienvenue !"}
            </h1>
            <p className="text-slate-500 mt-1">
              Votre espace de gestion EcclesiaFlow est prêt. Commencez par explorer les fonctionnalités disponibles.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-200 p-6">
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
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Prochaines étapes</h2>
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
