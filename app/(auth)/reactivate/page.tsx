"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { reactivateMyAccount } from "@/lib/api/members";

export default function ReactivatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleReactivate() {
    if (!session?.accessToken) return;
    setError(null);
    setLoading(true);

    const result = await reactivateMyAccount(session.accessToken);

    if (result.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      setError(result.error.message || "Une erreur est survenue.");
      setLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <AuthCard
        title="Réactivation"
        subtitle="Chargement de votre session..."
      >
        <div className="flex flex-col items-center gap-4 py-8">
          <Spinner size="lg" />
        </div>
      </AuthCard>
    );
  }

  if (status === "unauthenticated") {
    return (
      <AuthCard
        title="Réactivation"
        subtitle="Connectez-vous pour réactiver votre compte"
      >
        <div className="space-y-4">
          <Alert variant="info">
            Veuillez vous connecter avec vos identifiants pour réactiver votre
            compte.
          </Alert>
          <a
            href="/connexion"
            className="block w-full text-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Se connecter
          </a>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Réactivation de votre compte"
      subtitle="Votre compte est en attente de suppression"
    >
      <div className="space-y-4">
        {success ? (
          <Alert variant="success">
            Votre compte a été réactivé ! Redirection vers le tableau de
            bord...
          </Alert>
        ) : (
          <>
            <Alert variant="warning">
              Votre compte est en attente de suppression. Vous avez 30 jours
              pour le réactiver avant que vos données ne soient définitivement
              supprimées.
            </Alert>

            {error && <Alert variant="error">{error}</Alert>}

            <button
              onClick={handleReactivate}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Spinner size="sm" className="text-white" />}
              Réactiver mon compte
            </button>
          </>
        )}
      </div>
    </AuthCard>
  );
}
