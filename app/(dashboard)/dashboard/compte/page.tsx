"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Mail,
  Lock,
  ShieldAlert,
  AlertTriangle,
  Trash2,
  Key,
} from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { FormField } from "@/components/ui/form-field";
import { Spinner } from "@/components/ui/spinner";
import { emailSchema, type EmailFormData } from "@/lib/validation/schemas";
import { requestEmailChange, deleteMyAccount } from "@/lib/api/members";
import { useMember } from "@/contexts/member-context";

type SocialProvider = "GOOGLE" | "MICROSOFT" | "FACEBOOK";

const PROVIDER_LABELS: Record<SocialProvider, string> = {
  GOOGLE: "Google",
  MICROSOFT: "Microsoft",
  FACEBOOK: "Facebook",
};

export default function AccountPage() {
  const { data: session } = useSession();
  const { member } = useMember();

  const currentEmail = member.email;
  const socialProvider = member.socialProvider ?? null;
  const hasLocalCredentials = member.hasLocalCredentials ?? true;
  const needsLocalCredentials = socialProvider != null && !hasLocalCredentials;

  // Email change state
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Password change state
  const [changingPassword, setChangingPassword] = useState(false);

  // Delete state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  async function onEmailSubmit(data: EmailFormData) {
    if (!session?.accessToken || !currentEmail) return;
    setEmailError(null);
    setEmailSuccess(null);

    const newEmail = data.email.trim().toLowerCase();

    if (newEmail === currentEmail) {
      setEmailError("Le nouvel email est identique à l'actuel.");
      return;
    }

    const result = await requestEmailChange(session.accessToken, newEmail);

    if (result.ok) {
      setEmailSuccess(
        "Un email de confirmation a été envoyé à votre nouvelle adresse. " +
          "Veuillez cliquer sur le lien pour valider le changement."
      );
      reset({ email: "" });
    } else if (result.error.status === 403) {
      setEmailError(
        "Vous devez d'abord ajouter un mot de passe avant de modifier votre email."
      );
    } else if (result.error.status === 409) {
      setEmailError(
        "Cette adresse email est déjà utilisée par un autre compte."
      );
    } else {
      setEmailError(result.error.message || "Une erreur est survenue.");
    }
  }

  function handleChangePassword() {
    setChangingPassword(true);
    signIn("keycloak", { callbackUrl: "/dashboard/compte" }, { kc_action: "UPDATE_PASSWORD" });
  }

  async function handleDelete() {
    if (!session?.accessToken || confirmText !== "SUPPRIMER") return;
    setDeleteError(null);
    setDeleting(true);

    const result = await deleteMyAccount(session.accessToken);

    if (result.ok) {
      const idToken = session?.idToken;
      if (idToken) {
        document.cookie = `ef_logout_hint=${encodeURIComponent(idToken)}; path=/; max-age=30; SameSite=Lax`;
      }
      await signOut({ redirect: false });
      window.location.href = "/api/auth/federated-signout";
    } else {
      setDeleteError(result.error.message || "Une erreur est survenue.");
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Mon compte</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gérez votre adresse email, mot de passe et paramètres de compte.
        </p>
      </div>

      {/* ─── Section 1: Email ─── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-slate-700" />
          <h2 className="text-lg font-semibold text-slate-900">
            Adresse email
          </h2>
        </div>

        {/* Current email */}
        <div>
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
          <div className="flex items-start gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <Lock className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-sm text-indigo-800">
              <p className="font-medium">Mot de passe requis</p>
              <p className="mt-0.5 text-indigo-700">
                Votre compte a été créé avec{" "}
                <strong>{PROVIDER_LABELS[socialProvider!]}</strong>. Pour
                modifier votre adresse email, vous devez d&apos;abord ajouter un
                mot de passe à votre compte.
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

        {/* Warning for users with credentials */}
        {!needsLocalCredentials && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Opération sensible</p>
              <p className="mt-0.5 text-amber-700">
                La modification de votre email changera votre identifiant de
                connexion. Un email de confirmation sera envoyé à votre nouvelle
                adresse.
              </p>
            </div>
          </div>
        )}

        {/* Email change form */}
        {!needsLocalCredentials && (
          <form onSubmit={handleSubmit(onEmailSubmit)}>
            <div className="space-y-4">
              {emailSuccess && (
                <Alert
                  variant="success"
                  dismissible
                  onDismiss={() => setEmailSuccess(null)}
                >
                  {emailSuccess}
                </Alert>
              )}
              {emailError && (
                <Alert
                  variant="error"
                  dismissible
                  onDismiss={() => setEmailError(null)}
                >
                  {emailError}
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

      {/* ─── Section 2: Password (hidden for SSO users without local credentials) ─── */}
      {hasLocalCredentials && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-slate-700" />
            <h2 className="text-lg font-semibold text-slate-900">
              Mot de passe
            </h2>
          </div>

          <p className="text-sm text-slate-600">
            Modifier votre mot de passe de connexion. Vous serez redirigé vers
            une page sécurisée pour effectuer le changement.
          </p>
          <button
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {changingPassword ? (
              <Spinner size="sm" className="text-white" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            Modifier mon mot de passe
          </button>
        </div>
      )}

      {/* ─── Section 3: Danger zone ─── */}
      <div className="rounded-2xl border-2 border-red-200 bg-red-50/50">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-red-900">
                Zone dangereuse
              </h2>
              <p className="text-sm text-red-700 mt-1">
                Votre compte sera désactivé pendant 30 jours puis définitivement
                supprimé. Vous pourrez le réactiver en vous reconnectant pendant
                cette période.
              </p>
            </div>
          </div>

          {deleteError && (
            <Alert variant="error" className="mt-4">
              {deleteError}
            </Alert>
          )}

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer mon compte
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-sm text-red-800 font-medium">
                Tapez{" "}
                <span className="font-mono bg-red-100 px-1.5 py-0.5 rounded">
                  SUPPRIMER
                </span>{" "}
                pour confirmer :
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="SUPPRIMER"
                className="w-full rounded-xl border border-red-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={confirmText !== "SUPPRIMER" || deleting}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? (
                    <Spinner size="sm" className="text-white" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Confirmer la suppression
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    setConfirmText("");
                  }}
                  disabled={deleting}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
