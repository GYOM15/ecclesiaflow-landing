"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { Spinner } from "@/components/ui/spinner";
import { Alert } from "@/components/ui/alert";
import { getMyProfile, socialOnboarding } from "@/lib/api/members";

export default function CallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const checkProfile = useCallback(async (accessToken: string) => {
    setError(null);
    try {
      const result = await getMyProfile(accessToken);
      if (result.ok) {
        router.push("/dashboard");
        return;
      }

      if (result.error.status === 404) {
        // Auto-provision: create member from JWT claims
        const firstName = session?.user?.name?.split(" ")[0] || "";
        const lastName = session?.user?.name?.split(" ").slice(1).join(" ") || "";
        const email = session?.user?.email || "";

        if (!firstName || !lastName || !email) {
          router.push("/onboarding");
          return;
        }

        const provision = await socialOnboarding(accessToken, {
          firstName,
          lastName,
          email,
        });

        if (provision.ok) {
          router.push("/dashboard");
        } else {
          // Fallback to manual onboarding form
          router.push("/onboarding");
        }
        return;
      }

      setError("Un problème est survenu. Veuillez réessayer plus tard.");
    } catch {
      setError("Un problème est survenu. Veuillez réessayer plus tard.");
    }
  }, [router, session]);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/connexion");
      return;
    }
    // Wait until session is fully populated (user profile + tokens)
    if (session?.accessToken && session?.user?.email) {
      checkProfile(session.accessToken);
    }
  }, [session, status, router, checkProfile]);

  return (
    <AuthCard title="Connexion" subtitle={error ? "Un problème est survenu" : "Traitement en cours..."}>
      <div className="flex flex-col items-center gap-4 py-4">
        {error ? (
          <Alert variant="error">{error}</Alert>
        ) : (
          <>
            <Spinner size="lg" />
            <p className="text-sm text-slate-500">Connexion en cours...</p>
          </>
        )}

        {error && (
          <div className="flex gap-3 w-full">
            <button
              onClick={() => {
                if (session?.accessToken) {
                  checkProfile(session.accessToken);
                }
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Réessayer
            </button>
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Link>
          </div>
        )}
      </div>
    </AuthCard>
  );
}
