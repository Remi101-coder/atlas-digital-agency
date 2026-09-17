"use client";

import React from "react";
import ScrollReveal from "./ui/ScrollReveal";

export default function Intro() {
  return (
    <section id="about-intro" className="relative w-full bg-slate-950 text-atlas-cream py-10 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Background Ambience Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Subtle Section Keyline */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-atlas-gold/60 mb-8" />

        <ScrollReveal delay={0.1}>
          <span className="eyebrow-tag block mb-6">
            DIGITAL GROWTH GROUP · UK
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-light text-atlas-cream leading-[1.2] tracking-tight">
            We help ambitious businesses scale through high-performing websites, strategic digital marketing, intelligent automation, and dedicated support.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl space-y-6 text-slate-300 font-body text-base sm:text-lg md:text-xl font-light leading-relaxed">
            <p>
              Atlas Digital Group is a full-service agency built for businesses who want more revenue, more efficiency, and better results. We optimise not just for isolated clicks, but for how your brand shows up across search. We bring together websites, targeted digital marketing, smart automation, and virtual assistance into one growth system.
            </p>
            <div className="pt-2">
              <span className="font-display font-bold text-sm sm:text-base tracking-[0.15em] text-atlas-gold uppercase">
                MAKE EVERY SEARCH COUNT. GROW WITH ATLAS.
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
