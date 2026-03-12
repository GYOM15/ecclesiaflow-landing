import Link from "next/link";
import { Lock, ArrowLeft, LogIn } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Lock className="h-8 w-8 text-indigo-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Authentification requise
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Veuillez vous connecter pour accéder à cette page.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/connexion"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Se connecter
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
