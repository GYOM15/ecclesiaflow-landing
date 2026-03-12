"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { deleteMyAccount } from "@/lib/api/members";

export default function AccountPage() {
  const { data: session } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!session?.accessToken || confirmText !== "SUPPRIMER") return;
    setError(null);
    setDeleting(true);

    const result = await deleteMyAccount(session.accessToken);

    if (result.ok) {
      await signOut({ redirect: false });
      window.location.href = "/";
    } else {
      setError(result.error.message || "Une erreur est survenue.");
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Mon compte</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gestion de votre compte EcclesiaFlow.
        </p>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border-2 border-red-200 bg-red-50/50">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-red-900">
                Zone dangereuse
              </h2>
              <p className="text-sm text-red-700 mt-1">
                La suppression de votre compte est irréversible. Toutes vos
                données seront définitivement supprimées.
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="error" className="mt-4">
              {error}
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
                Tapez <span className="font-mono bg-red-100 px-1.5 py-0.5 rounded">SUPPRIMER</span> pour confirmer :
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
