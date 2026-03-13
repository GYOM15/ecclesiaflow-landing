"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ShieldAlert, Lock } from "lucide-react";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { FormField } from "@/components/ui/form-field";
import { Spinner } from "@/components/ui/spinner";
import { emailSchema, type EmailFormData } from "@/lib/validation/schemas";
import { getMyProfile, requestEmailChange } from "@/lib/api/members";

type SocialProvider = "GOOGLE" | "MICROSOFT" | "FACEBOOK";

const PROVIDER_LABELS: Record<SocialProvider, string> = {
  GOOGLE: "Google",
  MICROSOFT: "Microsoft",
  FACEBOOK: "Facebook",
};

export default function EmailPage() {
  const { data: session } = useSession();
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [socialProvider, setSocialProvider] = useState<SocialProvider | null>(null);
  const [hasLocalCredentials, setHasLocalCredentials] = useState(true);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  useEffect(() => {
    if (!session?.accessToken) return;
    getMyProfile(session.accessToken).then((result) => {
      if (result.ok) {
        setCurrentEmail(result.data.email);
        setSocialProvider(result.data.socialProvider ?? null);
        setHasLocalCredentials(result.data.hasLocalCredentials ?? true);
      }
      setLoading(false);
    });
  }, [session]);

  const needsLocalCredentials = socialProvider != null && !hasLocalCredentials;

  async function onSubmit(data: EmailFormData) {
    if (!session?.accessToken || !currentEmail) return;
    setError(null);
    setSuccess(null);

    const newEmail = data.email.trim().toLowerCase();

    if (newEmail === currentEmail) {
      setError("Le nouvel email est identique à l'actuel.");
      return;
    }

    const result = await requestEmailChange(session.accessToken, newEmail);

    if (result.ok) {
      setSuccess(
        "Un email de confirmation a été envoyé à votre nouvelle adresse. " +
        "Veuillez cliquer sur le lien pour valider le changement."
      );
      reset({ email: "" });
    } else if (result.error.status === 403) {
      setError(
        "Vous devez d'abord ajouter un mot de passe avant de modifier votre email."
      );
    } else if (result.error.status === 409) {
      setError("Cette adresse email est déjà utilisée par un autre compte.");
    } else {
      setError(result.error.message || "Une erreur est survenue.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Modifier mon email
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Votre adresse email est utilisée pour vous connecter à votre compte.
        </p>
      </div>

      {/* Current email */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Email actuel
        </label>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-medium">
          <Mail className="h-4 w-4 text-slate-400" />
          {currentEmail}
        </div>
      </div>

      {/* SSO user without local credentials */}
      {needsLocalCredentials && (
        <div className="flex items-start gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
          <Lock className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-sm text-indigo-800">
            <p className="font-medium">Mot de passe requis</p>
            <p className="mt-0.5 text-indigo-700">
              Votre compte a été créé avec{" "}
              <strong>{PROVIDER_LABELS[socialProvider!]}</strong>. Pour modifier
              votre adresse email, vous devez d&apos;abord ajouter un mot de
              passe à votre compte.
            </p>
            <Link
              href="/dashboard/credentials"
              className="inline-flex items-center gap-2 mt-3 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <Lock className="h-4 w-4" />
              Ajouter un mot de passe
            </Link>
          </div>
        </div>
      )}

      {/* Warning */}
      {!needsLocalCredentials && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Opération sensible</p>
            <p className="mt-0.5 text-amber-700">
              La modification de votre email changera votre identifiant de
              connexion. Un email de confirmation sera envoyé à votre
              nouvelle adresse.
            </p>
          </div>
        </div>
      )}

      {/* New email form */}
      {!needsLocalCredentials && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            {success && (
              <Alert variant="success" dismissible onDismiss={() => setSuccess(null)}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert variant="error" dismissible onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}

            <FormField<EmailFormData>
              name="email"
              label="Nouvel email"
              type="email"
              placeholder="nouveau@email.com"
              register={register}
              errors={errors}
              icon={<Mail className="h-4 w-4" />}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Spinner size="sm" className="text-white" />}
              Modifier l&apos;email
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
