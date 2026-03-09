import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "glass" | "outline" | "gold-border" | "feature";

interface CardProps {
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  thumbnail?: React.ReactNode;
  accentColor?: "indigo" | "emerald" | "amber" | "violet" | "rose" | "teal";
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white border border-slate-200/60",
  elevated: "bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.04)]",
  glass: "bg-white/80 backdrop-blur-sm border border-slate-200/40",
  outline: "border border-slate-200 bg-transparent",
  "gold-border": "bg-white border-2 border-amber-400/60 shadow-[0_4px_24px_-4px_rgba(245,158,11,0.15)]",
  feature: "bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/60",
};

const accentTopBar: Record<string, string> = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
  rose: "bg-rose-500",
  teal: "bg-teal-500",
};

export function Card({
  variant = "default",
  hover = true,
  className,
  children,
  thumbnail,
  accentColor,
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300 overflow-hidden",
        variantStyles[variant],
        hover && "hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.04)] hover:-translate-y-0.5",
        className
      )}
    >
      {accentColor && (
        <div className={cn("absolute top-0 left-0 right-0 h-[3px]", accentTopBar[accentColor])} aria-hidden="true" />
      )}
      {thumbnail && (
        <div className="absolute top-4 right-4" aria-hidden="true">
          {thumbnail}
        </div>
      )}
      {children}
    </div>
  );
}
