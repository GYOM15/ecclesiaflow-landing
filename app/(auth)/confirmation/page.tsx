"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { confirmEmail, resendConfirmation } from "@/lib/api/members";

type ConfirmState =
  | { status: "loading" }
  | { status: "success" }
  | { status: "invalid" }
  | { status: "already_confirmed" }
  | { status: "expired" }
  | { status: "error"; message: string };

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [state, setState] = useState<ConfirmState>({ status: "loading" });
  const [resendEmail, setResendEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleConfirmation = useCallback(async (confirmToken: string) => {
    const result = await confirmEmail(confirmToken);

    if (result.ok) {
      sessionStorage.setItem("setupToken", result.data.temporaryToken);
      setState({ status: "success" });
      setTimeout(() => router.push("/mot-de-passe"), 1500);
    } else {
      switch (result.error.status) {
        case 404:
          setState({ status: "invalid" });
          break;
        case 409:
          setState({ status: "already_confirmed" });
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
  }, [router]);

  useEffect(() => {
    if (!token) {
      setState({ status: "invalid" });
      return;
    }
    handleConfirmation(token);
  }, [token, handleConfirmation]);

  async function handleResend() {
    if (resendCooldown > 0 || !resendEmail) return;
    const result = await resendConfirmation(resendEmail);
    if (result.ok) {
      setResendCooldown(30);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }

  return (
    <div className="space-y-4">
      {state.status === "loading" && (
        <div className="flex flex-col items-center gap-4 py-8">
          <Spinner size="lg" />
          <p className="text-sm text-slate-500">Vérification en cours...</p>
        </div>
      )}

      {state.status === "success" && (
        <Alert variant="success">
          Votre email a été confirmé ! Redirection vers la création de mot de passe...
        </Alert>
      )}

      {state.status === "invalid" && (
        <Alert variant="error">
          Ce lien n&apos;est plus valide. Veuillez demander un nouveau lien de confirmation.
        </Alert>
      )}

      {state.status === "already_confirmed" && (
        <div className="space-y-4">
          <Alert variant="info">
            Votre compte est déjà confirmé. Vous pouvez vous connecter.
          </Alert>
          <Link
            href="/connexion"
            className="block w-full text-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      )}

      {state.status === "expired" && (
        <div className="space-y-4">
          <Alert variant="warning">
            Ce lien a expiré. Entrez votre email pour recevoir un nouveau lien.
          </Alert>
          <input
            type="email"
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0 || !resendEmail}
            className="w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0
              ? `Renvoyer dans ${resendCooldown}s`
              : "Renvoyer un email de confirmation"}
          </button>
        </div>
      )}

      {state.status === "error" && (
        <Alert variant="error">{state.message}</Alert>
      )}
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
    <AuthCard title="Confirmation" subtitle="Vérification de votre compte">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4 py-8">
            <Spinner size="lg" />
            <p className="text-sm text-slate-500">Chargement...</p>
          </div>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </AuthCard>
    </div>
  );
}
