"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BrandsCarousel() {
  const technologies = [
    "NEXT.JS",
    "REACT",
    "NODE.JS",
    "MongoDB",
    "WORDPRESS",
    "WOOCOMMERCE",
    "SHOPIFY",
    "GOOGLE ADS",
    "HUBSPOT",
  ];

  return (
    <section className="w-full bg-slate-950 text-white  overflow-visible z-10 relative">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <motion.h6
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-unbounded text-slate-400 tracking-[0.2em] uppercase"
        >
          Technologies &amp; platforms we use
        </motion.h6>
      </div>

      {/* Marquee track wrapper */}
      <div className="relative w-full overflow-hidden py-4 border-y border-slate-800 bg-black/30 brands-carousel-mask">
        <div className="flex w-[200%] animate-marquee whitespace-nowrap items-center space-x-8 sm:space-x-12">
          {/* Visible, accessible list */}
          <div className="flex items-center space-x-8 sm:space-x-12">
            {technologies.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center min-w-[120px] sm:min-w-[150px] h-12 text-zinc-500 font-unbounded font-semibold tracking-wider text-base sm:text-xl select-none hover:text-white transition-colors duration-300"
              >
                <span className="uppercase text-sm tracking-[0.25em]">{name}</span>
              </div>
            ))}
          </div>
          {/* Duplicate copy for the seamless loop — hidden from assistive tech */}
          <div className="flex items-center space-x-8 sm:space-x-12" aria-hidden="true">
            {technologies.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center min-w-[120px] sm:min-w-[150px] h-12 text-zinc-500 font-unbounded font-semibold tracking-wider text-base sm:text-xl select-none hover:text-white transition-colors duration-300"
              >
                <span className="uppercase text-sm tracking-[0.25em]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
