"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";


export default function SearchChanged() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="w-full bg-[#f4f8fe] text-rich-black py-24 z-10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-noto-serif font-light text-4xl md:text-6xl text-rich-black"
          >
            Why ambitious businesses
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-unbounded font-extrabold text-amber-400 mt-2 tracking-tighter"
          >
            Choose Atlas Digital Group
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-noto-serif font-light text-2xl md:text-4xl text-rich-black leading-tight"
            >
              Results-focused growth for every stage of your business.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-700 text-sm md:text-base leading-relaxed font-light"
            >
              We combine premium websites, strategic marketing, automation and
              virtual support to deliver faster leads, better conversions and
              more efficient operations. Our approach ensures every channel
              works together to support measurable business growth.
            </motion.p>

            <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-[#eeba00] to-[#e46e00]" />
          </div>

          {/* Right column — circular video */}
          <div className="lg:col-span-5 flex justify-end items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[520px] aspect-square"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-[10px] border-white shadow-[0_35px_90px_rgba(0,0,0,0.22)]">
                <video
                  src="/digital-agency.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}