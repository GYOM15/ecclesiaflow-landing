"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordRequirementsProps {
  password: string;
}

const requirements = [
  { label: "Au moins 8 caractères", test: (p: string) => p.length >= 8 },
  { label: "Une lettre minuscule", test: (p: string) => /[a-z]/.test(p) },
  { label: "Une lettre majuscule", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Un chiffre", test: (p: string) => /\d/.test(p) },
  { label: "Un caractère spécial (@$!%*?&)", test: (p: string) => /[@$!%*?&]/.test(p) },
];

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
      <p className="text-xs font-medium text-slate-600">
        Votre mot de passe doit contenir :
      </p>
      <ul className="space-y-1.5">
        {requirements.map((req) => {
          const met = password.length > 0 && req.test(password);
          return (
            <li
              key={req.label}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors",
                met ? "text-emerald-600" : "text-slate-400"
              )}
            >
              {met ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
              {req.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
