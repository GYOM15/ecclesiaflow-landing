"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !session?.error;
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-50 border-b border-slate-200"
        style={{ background: "linear-gradient(to right, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.1) 100%)" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                  <rect width="32" height="32" rx="8" fill="#6366F1" />
                  <path
                    d="M13 3h6v6h7v6h-7v14h-6V15H6V9h7V3z"
                    fill="white"
                    opacity="0.95"
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-slate-900">Ecclesia</span>
                <span className="text-indigo-500">Flow</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200",
                    pathname === link.href
                      ? "text-slate-900 bg-slate-100"
                      : "text-slate-900 hover:text-indigo-600 hover:bg-slate-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="primary" size="sm">
                    <LayoutDashboard className="h-4 w-4" />
                    Mon espace
                  </Button>
                </Link>
              ) : (
                <Link href="/connexion">
                  <Button variant="primary" size="sm">
                    Connexion
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg lg:hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === link.href
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-2 border-t border-slate-100 mt-4">
                  {isAuthenticated ? (
                    <Link href="/dashboard" className="block">
                      <Button variant="primary" size="lg" className="w-full">
                        <LayoutDashboard className="h-4 w-4" />
                        Mon espace
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/connexion" className="block">
                      <Button variant="primary" size="lg" className="w-full">
                        Connexion
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
