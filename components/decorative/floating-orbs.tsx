import { cn } from "@/lib/utils";

interface FloatingOrbsProps {
  variant?: "indigo" | "amber" | "mixed";
  className?: string;
}

export function FloatingOrbs({
  variant = "mixed",
  className,
}: FloatingOrbsProps) {
  const orbs =
    variant === "indigo"
      ? [
          { color: "bg-indigo-200/30", size: "w-72 h-72", pos: "top-0 -right-20" },
          { color: "bg-indigo-100/40", size: "w-96 h-96", pos: "-top-20 -left-32" },
          { color: "bg-indigo-200/20", size: "w-64 h-64", pos: "bottom-20 right-10" },
        ]
      : variant === "amber"
        ? [
            { color: "bg-amber-200/20", size: "w-72 h-72", pos: "top-10 -right-16" },
            { color: "bg-amber-100/30", size: "w-80 h-80", pos: "-top-10 -left-20" },
          ]
        : [
            { color: "bg-indigo-200/20", size: "w-80 h-80", pos: "-top-20 -right-20" },
            { color: "bg-amber-200/15", size: "w-72 h-72", pos: "top-40 -left-24" },
            { color: "bg-indigo-100/25", size: "w-64 h-64", pos: "bottom-10 right-20" },
          ];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full blur-3xl animate-float-slow",
            orb.color,
            orb.size,
            orb.pos
          )}
          style={{ animationDelay: `${i * 2}s` }}
        />
      ))}
    </div>
  );
}
