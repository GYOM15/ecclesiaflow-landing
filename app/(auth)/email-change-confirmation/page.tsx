"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { confirmEmailChange } from "@/lib/api/members";

type ConfirmState =
  | { status: "loading" }
  | { status: "success" }
  | { status: "invalid" }
  | { status: "expired" }
  | { status: "conflict" }
  | { status: "error"; message: string };

function EmailChangeConfirmationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<ConfirmState>({ status: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ status: "invalid" });
      return;
    }
    handleConfirmation(token);
  }, [token]);

  async function handleConfirmation(confirmToken: string) {
    const result = await confirmEmailChange(confirmToken);

    if (result.ok) {
      setState({ status: "success" });
    } else {
      switch (result.error.status) {
        case 400:
        case 404:
          setState({ status: "invalid" });
          break;
        case 409:
          setState({ status: "conflict" });
          break;
        case 410:
          setState({ status: "expired" });
          break;
        default:
          setState({
            status: "error",
            message: result.error.message || "Une erreur est survenue",
          });
      }
    }
  }

  return (
    <div className="space-y-4">
      {state.status === "loading" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <Spinner size="lg" />
          <p className="text-sm text-slate-500">
            Vérification en cours...
          </p>
        </div>
      )}

      {state.status === "success" && (
        <div className="space-y-4">
          <Alert variant="success">
            Votre adresse email a été mise à jour avec succès.
            Utilisez votre nouvel email pour vous connecter.
          </Alert>
          <Link
            href="/connexion"
            className="block w-full text-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      )}

      {state.status === "invalid" && (
        <Alert variant="error">
          Ce lien n&apos;est pas valide ou a déjà été utilisé.
          Veuillez effectuer une nouvelle demande de changement d&apos;email
          depuis votre tableau de bord.
        </Alert>
      )}

      {state.status === "expired" && (
        <Alert variant="warning">
          Ce lien a expiré. Veuillez effectuer une nouvelle demande de
          changement d&apos;email depuis votre tableau de bord.
        </Alert>
      )}

      {state.status === "conflict" && (
        <Alert variant="error">
          Cette adresse email est désormais utilisée par un autre compte.
          Veuillez choisir une autre adresse email.
        </Alert>
      )}

      {state.status === "error" && (
        <Alert variant="error">{state.message}</Alert>
      )}

      {state.status !== "loading" && state.status !== "success" && (
        <Link
          href="/dashboard/email"
          className="block w-full text-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Retour au tableau de bord
        </Link>
      )}
    </div>
  );
}

export default function EmailChangeConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
    <AuthCard
      title="Confirmation"
      subtitle="Changement d&apos;adresse email"
    >
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4 py-8">
            <Spinner size="lg" />
            <p className="text-sm text-slate-500">Chargement...</p>
          </div>
        }
      >
        <EmailChangeConfirmationContent />
      </Suspense>
    </AuthCard>
    </div>
  );
}
