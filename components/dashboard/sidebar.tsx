"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  CreditCard,
  UserCog,
  Mail,
  Shield,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mon profil", href: "/dashboard/profil", icon: UserCog },
  { label: "Modifier mon email", href: "/dashboard/email", icon: Mail },
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
  const pathname = usePathname();

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
            onClick={async () => {
              await signOut({ redirect: false });
              window.location.href = "/api/auth/federated-signout";
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
