"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Avatar } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div className="relative bg-white rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_0_20px_-4px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 transition-all duration-300 text-center py-8 px-4 overflow-hidden border border-slate-200">
                <Avatar
                  name={member.name}
                  size="lg"
                  className="mx-auto mb-4"
                />
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">
                  {member.name}
                </h3>
                <span className="inline-flex text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600 mb-3">
                  {member.role}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {member.bio}
                </p>

                {/* Social links */}
                <div className="flex justify-center gap-2 mt-4 pt-3 border-t border-slate-100">
                  {["Twitter", "LinkedIn"].map((social) => (
                    <a key={social} href="#" className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors" aria-label={social}>
                      <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                        {social === "Twitter" ? (
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        ) : (
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        )}
                      </svg>
                    </a>
                  ))}
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
