"use client";

import { type ReactNode } from "react";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
            <rect width="24" height="24" rx="6" fill="#6366F1" />
            <path
              d="M10 6a1 1 0 011-1h2a1 1 0 011 1v4h4a1 1 0 011 1v2a1 1 0 01-1 1h-4v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4H6a1 1 0 01-1-1v-2a1 1 0 011-1h4V6z"
              fill="white"
              opacity="0.9"
            />
          </svg>
          <span className="text-lg font-bold text-slate-900">EcclesiaFlow</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.08)] p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-1.5">{subtitle}</p>}
        </div>
        {children}
      </div>

      {footer && (
        <div className="text-center mt-6 text-sm text-slate-500">{footer}</div>
      )}
    </div>
  );
}
