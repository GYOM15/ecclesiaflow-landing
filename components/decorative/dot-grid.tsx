import { cn } from "@/lib/utils";

interface DotGridProps {
  className?: string;
}

export function DotGrid({ className }: DotGridProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
        opacity: 0.3,
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 70%)",
      }}
    />
  );
}
