"use client";

import Link from "next/link";
import { Lock, Shield, Clock } from "lucide-react";
import { VoilesAngulaires } from "@/components/auth/voiles-angulaires";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  disableHomeLink?: boolean;
}

const trustIndicators = [
  { icon: Lock, label: "Chiffrement 256-bit" },
  { icon: Shield, label: "Confidentialité" },
  { icon: Clock, label: "Toujours disponible" },
];

export function AuthSplitLayout({ children, disableHomeLink }: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding + VoilesAngulaires (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <VoilesAngulaires />

        <div className="relative z-10 flex flex-col justify-center items-center p-12 w-full">
          {/* Logo */}
          {disableHomeLink ? (
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
                <rect width="24" height="24" rx="6" fill="white" />
                <path
                  d="M10 2h4v5h5v4h-5v11h-4V11H5V7h5V2z"
                  fill="#6366F1"
                  opacity="0.9"
                />
              </svg>
              <span className="text-2xl font-bold text-white drop-shadow-sm">
                EcclesiaFlow
              </span>
            </div>
          ) : (
            <Link href="/" className="flex items-center gap-3 mb-6 hover:opacity-90 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
                <rect width="24" height="24" rx="6" fill="white" />
                <path
                  d="M10 2h4v5h5v4h-5v11h-4V11H5V7h5V2z"
                  fill="#6366F1"
                  opacity="0.9"
                />
              </svg>
              <span className="text-2xl font-bold text-white drop-shadow-sm">
                EcclesiaFlow
              </span>
            </Link>
          )}

          {/* Tagline */}
          <p className="text-slate-300 text-sm mb-10 text-center">
            La technologie au service des églises
          </p>

          {/* Trust indicators */}
          <div className="flex flex-col gap-4">
            {trustIndicators.map((indicator) => (
              <div key={indicator.label} className="flex items-center gap-3">
                <indicator.icon className="h-4 w-4 text-teal-300" />
                <span className="text-sm text-slate-200">{indicator.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
