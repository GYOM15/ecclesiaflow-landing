"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { SocialButton } from "@/components/auth/social-button";
import { OrDivider } from "@/components/auth/or-divider";
import { FormField } from "@/components/ui/form-field";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { signUpSchema, type SignUpFormData } from "@/lib/validation/schemas";
import { signUp, resendConfirmation } from "@/lib/api/members";
import { useSocialSignIn } from "@/lib/hooks/use-social-signin";

type PageState = "form" | "emailSent";

export default function InscriptionPage() {
  const [pageState, setPageState] = useState<PageState>("form");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { loading: socialLoading, error: socialError, handleSignIn, clearError: clearSocialError } = useSocialSignIn();
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  // Scroll vers l'erreur API quand elle apparaît
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  async function onSubmit(data: SignUpFormData) {
    setError(null);
    const result = await signUp({
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      address: data.address?.trim() || undefined,
      phoneNumber: data.phoneNumber?.trim() || undefined,
    });

    if (result.ok) {
      setSubmittedEmail(data.email);
      setPageState("emailSent");
    } else if (result.error.status === 409) {
      setError("Un compte avec cet email existe déjà.");
    } else {
      setError("Un problème est survenu. Veuillez réessayer plus tard.");
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return;
    const result = await resendConfirmation(submittedEmail);
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

  if (pageState === "emailSent") {
    return (
      <AuthSplitLayout>
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
              <rect width="24" height="24" rx="6" fill="#6366F1" />
              <path d="M10 2h4v5h5v4h-5v11h-4V11H5V7h5V2z" fill="white" opacity="0.9" />
            </svg>
            <span className="text-lg font-bold text-slate-900">EcclesiaFlow</span>
          </Link>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.08)] p-8 lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0 lg:rounded-none">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Vérifiez votre email</h1>
              <p className="text-sm text-slate-500 mt-1.5">
                Nous avons envoyé un lien de confirmation à {submittedEmail}
              </p>
            </div>

            <div className="space-y-4">
              <Alert variant="info">
                Cliquez sur le lien dans l&apos;email pour activer votre compte.
                Vérifiez votre dossier spam si vous ne trouvez pas l&apos;email.
              </Alert>
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0
                  ? `Renvoyer dans ${resendCooldown}s`
                  : "Renvoyer l'email"}
              </button>
            </div>
          </div>
        </div>
      </AuthSplitLayout>
    );
  }

  return (
    <AuthSplitLayout>
      <div className="w-full max-w-md mx-auto">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 lg:hidden">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
            <rect width="24" height="24" rx="6" fill="#6366F1" />
            <path d="M10 2h4v5h5v4h-5v11h-4V11H5V7h5V2z" fill="white" opacity="0.9" />
          </svg>
          <span className="text-lg font-bold text-slate-900">EcclesiaFlow</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.08)] p-8 lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0 lg:rounded-none">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Créer votre compte</h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Rejoignez des milliers d&apos;églises qui utilisent EcclesiaFlow
            </p>
          </div>

          {socialError && (
            <Alert variant="error" dismissible className="mb-4" onDismiss={clearSocialError}>
              {socialError}
            </Alert>
          )}

          <div className="flex gap-3">
            <SocialButton
              provider="google"
              label="Google"
              disabled={socialLoading}
              onClick={() => handleSignIn("google")}
            />
            <SocialButton
              provider="facebook"
              label="Facebook"
              disabled={socialLoading}
              onClick={() => handleSignIn("facebook")}
            />
          </div>

          <OrDivider />

          {error && (
            <div ref={errorRef}>
              <Alert variant="error" className="mb-4">
                {error}
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField<SignUpFormData>
                name="firstName"
                label="Prénom"
                placeholder="Jean"
                register={register}
                errors={errors}
                icon={<User className="h-4 w-4" />}
              />
              <FormField<SignUpFormData>
                name="lastName"
                label="Nom"
                placeholder="Tremblay"
                register={register}
                errors={errors}
                icon={<User className="h-4 w-4" />}
              />
            </div>

            <FormField<SignUpFormData>
              name="email"
              label="Adresse email"
              type="email"
              placeholder="jean.tremblay@eglise.ca"
              register={register}
              errors={errors}
              icon={<Mail className="h-4 w-4" />}
            />

            <FormField<SignUpFormData>
              name="address"
              label="Adresse (optionnel)"
              placeholder="123 Rue de l'Église, Montréal H3A 1B2"
              register={register}
              errors={errors}
              icon={<MapPin className="h-4 w-4" />}
            />

            <FormField<SignUpFormData>
              name="phoneNumber"
              label="Téléphone (optionnel)"
              type="tel"
              placeholder="+15141234567"
              register={register}
              errors={errors}
              icon={<Phone className="h-4 w-4" />}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Spinner size="sm" className="text-white" />}
              Créer mon compte
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-sm text-slate-500">
          Vous avez déjà un compte ?{" "}
          <Link href="/connexion" className="text-indigo-600 font-medium hover:text-indigo-700">
            Connexion
          </Link>
        </div>
      </div>
    </AuthSplitLayout>
  );
}
