import Link from "next/link";
import { ShieldX, ArrowLeft } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
          <ShieldX className="h-8 w-8 text-rose-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Accès refusé</h1>
        <p className="mt-2 text-sm text-slate-500">
          Vous n&apos;avez pas les permissions nécessaires pour accéder à cette
          page.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
