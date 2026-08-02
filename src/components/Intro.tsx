"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Intro() {
  const highlights = [
    {
      title: "Growth-led digital strategy",
      desc: "We design and build digital systems that attract more customers, increase revenue, and support sustained growth.",
    },
    {
      title: "Automation & support",
      desc: "From AI chatbots to virtual assistants, we remove repetitive work so your team can focus on what matters most.",
    },
    {
      title: "Trusted business partners",
      desc: "We work with ambitious businesses worldwide to turn digital channels into reliable revenue engines.",
    },
  ];

  return (
    <section id="about" className="relative w-full bg-slate-950 text-white py-24 z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[140%] aspect-square rounded-full border border-slate-700/30 -translate-y-[80%] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-slate-600/60 mb-12" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-barlow font-medium text-sm tracking-[0.2em] uppercase text-slate-400 mb-10"
        >
          About Atlas Digital Group
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl space-y-8"
        >
          <h2 className="font-noto-serif font-light text-4xl md:text-6xl text-white leading-tight">
            We help businesses grow faster through high-performing websites, strategic marketing, automation, and virtual support.
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
            Atlas Digital Group is a full-service digital growth agency for businesses who want more revenue, more efficiency, and a better customer experience. We combine website excellence, targeted digital marketing, smart automation and virtual assistance into one growth system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full"
        >
          {highlights.map((item) => (
            <div key={item.title} className="bg-slate-900/40 p-8 rounded-3xl border border-slate-700/80">
              <h3 className="text-amber-400 text-xs uppercase tracking-[0.2em] font-unbounded font-bold mb-4">
                {item.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl text-center mt-16"
        >
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
            We deliver growth for companies across web development, e-commerce, lead generation, local services, coaching, consulting, and SaaS. Our clients choose Atlas because we treat every project like a long-term growth partnership.
          </p>
        </motion.div>

        <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-zinc-700/60 mt-16" />
      </div>
    </section>
  );
}
