"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { PRICING_PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const planAccents = [
  { check: "text-slate-400", border: "border-slate-200/60", bg: "bg-white" },
  { check: "text-teal-500", border: "border border-indigo-200/60", bg: "bg-gradient-to-b from-indigo-50/20 to-white" },
  { check: "text-indigo-500", border: "border-slate-200/60", bg: "bg-white" },
];

export function PricingCards() {
  const [yearly, setYearly] = useState(1);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tarifs"
          title="Des tarifs simples et transparents"
          subtitle="Commencez gratuitement, évoluez quand vous êtes prêt. Pas de frais cachés, pas de surprises."
        />

        <div className="flex justify-center mb-12">
          <Toggle
            options={["Mensuel", "Annuel"]}
            active={yearly}
            onChange={setYearly}
            savingLabel="Économisez ~30%"
          />
        </div>

        <StaggerContainer className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {PRICING_PLANS.map((plan, i) => (
            <StaggerItem key={plan.name}>
              <div
                className={cn(
                  "relative rounded-xl p-6 transition-all duration-300 flex flex-col overflow-hidden",
                  planAccents[i].border,
                  planAccents[i].bg,
                  plan.highlighted
                    ? "lg:-mt-4 lg:pb-10 shadow-[0_8px_40px_-8px_rgba(99,102,241,0.15),0_4px_20px_-4px_rgba(0,0,0,0.06)]"
                    : "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 cursor-pointer"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-500 rounded-t-xl" />
                )}
                {plan.badge && (
                  <div className="mb-4">
                    <Badge variant="amber" className="shadow-sm">
                      <Sparkles className="h-3 w-3 mr-0.5" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {plan.monthlyPrice !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-slate-900">
                        ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-slate-400 text-sm">/{yearly ? "an" : "mois"}</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold text-slate-900">Sur mesure</div>
                  )}
                  {plan.monthlyPrice !== null && yearly === 1 && plan.monthlyPrice > 0 && (
                    <p className="text-xs text-slate-400 mt-1">
                      soit ${Math.round((plan.yearlyPrice || 0) / 12)}/mois facturé annuellement
                    </p>
                  )}
                </div>

                <Link href={plan.cta === "Contacter l'équipe" ? "/about" : "/inscription"} className="block">
                  <Button
                    variant={plan.highlighted ? "primary" : "outline"}
                    size="lg"
                    className="w-full mb-6"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Ce qui est inclus
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                          plan.highlighted ? "bg-teal-50" : "bg-slate-50"
                        )}>
                          <Check className={cn("h-3.5 w-3.5", planAccents[i].check)} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
