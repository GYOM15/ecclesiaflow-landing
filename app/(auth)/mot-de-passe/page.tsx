"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/ui/password-input";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { passwordSchema, type PasswordFormData } from "@/lib/validation/schemas";

type PageState = "form" | "redirecting" | "expired" | "noToken";

export default function MotDePassePage() {
  const [pageState, setPageState] = useState<PageState>("form");
  const [error, setError] = useState<string | null>(null);
  const [setupToken, setSetupToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const passwordValue = watch("password", "");

  useEffect(() => {
    const token = sessionStorage.getItem("setupToken");
    if (!token) {
      setPageState("noToken");
    } else {
      setSetupToken(token);
    }
  }, []);

  async function onSubmit(data: PasswordFormData) {
    if (!setupToken) return;
    setError(null);

    try {
      const response = await fetch("/api/setup-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: data.password,
          setupToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.accessToken) {
        // Auto-login with Direct Grant tokens (happy path)
        sessionStorage.removeItem("setupToken");
        setPageState("redirecting");

        await new Promise((r) => setTimeout(r, 100));

        try {
          const signInResult = await signIn("credentials", {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: String(result.expiresIn),
            redirect: false,
          });

          if (signInResult?.ok) {
            window.location.href = "/callback";
          } else {
            setError("Impossible de démarrer la session");
            setPageState("form");
          }
        } catch (signInError) {
          console.error("signIn error:", signInError);
          setError("Erreur lors de la connexion automatique");
          setPageState("form");
        }
        return;
      } else if (response.ok) {
        // Password set successfully but no tokens (Direct Grant unavailable)
        // Fallback: redirect through Keycloak OIDC login (transparent for the user)
        sessionStorage.removeItem("setupToken");
        setPageState("redirecting");
        await signIn("keycloak", { callbackUrl: "/callback" });
        return;
      } else if (response.status === 410) {
        sessionStorage.removeItem("setupToken");
        setPageState("expired");
      } else {
        setError(result.message || "Une erreur est survenue");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Impossible de contacter le serveur");
    }
  }

  if (pageState === "noToken") {
    return (
      <AuthCard title="Session invalide">
        <Alert variant="warning">
          Aucun token de configuration trouvé. Veuillez suivre le lien dans votre email de confirmation.
        </Alert>
      </AuthCard>
    );
  }

  if (pageState === "expired") {
    return (
      <AuthCard title="Session expirée">
        <div className="space-y-4">
          <Alert variant="warning">
            Votre session a expiré (15 minutes). Veuillez renvoyer un email de confirmation.
          </Alert>
          <Link
            href="/inscription"
            className="block w-full text-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Retour à l&apos;inscription
          </Link>
        </div>
      </AuthCard>
    );
  }

  if (pageState === "redirecting") {
    return (
      <AuthCard title="Mot de passe défini !">
        <div className="flex flex-col items-center gap-6 py-8">
          <Spinner size="lg" />
          <div className="text-center">
            <p className="text-sm font-medium text-emerald-600">
              Mot de passe défini avec succès
            </p>
            <p className="text-xs text-slate-400 mt-1">Connexion en cours...</p>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Créer votre mot de passe"
      subtitle="Dernière étape ! Choisissez un mot de passe sécurisé."
    >
      {error && (
        <Alert variant="error" dismissible className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordInput
          label="Mot de passe"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordRequirements password={passwordValue} />

        <PasswordInput
          label="Confirmer le mot de passe"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Spinner size="sm" className="text-white" />}
          Définir le mot de passe
        </button>
      </form>
    </AuthCard>
  );
}
