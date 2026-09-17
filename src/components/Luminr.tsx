"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Luminr() {
  return (
    <section id="process" className="w-full bg-white text-rich-black py-24 z-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-1"
            >
              <span className="text-4xl font-unbounded font-black tracking-widest text-[#010b0c]">
                GROW
              </span>
              <span className="text-4xl font-unbounded font-black tracking-widest text-atlas-gold">
                TH
              </span>
            </motion.div>
          </div>

          <div className="md:col-span-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full h-44 bg-slate-100 rounded-3xl border border-slate-300 overflow-hidden flex items-center justify-center text-slate-500 font-unbounded text-xs relative"
              >
              <div className="absolute inset-0 bg-gradient-to-r from-atlas-gold/10 via-atlas-gold/5 to-transparent pointer-events-none" />
              <svg className="absolute bottom-0 left-0 w-full h-full text-slate-300 stroke-current opacity-70" fill="none" viewBox="0 0 800 200">
                <path d="M0 150 Q150 100 300 130 T600 70 T800 130" strokeWidth="2" />
                <path d="M0 120 Q120 70 240 100 T500 60 T800 100" strokeWidth="2" className="text-atlas-gold" />
              </svg>
              <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-[#010b0c]/60">
                OUR PROVEN GROWTH PROCESS
              </span>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-between items-start space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-noto-serif font-light text-3xl md:text-5xl leading-tight text-rich-black"
            >
              Our Proven Growth Process
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Discovery & Strategy",
                  desc: "We uncover the right opportunities, customer triggers, and digital paths to growth.",
                },
                {
                  step: "02",
                  title: "Planning & Execution",
                  desc: "We launch websites, campaigns and automation with clear goals tied to revenue.",
                },
                {
                  step: "03",
                  title: "Optimization & Automation",
                  desc: "We refine performance, streamline workflows, and improve conversions weekly.",
                },
                {
                  step: "04",
                  title: "Scale & Growth",
                  desc: "We expand what works, build reliable demand and keep your business ahead.",
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl border border-slate-300 p-6 bg-slate-100"
                >
                  <div className="text-atlas-gold text-xs tracking-[0.25em] uppercase font-unbounded font-bold mb-3">
                    Step {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#010b0c] mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-atlas-gold text-[#010b0c] font-bold rounded-full text-sm hover:bg-white hover:text-[#010b0c] transition-all font-unbounded"
            >
              Start Your Growth Plan
            </Link>
          </div>

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl border border-slate-300 bg-slate-950 p-10"
            >
              <div className="space-y-6 text-atlas-cream">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-atlas-gold font-unbounded font-bold">
                    PROCESS HIGHLIGHTS
                  </span>
                  <h3 className="mt-2 text-2xl font-black leading-tight">Built to scale your revenue and simplify your operations.</h3>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl bg-[#111517] p-5">
                    <p className="text-sm text-slate-400">Web and e-commerce builds that convert on day one.</p>
                  </div>
                  <div className="rounded-3xl bg-[#111517] p-5">
                    <p className="text-sm text-slate-400">Marketing systems that attract, nurture and close more leads.</p>
                  </div>
                  <div className="rounded-3xl bg-[#111517] p-5">
                    <p className="text-sm text-slate-400">Automation and support that save time and improve customer experience.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
