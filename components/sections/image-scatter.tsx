"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { Camera, Users, Heart, Music, BookOpen } from "lucide-react";

const scatterItems = [
  { label: "Ensemble", icon: Users, bg: "bg-slate-100", width: "w-[48%]", height: "aspect-[4/3]", rotate: "rotate-2", z: "z-10", pos: "top-0 left-[2%]" },
  { label: "Louange", icon: Music, bg: "bg-slate-200", width: "w-[30%]", height: "aspect-square", rotate: "-rotate-3", z: "z-20", pos: "top-[3%] right-[4%]" },
  { label: "Communion", icon: Heart, bg: "bg-slate-100", width: "w-[32%]", height: "aspect-[3/4]", rotate: "rotate-1", z: "z-20", pos: "top-[50%] left-[6%]" },
  { label: "Étude", icon: BookOpen, bg: "bg-slate-200", width: "w-[28%]", height: "aspect-square", rotate: "-rotate-1", z: "z-30", pos: "top-[36%] right-[10%]" },
  { label: "Moments", icon: Camera, bg: "bg-slate-100", width: "w-[26%]", height: "aspect-[4/3]", rotate: "rotate-3", z: "z-40", pos: "bottom-[2%] right-[28%]" },
];

export function ImageScatter() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto" style={{ minHeight: "520px" }}>
            {scatterItems.map((item) => (
              <div
                key={item.label}
                className={`absolute ${item.pos} ${item.width} ${item.z} group`}
              >
                <div
                  className={`${item.bg} ${item.height} ${item.rotate} rounded-xl shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.12)] hover:rotate-0 cursor-default`}
                >
                  <item.icon className="h-8 w-8 text-slate-400 group-hover:text-slate-600 transition-colors duration-300 mb-2" />
                  <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Spacer to ensure parent has minimum height */}
            <div className="h-[520px] lg:h-[570px]" aria-hidden="true" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
