"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { TESTIMONIALS } from "@/lib/constants";

const avatarStyles = [
  { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600" },
  { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600" },
  { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600" },
  { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600" },
  { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-slate-50 overflow-hidden">
      {/* Section-level decorative voiles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute -top-10 -right-20 w-[50%] h-[70%] opacity-[0.45]" viewBox="0 0 400 300" fill="none" preserveAspectRatio="none">
          <path d="M400,0 C300,50 350,150 250,200 C200,230 100,250 0,300 L400,300 Z" fill="#EEF2FF" />
        </svg>
        <svg className="absolute -bottom-10 -left-20 w-[45%] h-[60%] opacity-30" viewBox="0 0 400 300" fill="none" preserveAspectRatio="none">
          <path d="M0,300 C100,250 80,150 180,100 C230,70 350,50 400,0 L0,0 Z" fill="#F0FDFA" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Témoignages"
          badgeVariant="amber"
          title="Ce que disent les pasteurs et responsables"
          subtitle="Des centaines de leaders d'église utilisent EcclesiaFlow au quotidien. Voici ce qu'ils en pensent."
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left column */}
            <div className="space-y-6 lg:space-y-8">
              {TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                  <TestimonialCard testimonial={testimonial} index={index} />
                </ScrollReveal>
              ))}
            </div>

            {/* Right column — offset */}
            <div className="space-y-6 lg:space-y-8 md:mt-12 lg:mt-16">
              {TESTIMONIALS.slice(2, 4).map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={(index + 2) * 0.1}>
                  <TestimonialCard testimonial={testimonial} index={index + 2} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: { quote: string; name: string; role: string; church: string };
  index: number;
}) {
  const style = avatarStyles[index % avatarStyles.length];

  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.12)] hover:-translate-y-0.5">
      {/* Card-level voile decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute -top-4 -right-8 w-[60%] h-[70%] opacity-[0.4]" viewBox="0 0 200 150" fill="none" preserveAspectRatio="none">
          <path d="M200,0 C150,25 170,75 120,100 C90,115 40,130 0,150 L200,150 Z" fill="#EEF2FF" />
        </svg>
        <svg className="absolute -bottom-4 -left-8 w-[50%] h-[55%] opacity-[0.3]" viewBox="0 0 200 150" fill="none" preserveAspectRatio="none">
          <path d="M0,150 C50,125 40,75 90,50 C120,35 170,20 200,0 L0,0 Z" fill="#F0FDFA" />
        </svg>
      </div>

      <div className="relative p-5 lg:p-6">
        {/* Large decorative guillemet */}
        <svg className="w-10 h-10 text-indigo-200 mb-3" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
          <path d="M10.3 26.7c-1.7-1.2-3-2.8-3.8-4.7C5.6 19.8 5.3 17.4 5.5 15c.3-3.3 1.5-6.3 3.5-8.8l2.4 1.6C9.8 10 9 12.6 8.8 15.4c-.1 1.4 0 2.7.5 3.8.6-.3 1.2-.4 1.9-.4 2.8 0 5 2.2 5 5s-2.2 5-5 5c-.4 0-.7 0-1-.1zm16 0c-1.7-1.2-3-2.8-3.8-4.7-1-2.2-1.3-4.6-1-7 .3-3.3 1.5-6.3 3.5-8.8l2.4 1.6c-1.6 2.2-2.4 4.8-2.6 7.6-.1 1.4 0 2.7.5 3.8.6-.3 1.2-.4 1.9-.4 2.8 0 5 2.2 5 5s-2.2 5-5 5c-.4 0-.7 0-1-.1z" />
        </svg>

        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 ${style.bg} ${style.border} ${style.text} text-sm font-semibold shrink-0`}>
            {getInitials(testimonial.name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
            <p className="text-xs text-slate-400">{testimonial.role} · {testimonial.church}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
