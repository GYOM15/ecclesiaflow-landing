import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-slate-200 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Page introuvable
        </h1>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
