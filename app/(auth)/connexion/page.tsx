"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { Spinner } from "@/components/ui/spinner";
import { Alert } from "@/components/ui/alert";
import { useSocialSignIn } from "@/lib/hooks/use-social-signin";

export default function ConnexionPage() {
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");
  const { error, handleSignIn, clearError } = useSocialSignIn();

  // If NextAuth redirected here with an error (e.g. PKCE / Configuration),
  // show the error UI instead of auto-redirecting to Keycloak again
  const displayError = authError
    ? "La connexion a échoué. Veuillez réessayer."
    : error;

  useEffect(() => {
    // Don't auto-redirect if there's an auth error in the URL
    if (!authError) {
      handleSignIn();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthCard
      title="Connexion"
      subtitle={displayError ? "Un problème est survenu" : "Redirection vers la page de connexion..."}
    >
      <div className="flex flex-col items-center gap-4 py-4">
        {displayError ? (
          <Alert variant="error" dismissible onDismiss={clearError}>
            {displayError}
          </Alert>
        ) : (
          <>
            <Spinner size="lg" />
            <p className="text-sm text-slate-500">Redirection en cours...</p>
          </>
        )}

        <div className="flex gap-3 w-full">
          {displayError && (
            <button
              onClick={() => {
                clearError();
                handleSignIn();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Réessayer
            </button>
          )}
          <Link
            href="/"
            className={`${displayError ? "flex-1" : "w-full"} inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors`}
          >
            <ArrowLeft className="h-4 w-4" />
            Accueil
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
