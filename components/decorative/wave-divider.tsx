import { cn } from "@/lib/utils";

type WaveVariant = "wave" | "curve" | "slant";

interface WaveDividerProps {
  variant?: WaveVariant;
  fillColor?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({
  variant = "wave",
  fillColor = "#F8FAFC",
  flip = false,
  className,
}: WaveDividerProps) {
  const paths: Record<WaveVariant, string> = {
    wave: "M0,64 C320,120 640,0 960,64 C1280,128 1600,0 1920,64 L1920,160 L0,160 Z",
    curve: "M0,128 Q960,0 1920,128 L1920,160 L0,160 Z",
    slant: "M0,0 L1920,120 L1920,160 L0,160 Z",
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-none",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1920 160"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20 lg:h-28"
        fill={fillColor}
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
