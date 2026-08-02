"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrandsCarousel() {
  const brands = [
    { name: "ATLAS", text: "Atlas" },
    { name: "NOVO", text: "Novo" },
    { name: "EMBER", text: "Ember" },
    { name: "SOLSTICE", text: "Solstice" },
    { name: "TENZO", text: "Tenzo" },
    { name: "VANTAGE", text: "Vantage" },
    { name: "LUMEN", text: "Lumen" },
    { name: "OCEANIC", text: "Oceanic" },
    { name: "NEXUS", text: "Nexus" },
    { name: "CRESCENT", text: "Crescent" },
    { name: "ARC", text: "Arc" },
    { name: "HAVEN", text: "Haven" },
    { name: "PIVOT", text: "Pivot" },
  ];

  // Double the list to create a seamless infinite loop
  const marqueeItems = [...brands, ...brands];

  return (
    <section className="w-full bg-slate-950 text-white py-16 overflow-visible z-10 relative">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <motion.h6
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-unbounded text-slate-400 tracking-[0.2em] uppercase"
        >
          We work with global leaders and ambitious brands ready to lead
        </motion.h6>
      </div>

      {/* Marquee track wrapper */}
      {/* Marquee track wrapper */}
      <div className="relative w-full overflow-hidden py-4 border-y border-slate-800 bg-black/30 brands-carousel-mask">
        <div className="flex w-[200%] animate-marquee whitespace-nowrap items-center space-x-8 sm:space-x-12">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center justify-center min-w-[120px] sm:min-w-[150px] h-12 text-zinc-500 font-unbounded font-semibold tracking-wider text-base sm:text-xl select-none hover:text-white transition-colors duration-300"
            >
              {/* Using stylized text representation for the monochrome logos */}
              <span className="uppercase text-sm tracking-[0.25em]">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
