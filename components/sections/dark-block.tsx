"use client";

import { type ReactNode } from "react";
import WaveRibbon from "@/components/animation/wave-ribbon";

interface DarkBlockProps {
  children: ReactNode;
}

export default function DarkBlock({ children }: DarkBlockProps) {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      <WaveRibbon />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
