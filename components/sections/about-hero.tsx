"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
// Uniform title color (no gradient)

const ease = [0.25, 0.1, 0.25, 1.0] as const;

export function AboutHero() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[20%] right-[10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute top-[20%] -left-[5%] w-[35%] h-[45%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)] rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        {/* Crown of thorns watermark */}
        <div className="hidden lg:block absolute right-[0%] top-[5%] opacity-[0.35] select-none mix-blend-multiply" style={{ maskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)" }}>
          <Image src="/images/couronne-indigo.png" alt="" width={2048} height={1365} className="w-[700px] h-auto" priority={false} />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
          <Badge variant="amber" dot className="mb-5">
            Notre histoire
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-5"
        >
          Nous croyons que la technologie peut{" "}
          servir l&apos;Église
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
          className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          EcclesiaFlow est né d&apos;une conviction simple : chaque église,
          quelle que soit sa taille, mérite des outils à la hauteur de
          sa mission. Nous construisons la plateforme qui rend cela possible.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="flex items-center justify-center gap-8 lg:gap-14"
        >
          {[
            { value: "2025", label: "Année de fondation" },
            { value: "4", label: "Membres fondateurs" },
            { value: "100%", label: "Autofinancé" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
