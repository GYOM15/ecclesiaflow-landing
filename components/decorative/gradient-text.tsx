import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
}

export function GradientText({
  children,
  from = "#6366F1",
  to = "#F59E0B",
  className,
}: GradientTextProps) {
  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {children}
    </span>
  );
}
