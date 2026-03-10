import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "default" | "indigo" | "amber" | "success" | "outline";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "indigo",
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <Badge variant={badgeVariant} dot className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
