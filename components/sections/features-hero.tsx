"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FloatingOrbs } from "@/components/decorative/floating-orbs";

export function FeaturesHero() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <FloatingOrbs variant="indigo" className="opacity-50" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="indigo" dot className="mb-5">
            Fonctionnalités
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-5"
        >
          Des outils puissants et intuitifs pour chaque aspect de votre ministère
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
        >
          Découvrez en détail comment EcclesiaFlow simplifie la gestion
          de votre église avec des fonctionnalités pensées pour vos besoins.
        </motion.p>
      </div>
    </section>
  );
}
