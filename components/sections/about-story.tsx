"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { CrossMotif } from "@/components/decorative/cross-motif";

/* ─── Milestone colors — each step has its own unique color ─── */
const dotGradients = [
  "from-indigo-500 to-indigo-400",
  "from-teal-500 to-teal-400",
  "from-amber-500 to-amber-400",
  "from-indigo-500 to-indigo-400",
  "from-teal-500 to-teal-400",
  "from-amber-500 to-amber-400",
];

const ringColors = [
  "ring-indigo-100",
  "ring-teal-100",
  "ring-amber-100",
  "ring-indigo-100",
  "ring-teal-100",
  "ring-amber-100",
];

/* Color values for the single traveling circuit */
const circuitColors = [
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#f59e0b", // amber
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#f59e0b", // amber
];

const milestones = [
  { year: "2025", event: "L'idée naît d'une conviction", detail: "Emmanuel, développeur chez Google, constate les limites des outils utilisés dans son église." },
  { year: "2025", event: "Première version beta", detail: "10 églises pilotes testent la plateforme et valident le concept." },
  { year: "2025", event: "Lancement public", detail: "Ouverture de la bêta publique. L'équipe fondatrice se structure." },
  { year: "2026", event: "Expansion francophone", detail: "Belgique, Suisse et Canada rejoignent la communauté. API et intégrations tierces." },
  { year: "2026", event: "App mobile & croissance", detail: "Lancement iOS & Android. Nouvelles fonctionnalités financières et communication." },
  { year: "2027", event: "IA & analytics avancés", detail: "Intelligence artificielle pour les insights pastoraux et l'optimisation de l'engagement." },
];

/* Single circuit duration — smooth and slow */
const CIRCUIT_DURATION = 10; // seconds for one complete descent through all dots

export function AboutStory() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ScrollReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Genèse
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mb-6 leading-snug">
                Pourquoi avons-nous créé EcclesiaFlow&nbsp;?
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  Tout a commencé dans une petite église de quartier à Montréal.
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
              </div>

              {/* Key differentiators */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { label: "Open source", desc: "Transparence totale" },
                  { label: "Loi 25 natif", desc: "Conforme dès le jour 1" },
                  { label: "Francophone", desc: "Support en français" },
                  { label: "Cloud souverain", desc: "Hébergement Canada" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="relative">
              {/* Diffuse shadow */}
              <div className="absolute -inset-4 rounded-3xl bg-indigo-500/5 blur-3xl" aria-hidden="true" />

              <div className="relative bg-slate-50 rounded-xl p-7 lg:p-9 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 rounded-full bg-indigo-500" />
                  Notre parcours
                </h3>

                {/* Timeline with single traveling circuit */}
                <div className="relative">
                  {/* Single traveling light — descends the full timeline, changing color */}
                  <div className="absolute left-[11px] top-0 bottom-0 w-[2px] overflow-visible">
                    <motion.div
                      className="absolute left-[-2px] w-[6px] h-8 rounded-full opacity-80"
                      style={{ filter: "blur(1px)" }}
                      animate={{
                        top: ["0%", "100%"],
                        backgroundColor: circuitColors,
                      }}
                      transition={{
                        top: {
                          duration: CIRCUIT_DURATION,
                          repeat: Infinity,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                        backgroundColor: {
                          duration: CIRCUIT_DURATION,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                  </div>

                  <div className="space-y-0">
                    {milestones.map((milestone, i) => {
                      const isLast = i === milestones.length - 1;

                      return (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            {/* Static colored dot */}
                            <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                              <div
                                className={`relative z-10 w-3.5 h-3.5 rounded-full bg-gradient-to-br ${dotGradients[i]} ring-4 ${ringColors[i]}`}
                              />
                            </div>

                            {/* Connector line */}
                            {!isLast && (
                              <div className="relative w-px h-10">
                                <div className="absolute inset-0 w-0.5 mx-auto bg-gradient-to-b from-slate-200 to-slate-100" />
                              </div>
                            )}
                          </div>

                          <div className={`-mt-0.5 ${isLast ? "pb-0" : "pb-3"}`}>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold text-slate-600">{milestone.year}</span>
                              <span className="text-xs font-semibold text-slate-700">{milestone.event}</span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">{milestone.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

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
