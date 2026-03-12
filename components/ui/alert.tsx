"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useState, type ReactNode } from "react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant: AlertVariant;
  children: ReactNode;
  dismissible?: boolean;
  className?: string;
  onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, { container: string; icon: ReactNode }> = {
  success: {
    container: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  },
  error: {
    container: "bg-rose-50 border-rose-200 text-rose-800",
    icon: <AlertCircle className="h-4 w-4 text-rose-500" />,
  },
  warning: {
    container: "bg-amber-50 border-amber-200 text-amber-800",
    icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  },
  info: {
    container: "bg-blue-50 border-blue-200 text-blue-800",
    icon: <Info className="h-4 w-4 text-blue-500" />,
  },
};

export function Alert({ variant, children, dismissible = false, className, onDismiss }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const styles = variantStyles[variant];

  function handleDismiss() {
    setDismissed(true);
    onDismiss?.();
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-sm",
        styles.container,
        className
      )}
      role="alert"
    >
      <span className="shrink-0 mt-0.5">{styles.icon}</span>
      <div className="flex-1">{children}</div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
