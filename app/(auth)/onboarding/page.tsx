"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import {
  socialOnboardingSchema,
  type SocialOnboardingFormData,
} from "@/lib/validation/schemas";
import { socialOnboarding } from "@/lib/api/members";

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SocialOnboardingFormData>({
    resolver: zodResolver(socialOnboardingSchema),
    defaultValues: {
      firstName: session?.user?.name?.split(" ")[0] || "",
      lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
      email: session?.user?.email || "",
    },
  });

  async function onSubmit(data: SocialOnboardingFormData) {
    if (!session?.accessToken) return;
    setError(null);

    const result = await socialOnboarding(session.accessToken, {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email,
      address: data.address?.trim() || undefined,
      phoneNumber: data.phoneNumber?.trim() || undefined,
    });

    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error.message || "Une erreur est survenue");
    }
  }

  return (
    <AuthCard
      title="Complétez votre profil"
      subtitle="Quelques informations supplémentaires pour finaliser votre inscription."
      disableHomeLink
    >
      {error && (
        <Alert variant="error" dismissible className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField<SocialOnboardingFormData>
            name="firstName"
            label="Prénom"
            register={register}
            errors={errors}
          />
          <FormField<SocialOnboardingFormData>
            name="lastName"
            label="Nom"
            register={register}
            errors={errors}
          />
        </div>

        <Input
          label="Adresse email"
          value={session?.user?.email || ""}
          readOnly
          helperText="Vérifié par votre compte social"
        />
        <input type="hidden" {...register("email")} />

        <FormField<SocialOnboardingFormData>
          name="address"
          label="Adresse (optionnel)"
          placeholder="123 Rue de l'Église, Montréal H3A 1B2"
          register={register}
          errors={errors}
          icon={<MapPin className="h-4 w-4" />}
        />

        <FormField<SocialOnboardingFormData>
          name="phoneNumber"
          label="Téléphone (optionnel)"
          type="tel"
          placeholder="+1 514 123 4567"
          register={register}
          errors={errors}
          icon={<Phone className="h-4 w-4" />}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Spinner size="sm" className="text-white" />}
          Terminer l&apos;inscription
        </button>
      </form>
    </AuthCard>
  );
}
