"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Automation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-slate-950 py-24 md:py-32 overflow-hidden relative">
      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,600px)] h-[min(70vw,600px)] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(238,186,0,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#eeba00] flex items-center justify-center">
                <span className="text-[#010b0c] font-bold text-sm">A</span>
              </div>
              <span className="text-white font-unbounded font-bold text-lg tracking-[0.1em] uppercase">
                Automation
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white mb-6 font-unbounded font-black text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight uppercase"
            >
              Automation that saves time and powers scalable growth.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-4 font-light"
            >
              Atlas builds AI chatbots, CRM workflows and business automation that reduce manual work and support revenue growth.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-8 font-light"
            >
              Our automation solutions help teams stay focused on strategy while customer journeys and operations run more smoothly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#eeba00] text-[#010b0c] text-sm font-bold px-6 py-3 rounded-full hover:bg-white transition-colors font-unbounded"
              >
                Explore automation
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              {/* Workflow Efficiency Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#eeba00]" />
                  <span className="text-white text-sm font-medium">Workflow efficiency</span>
                </div>
                <span className="text-amber-400 font-unbounded font-black text-2xl md:text-3xl">
                  4.8X
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-5">
                {[
                  { name: "AI Chatbots", score: 90, color: "#38BDF8" },
                  { name: "CRM Workflows", score: 85, color: "#A855F7" },
                  { name: "Content Ops", score: 78, color: "#F97316" },
                  { name: "Support Automation", score: 82, color: "#22C55E" },
                  { name: "Campaign Scaling", score: 76, color: "#F59E0B" },
                ].map((item, i) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60 text-xs font-medium">{item.name}</span>
                      <span className="text-white text-xs font-bold">{item.score}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.score}%` } : { width: 0 }}
                        transition={{
                          duration: 1,
                          delay: 0.5 + i * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Tags */}
              <div className="flex gap-3 mt-8 pt-8 border-t border-white/10">
                {["VELOCITY", "COVERAGE", "LIVE SUPPORT", "GROWTH"].map((tag) => (
                  <div key={tag} className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-unbounded font-bold">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
