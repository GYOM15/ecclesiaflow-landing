"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { FloatingOrbs } from "@/components/decorative/floating-orbs";

export function FeaturesHero() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <FloatingOrbs variant="indigo" className="opacity-50" />

      {/* Crown of thorns watermark */}
      <div className="hidden lg:block absolute left-[0%] top-[5%] opacity-[0.35] pointer-events-none select-none mix-blend-multiply" aria-hidden="true" style={{ maskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)" }}>
        <Image src="/images/couronne-indigo.png" alt="" width={2048} height={1365} className="w-[700px] h-auto" priority={false} />
      </div>

      {/* Diagonal veil bands — opposite direction from landing page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Indigo band */}
        <div
          className="absolute origin-top-left"
          style={{
            top: "-10%",
            right: "-5%",
            width: "160px",
            height: "150%",
            background: "linear-gradient(180deg, rgba(99,102,241,0.45) 0%, rgba(99,102,241,0.30) 60%, rgba(99,102,241,0.10) 100%)",
            transform: "rotate(25deg)",
          }}
        />
        {/* Teal band — overlapping, slightly offset */}
        <div
          className="absolute origin-top-left"
          style={{
            top: "-10%",
            right: "0%",
            width: "120px",
            height: "150%",
            background: "linear-gradient(180deg, rgba(20,184,166,0.35) 0%, rgba(20,184,166,0.20) 60%, rgba(20,184,166,0.06) 100%)",
            transform: "rotate(22deg)",
          }}
        />
      </div>

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
