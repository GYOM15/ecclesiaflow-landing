"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const scatterItems = [
  { label: "Ensemble", src: "/images/ensemble.jpg", width: "w-[48%]", height: "aspect-[4/3]", rotate: "rotate-2", z: 10, pos: "top-0 left-[2%]" },
  { label: "Louange", src: "/images/louange.png", width: "w-[30%]", height: "aspect-square", rotate: "-rotate-3", z: 20, pos: "top-[3%] right-[4%]" },
  { label: "Étude", src: "/images/etude.jpg", width: "w-[32%]", height: "aspect-[3/4]", rotate: "rotate-1", z: 20, pos: "top-[50%] left-[6%]" },
  { label: "Communion", src: "/images/communion.jpg", width: "w-[28%]", height: "aspect-square", rotate: "-rotate-1", z: 30, pos: "top-[36%] right-[10%]" },
  { label: "Baptême", src: "/images/ImmersionBaptism.jpg", width: "w-[26%]", height: "aspect-[4/3]", rotate: "rotate-3", z: 40, pos: "bottom-[2%] right-[28%]" },
];

export function ImageScatter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 lg:py-24 bg-slate-50 overflow-hidden">
      {/* Corner gradient patches */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-indigo-100/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-slate-200/50 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-56 h-44 bg-gradient-to-tr from-slate-200/40 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-52 h-48 bg-gradient-to-tl from-indigo-100/30 to-transparent pointer-events-none" aria-hidden="true" />

      {/* Background decorative miniatures */}
      <div className="absolute top-8 right-[6%] w-28 h-20 rounded-lg overflow-hidden opacity-[0.07] rotate-6 pointer-events-none hidden lg:block" aria-hidden="true">
        <Image src="/images/communion.jpg" alt="" fill className="object-cover" sizes="112px" />
      </div>
      <div className="absolute bottom-10 left-[5%] w-24 h-24 rounded-lg overflow-hidden opacity-[0.06] -rotate-3 pointer-events-none hidden lg:block" aria-hidden="true">
        <Image src="/images/louange.png" alt="" fill className="object-cover" sizes="96px" />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto" style={{ minHeight: "520px" }}>
          {scatterItems.map((item, index) => (
            <motion.div
              key={item.label}
              style={{ zIndex: item.z }}
              className={`absolute ${item.pos} ${item.width} group hover:!z-50 transition-[z-index] duration-0`}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 30 }
              }
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={`${item.height} ${item.rotate} rounded-xl shadow-[0_4px_20px_-6px_rgba(0,0,0,0.10)] overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.20)] hover:rotate-0 cursor-pointer relative`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                {/* Label — top right */}
                <div className="absolute top-0 right-0 p-3">
                  <span className="text-base font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Spacer to ensure parent has minimum height */}
          <div className="h-[520px] lg:h-[570px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
