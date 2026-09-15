"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, BarChart3, Cog, Users } from "lucide-react";

const serviceHighlights = [
  {
    icon: Code2,
    title: "Web Development",
    caption: "MODERN. SCALABLE. IMPACTFUL.",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    caption: "MORE REACH. REAL RESULTS.",
  },
  {
    icon: Cog,
    title: "Automation & AI",
    caption: "WORK SMARTER. GROW FASTER.",
  },
  {
    icon: Users,
    title: "Strategy & Consulting",
    caption: "IDEAS. DIRECTION. PROGRESS.",
  },
];

export default function Hero() {
  // Video only plays on desktop/tablet; mobile gets the static poster frame
  // to avoid burning data/battery on an autoplaying background video.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[95vh] md:min-h-[105vh] overflow-hidden flex flex-col justify-between items-center bg-slate-950 pt-28 sm:pt-36 pb-16"
    >
      {/* Earth Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {isDesktop ? (
          <video
            className="absolute inset-0 min-w-full min-h-full w-full h-full object-cover object-center"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/earth-hero-poster.jpg"
          >
            <source src="/earth-hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/earth-hero-poster.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
        {/* Dark overlay so headline stays legible regardless of frame brightness */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow badge with parent project amber grading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ddb375]/10 border border-[#ddb375]/25 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ddb375]" />
          <span className="font-unbounded text-[11px] font-bold tracking-[0.2em] text-[#ddb375] uppercase">
            A Top Rated Digital Growth Group
          </span>
        </motion.div>

        {/* Giant Serif Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full relative"
        >
          <h1 className="font-noto-serif text-[clamp(2.75rem,7vw,5.5rem)] font-bold tracking-[-0.02em] text-[#f5efe4] leading-[1.1]">
            Ideas that move the world.
          </h1>
        </motion.div>

        {/* Editorial Sub-Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 sm:mt-8 max-w-3xl"
        >
          <p className="font-body text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            We build websites, marketing systems and intelligent automation that help businesses grow. From stronger online visibility to practical AI solutions, we turn bold ideas into measurable progress.
          </p>
        </motion.div>

        {/* CTA Actions matching parent button styles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[#ddb375] px-8 py-3.5 text-sm font-bold text-slate-950 uppercase tracking-[0.2em] hover:bg-[#e6c698] hover:text-slate-950 transition-all shadow-lg shadow-[#ddb375]/20 group"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-[#ddb375]/30 bg-[#ddb375]/10 px-8 py-3.5 text-sm font-bold text-[#ddb375] uppercase tracking-[0.2em] hover:border-[#ddb375] hover:bg-[#ddb375]/20 transition-all group"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Service Highlights Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 w-full max-w-5xl"
        >
          {serviceHighlights.map(({ icon: Icon, title, caption }) => (
            <div key={title} className="flex flex-col items-center text-center px-2">
              <div className="w-14 h-14 rounded-full border border-[#ddb375]/40 bg-[#ddb375]/5 flex items-center justify-center text-[#ddb375] mb-3">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-white font-unbounded text-sm font-bold">{title}</span>
              <span className="mt-1.5 text-[10px] font-unbounded uppercase tracking-[0.15em] text-[#ddb375]/80">
                {caption}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator Keyline */}
      <div className="relative z-10 flex flex-col items-center mt-12">
        <span className="text-[10px] font-unbounded uppercase tracking-[0.3em] text-slate-500 mb-3 font-semibold">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-14 bg-gradient-to-b from-[#ddb375] to-transparent"
        />
      </div>
    </section>
  );
}
