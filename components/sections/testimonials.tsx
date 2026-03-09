"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Avatar } from "@/components/ui/avatar";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { TESTIMONIALS } from "@/lib/constants";

const cardAccents = [
  "border-t-indigo-500",
  "border-t-emerald-500",
  "border-t-amber-500",
  "border-t-violet-500",
  "border-t-rose-500",
  "border-t-teal-500",
];

const quoteColors = [
  "text-indigo-100",
  "text-emerald-100",
  "text-amber-100",
  "text-violet-100",
  "text-rose-100",
  "text-teal-100",
];

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

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <StaggerItem key={testimonial.name}>
              <div className={`relative rounded-2xl p-6 bg-gradient-to-b from-white to-slate-50/30 border border-slate-200/60 border-t-[3px] ${cardAccents[index]} h-full flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-0.5`}>
                {/* Quote icon */}
                <Quote className={`h-8 w-8 ${quoteColors[index]} mb-3`} />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <Avatar name={testimonial.name} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="text-[11px] text-indigo-500 font-medium">
                      {testimonial.church}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
