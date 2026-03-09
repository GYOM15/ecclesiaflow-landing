import { cn } from "@/lib/utils";

interface CrossMotifProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export function CrossMotif({
  className,
  size = 24,
  color = "#94A3B8",
  opacity = 0.15,
}: CrossMotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("", className)}
      aria-hidden="true"
      style={{ opacity }}
    >
      <path
        d="M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7v7a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-7H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h7V3z"
        fill={color}
      />
    </svg>
  );
}

export function CrossPatternBg({ className }: { className?: string }) {
  const positions = [
    { x: "5%", y: "10%", size: 16, rotation: 15 },
    { x: "15%", y: "70%", size: 20, rotation: -10 },
    { x: "30%", y: "30%", size: 12, rotation: 45 },
    { x: "50%", y: "80%", size: 18, rotation: 20 },
    { x: "65%", y: "15%", size: 14, rotation: -30 },
    { x: "75%", y: "55%", size: 22, rotation: 0 },
    { x: "85%", y: "85%", size: 16, rotation: 35 },
    { x: "92%", y: "25%", size: 12, rotation: -15 },
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: pos.x,
            top: pos.y,
            transform: `rotate(${pos.rotation}deg)`,
          }}
        >
          <CrossMotif size={pos.size} opacity={0.06 + (i % 3) * 0.02} />
        </div>
      ))}
    </div>
  );
}
