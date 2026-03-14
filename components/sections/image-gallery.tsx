"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { Camera, Users, Heart, Music, BookOpen, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface GalleryImage {
  label: string;
  icon: LucideIcon;
  bg: string;
}

const homeImages: GalleryImage[] = [
  { label: "Culte dominical", icon: Heart, bg: "bg-slate-100" },
  { label: "Louange", icon: Music, bg: "bg-slate-200" },
  { label: "Communauté", icon: Users, bg: "bg-slate-100" },
  { label: "Étude biblique", icon: BookOpen, bg: "bg-slate-150" },
  { label: "Jeunesse", icon: Sparkles, bg: "bg-slate-200" },
  { label: "Baptême", icon: Heart, bg: "bg-slate-100" },
];

const aboutImages: GalleryImage[] = [
  { label: "Notre équipe", icon: Users, bg: "bg-slate-100" },
  { label: "Nos bureaux", icon: Camera, bg: "bg-slate-200" },
  { label: "Hackathon 2025", icon: Sparkles, bg: "bg-slate-100" },
  { label: "Conférence", icon: BookOpen, bg: "bg-slate-200" },
  { label: "Team building", icon: Heart, bg: "bg-slate-100" },
  { label: "Workshop", icon: Music, bg: "bg-slate-200" },
];

interface ImageGalleryProps {
  variant?: "home" | "about";
}

export function ImageGallery({ variant = "home" }: ImageGalleryProps) {
  const images = variant === "about" ? aboutImages : homeImages;
  const [mainIndex, setMainIndex] = useState(0);

  const handleSwap = (index: number) => {
    if (index === mainIndex) return;
    setMainIndex(index);
  };

  const secondaryImages = images.filter((_, i) => i !== mainIndex);
  const mainImage = images[mainIndex];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={variant === "about" ? "Notre univers" : "En images"}
          title={
            variant === "about"
              ? "Les visages et moments qui nous définissent"
              : "La vie de communauté en action"
          }
          subtitle={
            variant === "about"
              ? "Découvrez l'équipe et les moments clés qui façonnent EcclesiaFlow."
              : "Des moments authentiques de foi, de partage et de service."
          }
        />

        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-4 lg:gap-5">
              {/* Main image — large */}
              <div className="lg:col-span-3">
                <div
                  className={`${mainImage.bg} rounded-xl aspect-[4/3] flex flex-col items-center justify-center transition-all duration-500 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]`}
                >
                  <mainImage.icon className="h-12 w-12 text-slate-400 mb-3" />
                  <span className="text-sm font-medium text-slate-500">
                    {mainImage.label}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Cliquez une vignette pour la voir ici
                  </span>
                </div>
              </div>

              {/* Secondary images — 5+ stacked in grid */}
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                {secondaryImages.map((img, i) => {
                  const originalIndex = images.indexOf(img);
                  return (
                    <button
                      key={`${img.label}-${i}`}
                      onClick={() => handleSwap(originalIndex)}
                      className={`group ${img.bg} rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_-6px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2`}
                    >
                      <img.icon className="h-6 w-6 text-slate-400 group-hover:text-slate-600 transition-colors duration-300 mb-1.5" />
                      <span className="text-[10px] font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                        {img.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
