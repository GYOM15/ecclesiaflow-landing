"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animation/stagger-container";
import { TEAM_MEMBERS } from "@/lib/constants";

export function AboutTeam() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Équipe"
          title="Les visages derrière EcclesiaFlow"
          subtitle="Une équipe passionnée par la technologie et engagée dans la mission de l'Église."
        />

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <StaggerItem key={member.name}>
              <Card variant="default" className="text-center py-8">
                <Avatar
                  name={member.name}
                  size="lg"
                  className="mx-auto mb-4"
                />
                <h3 className="text-base font-semibold text-slate-900 mb-0.5">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-indigo-500 mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed px-2">
                  {member.bio}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
