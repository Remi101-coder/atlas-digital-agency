"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CaseStudies() {
  return (
    <section id="portfolio" className="w-full bg-white text-rich-black py-24 z-10 relative overflow-hidden border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950 text-white flex flex-col lg:flex-row min-h-[420px] md:min-h-[500px]">
          <div className="w-full lg:w-1/2 relative min-h-[260px] md:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800&h=600"
              alt="Atlas Digital Group Success Story"
              className="w-full h-full object-cover absolute inset-0 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#010b0c]/40 to-[#010b0c] z-10" />
          </div>

          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between z-20 bg-slate-950">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-unbounded font-bold text-xl md:text-2xl text-white uppercase tracking-tight leading-tight"
              >
                Success Story: Growth launch for a service brand
              </motion.div>

              <div className="flex items-center space-x-3">
                <span className="text-slate-500 font-unbounded text-xs uppercase tracking-widest">
                  PROJECT
                </span>
                <span className="font-sans font-black tracking-tight px-3 py-1 bg-slate-800 text-white rounded text-sm select-none border border-slate-700">
                  WEBSITE + MARKETING
                </span>
              </div>

              <div>
                <span className="text-slate-500 font-unbounded text-xs uppercase tracking-widest block mb-2">
                  Outcome
                </span>
                <p className="text-slate-300 font-barlow text-base md:text-lg leading-relaxed font-light">
                  We launched a premium growth website, launched targeted ads, and created marketing automation that delivered a consistent stream of qualified leads and a better client experience.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              <div className="grid grid-cols-2 gap-6 border-t border-zinc-800/80 pt-6">
                <div>
                  <span className="text-zinc-500 font-unbounded text-[10px] uppercase tracking-wider block mb-1">
                    LEAD GROWTH
                  </span>
                  <div className="flex items-baseline font-unbounded font-bold text-4xl text-[#eeba00]">
                    3x
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500 font-unbounded text-[10px] uppercase tracking-wider block mb-1">
                    OPERATIONAL EFFICIENCY
                  </span>
                  <div className="flex items-baseline font-unbounded font-bold text-4xl text-[#eeba00]">
                    45<span className="text-lg font-semibold ml-1">%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-start">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#eeba00] text-[#010b0c] font-bold rounded-full text-xs hover:bg-white hover:text-[#010b0c] transition-all uppercase tracking-wider font-unbounded"
                >
                  Explore success stories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
