"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getMyProfile, type SignUpResponse } from "@/lib/api/members";

interface MemberContextValue {
  /** The authenticated member profile — guaranteed non-null inside the provider */
  member: SignUpResponse;
  /** Re-fetch the member profile from the backend */
  refreshMember: () => Promise<void>;
  /** Optimistic local update (e.g. after profile edit) */
  updateMember: (patch: Partial<SignUpResponse>) => void;
}

const MemberContext = createContext<MemberContextValue | null>(null);

/**
 * Access the current member profile.
 * Must be used inside a MemberProvider (dashboard layout).
 * The member is guaranteed to be non-null — the provider
 * redirects to /callback if no member record exists (404).
 */
export function useMember(): MemberContextValue {
  const ctx = useContext(MemberContext);
  if (!ctx) {
    throw new Error("useMember must be used within MemberProvider");
  }
  return ctx;
}

type ProviderStatus = "loading" | "ready" | "redirecting";

export function MemberProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [member, setMember] = useState<SignUpResponse | null>(null);
  const [providerStatus, setProviderStatus] =
    useState<ProviderStatus>("loading");

  const fetchMember = useCallback(async () => {
    if (!session?.accessToken) return;

    const result = await getMyProfile(session.accessToken);

    if (result.ok) {
      setMember(result.data);
      setProviderStatus("ready");
    } else if (result.error.status === 404) {
      setProviderStatus("redirecting");
      router.replace("/callback");
    }
    // 401/403 are handled globally by the API client
  }, [session, router]);

  useEffect(() => {
    if (!session?.accessToken) return;
    if (session.error === "RefreshAccessTokenError") return;

    fetchMember();
  }, [session, fetchMember]);

  const refreshMember = useCallback(async () => {
    await fetchMember();
  }, [fetchMember]);

  const updateMember = useCallback((patch: Partial<SignUpResponse>) => {
    setMember((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  // Not ready — parent layout handles the spinner
  if (providerStatus !== "ready" || !member) {
    return null;
  }

  return (
    <MemberContext.Provider value={{ member, refreshMember, updateMember }}>
      {children}
    </MemberContext.Provider>
  );
}
