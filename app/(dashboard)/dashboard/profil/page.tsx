"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, MapPin, Phone, Save, Loader2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { FormField } from "@/components/ui/form-field";
import { Spinner } from "@/components/ui/spinner";
import { profileSchema, type ProfileFormData } from "@/lib/validation/schemas";
import {
  getMyProfile,
  updateMyProfile,
  type SignUpResponse,
} from "@/lib/api/members";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<SignUpResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!session?.accessToken) return;
    getMyProfile(session.accessToken).then((result) => {
      if (result.ok) {
        setProfile(result.data);
        reset({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          address: result.data.address || "",
          phoneNumber: result.data.phoneNumber || "",
        });
      }
      setLoading(false);
    });
  }, [session, reset]);

  async function onSubmit(data: ProfileFormData) {
    if (!session?.accessToken) return;
    setError(null);
    setSuccess(null);

    const result = await updateMyProfile(session.accessToken, {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      address: data.address.trim(),
      phoneNumber: data.phoneNumber?.trim() || undefined,
    });

    if (result.ok) {
      setSuccess("Profil mis à jour avec succès.");
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              phoneNumber: data.phoneNumber || undefined,
            }
          : prev
      );
      reset(data);
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
        <h1 className="text-2xl font-semibold text-slate-900">Mon profil</h1>
        <p className="text-sm text-slate-500 mt-1">
          Modifiez vos informations personnelles.
        </p>
      </div>

      {/* Email (read-only) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Adresse email
        </label>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-500">
          {profile?.email}
        </div>
        <p className="text-xs text-slate-400 mt-1.5">
          Pour modifier votre email, rendez-vous dans la section{" "}
          <a href="/dashboard/compte" className="text-indigo-600 hover:text-indigo-700">
            Mon compte
          </a>
          .
        </p>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField<ProfileFormData>
              name="firstName"
              label="Prénom"
              placeholder="Jean"
              register={register}
              errors={errors}
              icon={<User className="h-4 w-4" />}
            />
            <FormField<ProfileFormData>
              name="lastName"
              label="Nom"
              placeholder="Tremblay"
              register={register}
              errors={errors}
              icon={<User className="h-4 w-4" />}
            />
          </div>

          <FormField<ProfileFormData>
            name="address"
            label="Adresse"
            placeholder="123 Rue de l'Église, Montréal H3A 1B2"
            register={register}
            errors={errors}
            icon={<MapPin className="h-4 w-4" />}
          />

          <FormField<ProfileFormData>
            name="phoneNumber"
            label="Téléphone (optionnel)"
            type="tel"
            placeholder="+15141234567"
            register={register}
            errors={errors}
            icon={<Phone className="h-4 w-4" />}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Enregistrer
        </button>
      </form>
    </div>
  );
}
