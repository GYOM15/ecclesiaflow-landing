"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { FEATURES_OVERVIEW } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── 4 refined ghost UI illustrations matching reference style ─── */

function MembersIllustration() {
  return (
    <svg viewBox="0 0 480 260" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* Main list panel */}
      <rect x="16" y="8" width="240" height="244" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

      {/* Panel header */}
      <rect x="32" y="24" width="72" height="7" rx="3.5" fill="#CBD5E1" />
      <rect x="186" y="22" width="52" height="14" rx="7" fill="#EEF2FF" />
      <rect x="192" y="26" width="40" height="6" rx="3" fill="#C7D2FE" />

      {/* Row 1 — indigo silhouette */}
      <circle cx="48" cy="62" r="10" fill="#EEF2FF" />
      <circle cx="48" cy="58" r="4.5" fill="#6366F1" opacity="0.55" />
      <path d="M39 68 Q48 63 57 68" fill="#6366F1" opacity="0.35" />
      <rect x="68" y="56" width="110" height="6" rx="3" fill="#E2E8F0" />
      <rect x="68" y="68" width="70" height="4" rx="2" fill="#F1F5F9" />

      {/* Row 2 — teal silhouette */}
      <circle cx="48" cy="100" r="10" fill="#F0FDFA" />
      <circle cx="48" cy="96" r="4.5" fill="#14B8A6" opacity="0.55" />
      <path d="M39 106 Q48 101 57 106" fill="#14B8A6" opacity="0.35" />
      <rect x="68" y="94" width="130" height="6" rx="3" fill="#E2E8F0" />
      <rect x="68" y="106" width="85" height="4" rx="2" fill="#F1F5F9" />

      {/* Row 3 — indigo-400 silhouette */}
      <circle cx="48" cy="138" r="10" fill="#EEF2FF" />
      <circle cx="48" cy="134" r="4.5" fill="#818CF8" opacity="0.45" />
      <path d="M39 144 Q48 139 57 144" fill="#818CF8" opacity="0.3" />
      <rect x="68" y="132" width="95" height="6" rx="3" fill="#E2E8F0" />
      <rect x="68" y="144" width="60" height="4" rx="2" fill="#F1F5F9" />

      {/* Row 4 — amber silhouette */}
      <circle cx="48" cy="176" r="10" fill="#FFFBEB" />
      <circle cx="48" cy="172" r="4.5" fill="#D97706" opacity="0.45" />
      <path d="M39 182 Q48 177 57 182" fill="#D97706" opacity="0.3" />
      <rect x="68" y="170" width="100" height="6" rx="3" fill="#E2E8F0" />
      <rect x="68" y="182" width="65" height="4" rx="2" fill="#F1F5F9" />

      {/* Floating calendar card — rotated -3deg */}
      <g transform="rotate(-3, 370, 70)">
        <rect x="290" y="24" width="140" height="100" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="0.8" />
        <rect x="290" y="24" width="140" height="24" rx="10" fill="#EEF2FF" />
        <rect x="290" y="42" width="140" height="6" fill="#EEF2FF" />
        <rect x="310" y="31" width="60" height="7" rx="3.5" fill="#C7D2FE" />
        {/* Calendar dots — row 1 */}
        <circle cx="310" cy="62" r="2.5" fill="#E2E8F0" />
        <circle cx="325" cy="62" r="2.5" fill="#E2E8F0" />
        <circle cx="340" cy="62" r="2.5" fill="#6366F1" />
        <circle cx="355" cy="62" r="2.5" fill="#E2E8F0" />
        <circle cx="370" cy="62" r="2.5" fill="#E2E8F0" />
        <circle cx="385" cy="62" r="2.5" fill="#E2E8F0" />
        <circle cx="400" cy="62" r="2.5" fill="#E2E8F0" />
        {/* Row 2 */}
        <circle cx="310" cy="78" r="2.5" fill="#E2E8F0" />
        <circle cx="325" cy="78" r="2.5" fill="#E2E8F0" />
        <circle cx="340" cy="78" r="2.5" fill="#E2E8F0" />
        <circle cx="355" cy="78" r="2.5" fill="#2DD4BF" />
        <circle cx="370" cy="78" r="2.5" fill="#E2E8F0" />
        <circle cx="385" cy="78" r="2.5" fill="#E2E8F0" />
        <circle cx="400" cy="78" r="2.5" fill="#E2E8F0" />
        {/* Row 3 */}
        <circle cx="310" cy="94" r="2.5" fill="#E2E8F0" />
        <circle cx="325" cy="94" r="2.5" fill="#E2E8F0" />
        <circle cx="340" cy="94" r="2.5" fill="#E2E8F0" />
        <circle cx="355" cy="94" r="2.5" fill="#E2E8F0" />
        <circle cx="370" cy="94" r="2.5" fill="#6366F1" />
        <circle cx="385" cy="94" r="2.5" fill="#E2E8F0" />
        <circle cx="400" cy="94" r="2.5" fill="#E2E8F0" />
      </g>

      {/* Check circle — teal */}
      <circle cx="395" cy="195" r="22" fill="#F0FDF4" stroke="#A7F3D0" strokeWidth="0.8" />
      <path d="M385 195 L391 201 L406 187" fill="none" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Small stat badge */}
      <rect x="300" y="150" width="85" height="32" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="0.6" />
      <rect x="312" y="158" width="30" height="6" rx="3" fill="#C7D2FE" />
      <rect x="312" y="170" width="58" height="4" rx="2" fill="#F1F5F9" />
    </svg>
  );
}

function CommunicationIllustration() {
  return (
    <svg viewBox="0 0 480 260" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* Main broadcast panel */}
      <rect x="16" y="8" width="290" height="244" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

      {/* Header */}
      <rect x="32" y="24" width="80" height="7" rx="3.5" fill="#CBD5E1" />

      {/* Recipient pills row */}
      <rect x="32" y="46" width="16" height="5" rx="2.5" fill="#CBD5E1" />
      {/* Pill — indigo */}
      <rect x="56" y="40" width="72" height="20" rx="10" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="0.6" />
      <rect x="64" y="47" width="56" height="6" rx="3" fill="#C7D2FE" />
      {/* Pill — teal */}
      <rect x="136" y="40" width="68" height="20" rx="10" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="0.6" />
      <rect x="144" y="47" width="52" height="6" rx="3" fill="#99F6E4" />
      {/* Pill — amber */}
      <rect x="212" y="40" width="72" height="20" rx="10" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="0.6" />
      <rect x="220" y="47" width="56" height="6" rx="3" fill="#FDE68A" />

      {/* Subject field */}
      <rect x="32" y="74" width="252" height="22" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="0.6" />
      <rect x="42" y="82" width="90" height="6" rx="3" fill="#E2E8F0" />

      {/* Message body */}
      <rect x="32" y="106" width="252" height="64" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="0.6" />
      <rect x="42" y="118" width="180" height="5" rx="2.5" fill="#E2E8F0" />
      <rect x="42" y="129" width="210" height="5" rx="2.5" fill="#F1F5F9" />
      <rect x="42" y="140" width="150" height="5" rx="2.5" fill="#F1F5F9" />
      <rect x="42" y="151" width="120" height="4" rx="2" fill="#F1F5F9" opacity="0.6" />

      {/* Send button */}
      <rect x="32" y="182" width="100" height="26" rx="8" fill="#6366F1" />
      <rect x="52" y="192" width="60" height="6" rx="3" fill="white" opacity="0.7" />

      {/* Stats mini bar */}
      <rect x="32" y="220" width="78" height="24" rx="6" fill="#EEF2FF" />
      <rect x="42" y="228" width="40" height="6" rx="3" fill="#C7D2FE" />
      <rect x="118" y="220" width="78" height="24" rx="6" fill="#F0FDFA" />
      <rect x="128" y="228" width="40" height="6" rx="3" fill="#99F6E4" />
      <rect x="204" y="220" width="78" height="24" rx="6" fill="#FFFBEB" />
      <rect x="214" y="228" width="40" height="6" rx="3" fill="#FDE68A" />

      {/* Floating sent card — rotated */}
      <g transform="rotate(3, 400, 70)">
        <rect x="336" y="36" width="120" height="80" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="0.8" />
        <rect x="350" y="50" width="70" height="6" rx="3" fill="#C7D2FE" />
        <rect x="350" y="62" width="90" height="5" rx="2.5" fill="#E2E8F0" />
        <rect x="350" y="73" width="60" height="5" rx="2.5" fill="#F1F5F9" />
        {/* Open rate badge */}
        <rect x="350" y="90" width="40" height="14" rx="7" fill="#F0FDFA" />
        <rect x="356" y="94" width="28" height="6" rx="3" fill="#99F6E4" />
      </g>

      {/* Notification dot */}
      <circle cx="415" cy="175" r="16" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="0.6" />
      <rect x="407" y="172" width="16" height="6" rx="3" fill="#6366F1" opacity="0.5" />
    </svg>
  );
}

function EventsIllustration() {
  return (
    <svg viewBox="0 0 480 260" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* Main list panel */}
      <rect x="16" y="8" width="290" height="244" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

      {/* Header */}
      <rect x="32" y="24" width="72" height="7" rx="3.5" fill="#CBD5E1" />
      <rect x="230" y="22" width="56" height="14" rx="7" fill="#EEF2FF" />
      <rect x="238" y="26" width="40" height="6" rx="3" fill="#C7D2FE" />

      {/* Event row 1 — Culte — indigo */}
      <rect x="32" y="50" width="254" height="48" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="0.5" />
      <rect x="40" y="58" width="5" height="32" rx="2.5" fill="#6366F1" />
      <rect x="56" y="62" width="120" height="7" rx="3.5" fill="#E2E8F0" />
      <rect x="56" y="76" width="80" height="5" rx="2.5" fill="#F1F5F9" />
      <rect x="224" y="64" width="46" height="16" rx="8" fill="#EEF2FF" />
      <rect x="232" y="69" width="30" height="6" rx="3" fill="#C7D2FE" />

      {/* Event row 2 — Prière — teal */}
      <rect x="32" y="108" width="254" height="48" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="0.5" />
      <rect x="40" y="116" width="5" height="32" rx="2.5" fill="#14B8A6" />
      <rect x="56" y="120" width="100" height="7" rx="3.5" fill="#E2E8F0" />
      <rect x="56" y="134" width="70" height="5" rx="2.5" fill="#F1F5F9" />
      <rect x="224" y="122" width="46" height="16" rx="8" fill="#F0FDFA" />
      <rect x="232" y="127" width="30" height="6" rx="3" fill="#99F6E4" />

      {/* Event row 3 — Accueil — amber */}
      <rect x="32" y="166" width="254" height="48" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="0.5" />
      <rect x="40" y="174" width="5" height="32" rx="2.5" fill="#F59E0B" />
      <rect x="56" y="178" width="130" height="7" rx="3.5" fill="#E2E8F0" />
      <rect x="56" y="192" width="90" height="5" rx="2.5" fill="#F1F5F9" />
      <rect x="224" y="180" width="46" height="16" rx="8" fill="#FFFBEB" />
      <rect x="232" y="185" width="30" height="6" rx="3" fill="#FDE68A" />

      {/* Floating attendee card — rotated */}
      <g transform="rotate(-2, 400, 90)">
        <rect x="336" y="44" width="120" height="85" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="0.7" />
        {/* 3 mini silhouettes */}
        <circle cx="368" cy="76" r="8" fill="#EEF2FF" />
        <circle cx="368" cy="72" r="3.5" fill="#6366F1" opacity="0.5" />
        <path d="M361 80 Q368 76 375 80" fill="#6366F1" opacity="0.3" />
        <circle cx="395" cy="76" r="8" fill="#F0FDFA" />
        <circle cx="395" cy="72" r="3.5" fill="#14B8A6" opacity="0.5" />
        <path d="M388 80 Q395 76 402 80" fill="#14B8A6" opacity="0.3" />
        <circle cx="422" cy="76" r="8" fill="#FFFBEB" />
        <circle cx="422" cy="72" r="3.5" fill="#D97706" opacity="0.5" />
        <path d="M415 80 Q422 76 429 80" fill="#D97706" opacity="0.3" />
        {/* Label */}
        <rect x="356" y="100" width="48" height="5" rx="2.5" fill="#CBD5E1" />
        <rect x="356" y="110" width="72" height="4" rx="2" fill="#F1F5F9" />
      </g>

      {/* Time indicator circle */}
      <circle cx="410" cy="200" r="18" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="0.6" />
      <rect x="402" y="195" width="16" height="5" rx="2.5" fill="#6366F1" opacity="0.4" />
      <rect x="402" y="203" width="16" height="4" rx="2" fill="#C7D2FE" />
    </svg>
  );
}

function FinancesIllustration() {
  return (
    <svg viewBox="0 0 480 260" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* Summary cards */}
      <rect x="16" y="8" width="160" height="52" rx="10" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="0.5" />
      <rect x="30" y="20" width="55" height="8" rx="4" fill="#C7D2FE" />
      <rect x="30" y="34" width="100" height="5" rx="2.5" fill="#E0E7FF" />

      <rect x="190" y="8" width="160" height="52" rx="10" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="0.5" />
      <rect x="204" y="20" width="55" height="8" rx="4" fill="#99F6E4" />
      <rect x="204" y="34" width="100" height="5" rx="2.5" fill="#CCFBF1" />

      {/* Chart area panel */}
      <rect x="16" y="74" width="334" height="178" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />

      {/* Bar chart */}
      <rect x="44" y="188" width="28" height="44" rx="5" fill="#C7D2FE" />
      <rect x="84" y="148" width="28" height="84" rx="5" fill="#6366F1" opacity="0.6" />
      <rect x="124" y="163" width="28" height="69" rx="5" fill="#99F6E4" />
      <rect x="164" y="126" width="28" height="106" rx="5" fill="#6366F1" opacity="0.7" />
      <rect x="204" y="143" width="28" height="89" rx="5" fill="#14B8A6" opacity="0.6" />
      <rect x="244" y="108" width="28" height="124" rx="5" fill="#6366F1" opacity="0.8" />
      <rect x="284" y="120" width="28" height="112" rx="5" fill="#99F6E4" />

      {/* Baseline */}
      <line x1="32" y1="234" x2="324" y2="234" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Axis labels */}
      <rect x="50" y="240" width="16" height="4" rx="2" fill="#F1F5F9" />
      <rect x="130" y="240" width="16" height="4" rx="2" fill="#F1F5F9" />
      <rect x="210" y="240" width="16" height="4" rx="2" fill="#F1F5F9" />
      <rect x="290" y="240" width="16" height="4" rx="2" fill="#F1F5F9" />

      {/* Floating trend card */}
      <g transform="rotate(2, 420, 110)">
        <rect x="370" y="82" width="100" height="60" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="0.7" />
        <rect x="384" y="94" width="40" height="7" rx="3.5" fill="#C7D2FE" />
        <rect x="384" y="107" width="72" height="5" rx="2.5" fill="#E2E8F0" />
        {/* Trend line */}
        <path d="M384 128 L396 122 L408 125 L420 116 L432 120 L444 110 L456 114" fill="none" stroke="#6366F1" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Growth indicator */}
      <circle cx="415" cy="210" r="18" fill="#F0FDF4" stroke="#A7F3D0" strokeWidth="0.6" />
      <path d="M407 214 L415 204 L423 214" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="415" y1="204" x2="415" y2="220" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const featureIllustrations = [MembersIllustration, CommunicationIllustration, EventsIllustration, FinancesIllustration];

const featureAccents = [
  { iconBg: "bg-indigo-50", iconColor: "text-indigo-500", linkColor: "text-indigo-500" },
  { iconBg: "bg-teal-50", iconColor: "text-teal-600", linkColor: "text-teal-600" },
  { iconBg: "bg-indigo-50", iconColor: "text-indigo-500", linkColor: "text-indigo-500" },
  { iconBg: "bg-teal-50", iconColor: "text-teal-600", linkColor: "text-teal-600" },
];

export function FeaturesOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.4,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Fonctionnalités"
          title="Tout ce dont votre église a besoin, au même endroit"
          subtitle="Une suite complète d'outils conçus spécifiquement pour les communautés de foi. Simples à utiliser, puissants à exploiter."
        />

        <div className="space-y-16 lg:space-y-24 max-w-6xl mx-auto">
          {FEATURES_OVERVIEW.map((feature, index) => {
            const reversed = index % 2 === 1;
            const accent = featureAccents[index];
            const Illustration = featureIllustrations[index];

            return (
              <ScrollReveal key={feature.title} delay={index * 0.08}>
                <div className={cn(
                  "grid lg:grid-cols-2 gap-8 lg:gap-14 items-center",
                )}>
                  {/* Text side */}
                  <div className={cn(reversed && "lg:order-2")}>
                    {feature.tag && (
                      <Badge variant={feature.tag === "Populaire" ? "amber" : "indigo"} className="mb-4">
                        {feature.tag}
                      </Badge>
                    )}

                    <div className={cn(
                      "inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5",
                      accent.iconBg,
                    )}>
                      <feature.icon className={cn("h-5 w-5", accent.iconColor)} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-3 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-5">
                      {feature.description}
                    </p>

                    <div className={cn(
                      "inline-flex items-center gap-1.5 text-sm font-medium group/link cursor-pointer transition-all duration-300",
                      accent.linkColor,
                    )}>
                      En savoir plus
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </div>
                  </div>

                  {/* Illustration side — clean, no browser frame */}
                  <div className={cn(reversed && "lg:order-1")}>
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-slate-300/[0.04] to-transparent blur-2xl" aria-hidden="true" />
                      <div className="relative px-2 py-4 sm:px-4 sm:py-6">
                        {Illustration && <Illustration />}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
