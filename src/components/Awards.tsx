"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Awards() {
  return (
    <section className="w-full bg-slate-950 text-atlas-cream py-24 z-10 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-noto-serif font-light text-3xl md:text-5xl text-atlas-cream"
          >
            What our clients say
          </motion.h2>
        </div>

        <div className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <blockquote className="text-slate-200 font-barlow text-xl md:text-3xl font-light italic leading-relaxed !m-0 !p-0">
                &ldquo;Atlas helped us move from scattered campaigns to a unified growth engine. The new website, automation setup, and campaign strategy delivered a consistent stream of better leads and more time back for our team.&rdquo;
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 space-y-3 lg:border-l lg:border-zinc-800 lg:pl-8"
            >
              <div className="font-unbounded font-semibold text-atlas-gold text-sm uppercase tracking-wider">
                — MotiveX
              </div>
              <div className="text-slate-400 font-barlow text-xs uppercase tracking-widest">
                Founder, MotiveX Recruitment Ltd.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
