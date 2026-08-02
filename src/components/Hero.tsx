"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[95vh] md:min-h-[120vh] overflow-hidden flex flex-col justify-start items-center bg-slate-950">
      {/* Video Background Mock / Loader */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          className="absolute inset-0 min-w-full min-h-full w-full h-full object-cover object-center hidden md:block"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/atlas.mp4"
            type="video/mp4"
          />
        </video>
        <video
          className="absolute inset-0 min-w-full min-h-full w-full h-full object-cover object-center block md:hidden"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/atlas.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-start pt-28 md:pt-32">
        <div className="w-full pointer-events-none overflow-visible -mx-4 sm:-mx-6">
          <h1 className="relative w-full max-w-[90vw] mx-auto text-[clamp(4rem,16vw,14rem)] font-richblack tracking-[-0.02em] text-amber-400 leading-[0.8]  select-none break-words">
            <span className="block uppercase">ATLAS.</span>
            <span className="hidden md:inline-block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(0.5rem,5vw,4rem)] font-noto-serif font-light leading-tight max-w-3xl mb-4 px-4 md:px-0 tracking-[0.04em] text-black">
             Digital Agency
            </span>
            <span className="mt-4  block md:hidden text-[clamp(0.8rem,3vw,1.5rem)] font-noto-serif font-light text-2xl md:text-2xl lg:text-4xl leading-tight max-w-4xl mb-6 px-4 md:px-0  tracking-[0.04em] text-black">
              A Top Rated Digital Agency
            </span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center pt-6 md:pt-8 lg:pt-10"
        >
          <h1 className="font-unbounded text-[clamp(1rem,3vw,1.9rem)] sm:text-[clamp(1.15rem,3vw,2rem)] md:text-[clamp(1.4rem,2.3vw,2.5rem)] text-black leading-tight tracking-wide px-4 sm:px-0 max-w-4xl text-center">
            Web Development, Digital Marketing, Automation, Virtual Assistance and Growth Strategies Designed to Increase Revenue and Reclaim Your Team’s Time.
          </h1>

          {/* <p className="font-unbounded font-bold text-lg md:text-2xl text-white max-w-3xl leading-relaxed tracking-wide px-4 md:px-16 mt-4">
            Web development, digital marketing, automation, virtual assistance and growth strategies designed to increase revenue and reclaim your team’s time.
          </p> */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-sm font-bold text-slate-950 uppercase tracking-[0.2em] hover:bg-amber-300 hover:text-slate-950 transition-all"
            >
              Book A Free Consultation
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 px-8 py-3 text-sm font-bold text-amber-400 uppercase tracking-[0.2em] hover:border-amber-400 hover:bg-amber-400/20 transition-all"
            >
              View Our Services
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator keyline */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-20 bg-amber-400/80"
        />
      </div>
    </section>
  );
}
