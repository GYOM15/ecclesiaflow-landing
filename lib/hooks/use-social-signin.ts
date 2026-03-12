"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

type IdpHint = "google" | "facebook";

interface UseSocialSignInReturn {
  loading: boolean;
  error: string | null;
  handleSignIn: (idpHint?: IdpHint) => void;
  clearError: () => void;
}

/**
 * Hook centralisé pour le sign-in social (Google, Facebook).
 *
 * Pas de health check pré-vol — pattern industrie :
 * on tente l'opération et on gère les erreurs quand elles surviennent.
 *
 * - signIn() génère l'URL d'autorisation et redirige vers Keycloak
 * - Si Keycloak est DOWN, le navigateur affiche une erreur réseau
 * - Si les backends (Members/Auth) sont DOWN, l'erreur est gérée
 *   sur /callback grâce au timeout de 10s dans apiRequest()
 */
export function useSocialSignIn(): UseSocialSignInReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = useCallback((idpHint?: IdpHint) => {
    setLoading(true);
    setError(null);

    try {
      const authOptions = idpHint ? { kc_idp_hint: idpHint } : {};
      signIn("keycloak", { callbackUrl: "/callback" }, authOptions);
    } catch {
      setError("Un problème est survenu. Veuillez réessayer plus tard.");
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, handleSignIn, clearError };
}
