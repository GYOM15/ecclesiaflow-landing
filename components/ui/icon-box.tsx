import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type IconBoxVariant = "indigo" | "amber" | "slate" | "emerald";

interface IconBoxProps {
  icon: LucideIcon;
  variant?: IconBoxVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles: Record<IconBoxVariant, string> = {
  indigo: "bg-indigo-50 text-indigo-500",
  amber: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-500",
  emerald: "bg-emerald-50 text-emerald-500",
};

const sizeStyles = {
  sm: "p-2 rounded-lg",
  md: "p-3 rounded-xl",
  lg: "p-4 rounded-2xl",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function IconBox({
  icon: Icon,
  variant = "indigo",
  size = "md",
  className,
}: IconBoxProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
    </div>
  );
}
