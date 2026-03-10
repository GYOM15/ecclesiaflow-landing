"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Avatar } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { TESTIMONIALS } from "@/lib/constants";

const avatarBgs = [
  "bg-indigo-100",
  "bg-emerald-100",
  "bg-amber-100",
  "bg-violet-100",
];

const wavePaths = [
  "M40,0 C20,30 30,70 10,100 L100,100 L100,0 Z",
  "M30,0 C45,25 15,75 35,100 L100,100 L100,0 Z",
  "M35,0 C15,35 40,65 20,100 L100,100 L100,0 Z",
  "M25,0 C40,20 10,80 30,100 L100,100 L100,0 Z",
];

const rotations = ["rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Témoignages"
          badgeVariant="amber"
          title="Ce que disent les pasteurs et responsables"
          subtitle="Des centaines de leaders d'église utilisent EcclesiaFlow au quotidien. Voici ce qu'ils en pensent."
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-8">
            {/* Left column */}
            <div className="space-y-6 lg:space-y-8">
              {TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                  <div className="group relative flex items-stretch rounded-lg bg-white overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 h-full shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-200">
                    {/* Text side */}
                    <div className="flex-1 p-3 lg:p-4 flex flex-col justify-between relative z-10">
                      <div>
                        <Quote className="h-4 w-4 text-slate-200 mb-1.5" />
                        <div className="flex gap-0.5 mb-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5 pt-2 mt-2 border-t border-slate-100">
                        <div className="lg:hidden">
                          <Avatar name={testimonial.name} size="sm" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{testimonial.name}</p>
                          <p className="text-[10px] text-slate-400">{testimonial.role} · {testimonial.church}</p>
                        </div>
                      </div>
                    </div>

                    {/* Illustration side — neutral background + colored avatar card */}
                    <div className="relative w-[30%] min-w-[110px] shrink-0 overflow-hidden hidden lg:block">
                      {/* Wave SVG separator */}
                      <svg
                        className="absolute left-0 top-0 h-full w-10 z-10"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        fill="white"
                      >
                        <path d={wavePaths[index]} />
                      </svg>
                      {/* Neutral background */}
                      <div className="absolute inset-0 bg-slate-100" />
                      {/* Decorative circles */}
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30" />
                      <div className="absolute bottom-3 left-6 w-4 h-4 rounded-full bg-white/20" />
                      {/* Floating avatar card with color */}
                      <div className="relative z-20 flex items-center justify-center h-full p-3 pl-6">
                        <div className={`${avatarBgs[index]} rounded-lg shadow-md p-2 ${rotations[index]} transition-transform duration-300 group-hover:rotate-0`}>
                          <Avatar name={testimonial.name} size="md" />
                          <p className="text-[8px] font-medium text-slate-700 text-center mt-1">{testimonial.name.split(" ")[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right column — offset */}
            <div className="space-y-6 lg:space-y-8 md:mt-12 lg:mt-16">
              {TESTIMONIALS.slice(2, 4).map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={(index + 2) * 0.1}>
                  <div className="group relative flex items-stretch rounded-lg bg-white overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 h-full shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-200">
                    {/* Text side */}
                    <div className="flex-1 p-3 lg:p-4 flex flex-col justify-between relative z-10">
                      <div>
                        <Quote className="h-4 w-4 text-slate-200 mb-1.5" />
                        <div className="flex gap-0.5 mb-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5 pt-2 mt-2 border-t border-slate-100">
                        <div className="lg:hidden">
                          <Avatar name={testimonial.name} size="sm" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{testimonial.name}</p>
                          <p className="text-[10px] text-slate-400">{testimonial.role} · {testimonial.church}</p>
                        </div>
                      </div>
                    </div>

                    {/* Illustration side — neutral background + colored avatar card */}
                    <div className="relative w-[30%] min-w-[110px] shrink-0 overflow-hidden hidden lg:block">
                      <svg
                        className="absolute left-0 top-0 h-full w-10 z-10"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        fill="white"
                      >
                        <path d={wavePaths[index + 2]} />
                      </svg>
                      <div className="absolute inset-0 bg-slate-100" />
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/30" />
                      <div className="absolute bottom-2 left-5 w-3.5 h-3.5 rounded-full bg-white/20" />
                      <div className="relative z-20 flex items-center justify-center h-full p-3 pl-6">
                        <div className={`${avatarBgs[index + 2]} rounded-lg shadow-md p-2 ${rotations[index + 2]} transition-transform duration-300 group-hover:rotate-0`}>
                          <Avatar name={testimonial.name} size="md" />
                          <p className="text-[8px] font-medium text-slate-700 text-center mt-1">{testimonial.name.split(" ")[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
