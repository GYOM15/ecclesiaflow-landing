"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { CrossMotif } from "@/components/decorative/cross-motif";

export function AboutStory() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mb-6 leading-snug">
                Pourquoi avons-nous créé EcclesiaFlow&nbsp;?
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Tout a commencé dans une petite église de banlieue parisienne.
                  Notre fondateur, Emmanuel, développeur chez Google, était
                  aussi bénévole dans sa communauté. Il voyait chaque semaine
                  les pasteurs et responsables lutter avec des tableurs Excel,
                  des cahiers papier et des outils déconnectés.
                </p>
                <p>
                  Il s&apos;est posé une question simple : pourquoi les
                  entreprises ont-elles accès à des outils incroyables comme
                  Slack, Notion ou Stripe, mais pas les églises&nbsp;?
                </p>
                <p>
                  EcclesiaFlow est né de cette frustration et de cette
                  conviction : l&apos;Église mérite le meilleur de la
                  technologie. Pas un logiciel de plus, mais un véritable
                  partenaire numérique qui comprend les besoins uniques d&apos;une
                  communauté de foi.
                </p>
                <p className="text-slate-900 font-medium">
                  Aujourd&apos;hui, plus de 500 églises utilisent EcclesiaFlow
                  pour servir leurs communautés avec excellence.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="relative">
              {/* Diffuse shadow */}
              <div
                className="absolute inset-0 rounded-3xl bg-indigo-500/5 blur-3xl scale-95"
                aria-hidden="true"
              />
              <div className="relative bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-3xl p-8 lg:p-10 border border-slate-200/40">
                {/* Timeline-style milestones */}
                <div className="space-y-6">
                  {[
                    { year: "2020", event: "L'idée naît pendant le confinement" },
                    { year: "2021", event: "Première version beta avec 10 églises pilotes" },
                    { year: "2022", event: "Lancement public et 100 églises inscrites" },
                    { year: "2023", event: "Expansion francophone : Belgique, Suisse, Canada" },
                    { year: "2024", event: "500+ églises, lancement de l'app mobile" },
                    { year: "2025", event: "Intelligence artificielle et analytics avancés" },
                  ].map((milestone, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-100 shrink-0" />
                        {i < 5 && (
                          <div className="w-px h-6 bg-indigo-200" />
                        )}
                      </div>
                      <div className="-mt-1">
                        <span className="text-xs font-semibold text-indigo-500">
                          {milestone.year}
                        </span>
                        <p className="text-sm text-slate-600">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative cross */}
                <div className="absolute -bottom-3 -right-3">
                  <CrossMotif size={40} opacity={0.08} />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
