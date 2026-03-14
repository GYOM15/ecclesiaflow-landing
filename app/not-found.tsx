import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <FileQuestion className="h-8 w-8 text-indigo-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Page introuvable</h1>
        <p className="mt-2 text-sm text-slate-500">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
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
