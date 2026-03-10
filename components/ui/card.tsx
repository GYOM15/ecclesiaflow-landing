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
  feature: "bg-white border border-slate-200/50",
};

export function Card({
  variant = "default",
  hover = true,
  className,
  children,
  thumbnail,
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300 overflow-hidden",
        variantStyles[variant],
        hover && "hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] hover:border-slate-300/60 hover:-translate-y-0.5",
        className
      )}
    >
      {thumbnail && (
        <div className="absolute top-4 right-4" aria-hidden="true">
          {thumbnail}
        </div>
      )}
      {children}
    </div>
  );
}
