"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Automation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="bg-slate-950 py-10 md:py-10 overflow-hidden relative">
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
        <div className="max-w-3xl">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
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
        </div>
      </div>
    </section>
  );
}
