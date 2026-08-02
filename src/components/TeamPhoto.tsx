"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TeamPhoto() {
  return (
    <section className="w-full bg-[#f4f8fe] text-rich-black py-24 z-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Large masked team photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative mb-16 border border-zinc-200"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200&h=500"
            alt="Atlas Digital Group team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010b0c]/30 to-transparent" />
        </motion.div>

        {/* Text Copy blocks */}
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-noto-serif font-light text-2xl md:text-4xl text-rich-black"
          >
            Built with data, creativity &amp;
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-unbounded font-black tracking-tighter text-[#010b0c] uppercase"
          >
            PREMIUM TALENT
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-600 text-base md:text-lg leading-relaxed font-light"
          >
            Our team blends strategy, design, marketing and operations to make your business more visible, memorable and profitable online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4"
          >
            <Link
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 bg-slate-950 text-white font-bold rounded-full text-xs hover:bg-amber-400 hover:text-slate-950 transition-all uppercase tracking-wider font-unbounded"
            >
              Meet the Team
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
