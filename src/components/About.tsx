"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const benefits = [
  {
    title: "Results-Focused Strategies",
    description: "We design campaigns and websites around measurable outcomes, not vanity metrics.",
  },
  {
    title: "Experienced Digital Experts",
    description: "A multidisciplinary team that combines web, marketing, automation and support expertise.",
  },
  {
    title: "Automation-Driven Efficiency",
    description: "Engineering workflows that save time, reduce errors and scale operations smoothly.",
  },
  {
    title: "Transparent Communication",
    description: "Clear reporting, regular progress updates and strategic guidance at every stage.",
  },
  {
    title: "Long-Term Partnership",
    description: "We focus on sustainable growth and trusted collaboration beyond launch.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} id="about" className="bg-slate-950 py-24 md:py-32 overflow-hidden relative">
      {/* Decorative circles */}
<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[min(65vw,600px)] h-[min(65vw,600px)] rounded-full border border-atlas-gold/10 pointer-events-none" />
  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[55%] w-[min(90vw,800px)] h-[min(90vw,800px)] rounded-full border border-atlas-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-atlas-cream/50 text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          >
            Why businesses choose Atlas
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-atlas-cream mb-8 font-noto-serif font-light text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            Growth Planned,
            <br />
            For Every Stage.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-atlas-cream/60 text-base md:text-lg leading-relaxed max-w-xl"
          >
            We blend strategy, technical execution and human support to help businesses scale with confidence. Every campaign, website and workflow is built to improve conversions, increase efficiency and create dependable growth.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-atlas-gold/10 text-atlas-gold-light text-sm font-unbounded font-semibold">
                +
              </div>
              <div>
                <p className="text-atlas-gold text-[10px] uppercase tracking-[0.3em] mb-3 font-unbounded font-semibold">
                  {benefit.title}
                </p>
                <p className="text-atlas-cream/70 text-sm leading-6">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
