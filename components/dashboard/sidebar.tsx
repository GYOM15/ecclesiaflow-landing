"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  UserCog,
  Shield,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Dialog } from "@/components/ui/dialog";

const NAV_ITEMS = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mon profil", href: "/dashboard/profil", icon: UserCog },
  { label: "Mon compte", href: "/dashboard/compte", icon: Shield },
  { label: "Membres", href: "/dashboard/membres", icon: Users, soon: true },
  { label: "Événements", href: "/dashboard/evenements", icon: Calendar, soon: true },
  { label: "Communication", href: "/dashboard/communication", icon: MessageSquare, soon: true },
  { label: "Finances", href: "/dashboard/finances", icon: CreditCard, soon: true },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(true);
    const idToken = session?.idToken;

    // Store id_token in a short-lived cookie so federated-signout
    // can include it as id_token_hint for Keycloak silent logout
    if (idToken) {
      document.cookie = `ef_logout_hint=${encodeURIComponent(idToken)}; path=/; max-age=30; SameSite=Lax`;
    }

    // Redirect immediately to federated-signout which handles:
    // 1. Reading id_token from session/cookie
    // 2. Clearing all NextAuth cookies
    // 3. Redirecting to Keycloak logout endpoint
    // Note: Do NOT await signOut() before — it triggers SessionProvider
    // re-render which races with this redirect and causes auto-relogin.
    window.location.href = "/api/auth/federated-signout";
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200",
          "lg:translate-x-0 lg:z-30",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
              <rect width="32" height="32" rx="8" fill="#6366F1" />
              <path
                d="M14 8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6H8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6V8z"
                fill="white"
                opacity="0.95"
              />
            </svg>
            <span className="text-base font-semibold tracking-tight">
              <span className="text-slate-900">Ecclesia</span>
              <span className="text-indigo-500">Flow</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.soon ? "#" : item.href}
                onClick={(e) => {
                  if (item.soon) e.preventDefault();
                  else onClose();
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : item.soon
                      ? "text-slate-400 cursor-default"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-indigo-600" : "")} />
                {item.label}
                {item.soon && (
                  <span className="ml-auto text-[10px] font-medium bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">
                    Bientôt
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-100">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Logout confirmation popup */}
      <Dialog
        open={showLogoutConfirm}
        onClose={() => !loggingOut && setShowLogoutConfirm(false)}
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <LogOut className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Déconnexion
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Voulez-vous vraiment vous déconnecter ?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              disabled={loggingOut}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              Annuler
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingOut ? (
                <Spinner size="sm" className="text-white" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Se déconnecter
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
