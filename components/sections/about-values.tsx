"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { VALUES } from "@/lib/constants";

export function AboutValues() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Nos valeurs"
          badgeVariant="amber"
          title="Ce en quoi nous croyons"
          subtitle="Six principes qui guident chacune de nos décisions et chaque ligne de code que nous écrivons."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <Card variant="default" className="h-full">
                <IconBox
                  icon={value.icon}
                  variant={
                    value.title.includes("Foi") ? "amber" : "indigo"
                  }
                  size="lg"
                  className="mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
