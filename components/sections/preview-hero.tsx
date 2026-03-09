"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "@/components/decorative/gradient-text";

export function PreviewHero() {
  return (
    <section className="relative pt-28 pb-10 lg:pt-36 lg:pb-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="indigo" dot className="mb-5">
            Aperçu
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight mb-5"
        >
          Découvrez{" "}
          <GradientText>l&apos;interface</GradientText>{" "}
          avant de commencer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
        >
          Explorez un aperçu interactif du tableau de bord EcclesiaFlow.
          Voyez par vous-même comment votre église pourrait fonctionner
          au quotidien.
        </motion.p>
      </div>
    </section>
  );
}
