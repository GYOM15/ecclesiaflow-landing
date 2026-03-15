"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { FormField } from "@/components/ui/form-field";
import { Spinner } from "@/components/ui/spinner";
import { passwordSchema, type PasswordFormData } from "@/lib/validation/schemas";
import { addLocalCredentials } from "@/lib/api/auth";
import { useMember } from "@/contexts/member-context";

export default function CredentialsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { updateMember } = useMember();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  async function onSubmit(data: PasswordFormData) {
    if (!session?.accessToken) return;
    setError(null);
    setSuccess(null);

    const result = await addLocalCredentials(session.accessToken, data.password);

    if (result.ok) {
      updateMember({ hasLocalCredentials: true });
      setSuccess("Mot de passe ajouté avec succès. Redirection...");
      setTimeout(() => router.push("/dashboard/compte"), 2000);
    } else {
      setError(result.error.message || "Une erreur est survenue.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Ajouter un mot de passe
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ajoutez un mot de passe local à votre compte pour pouvoir modifier
          votre adresse email.
        </p>
      </div>

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

          <div className="relative">
            <FormField<PasswordFormData>
              name="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              register={register}
              errors={errors}
              icon={<Lock className="h-4 w-4" />}
              helperText="8 caractères min., 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="relative">
            <FormField<PasswordFormData>
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              register={register}
              errors={errors}
              icon={<Lock className="h-4 w-4" />}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Spinner size="sm" className="text-white" />}
            Ajouter le mot de passe
          </button>
        </div>
      </form>
    </div>
  );
}
