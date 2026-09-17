"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, BarChart3, Cog, Users } from "lucide-react";
import SocialIcon from "@/components/SocialIcon";
import { socialLinks } from "@/lib/contact-links";

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

// Vertical social bar order — pulled from lib/contact-links.ts, not hardcoded URLs.
const heroSocialOrder = ["Facebook", "LinkedIn", "X"] as const;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_WORDS = ["Ideas", "that", "move", "the", "world."];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Crossfades to black across the loop seam so the restart isn't a visible jump cut.
  const [videoFaded, setVideoFaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);

    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(rmq.matches);
    const rHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    rmq.addEventListener("change", rHandler);

    return () => {
      mq.removeEventListener("change", handler);
      rmq.removeEventListener("change", rHandler);
    };
  }, []);

  // Video plays on every viewport. Crossfade-to-black across the loop seam.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.setAttribute("muted", "");
    video.play().catch(() => {
      // Autoplay blocked (e.g. battery saver) — poster frame stays visible, no error surfaced.
    });

    const FADE_WINDOW = 0.8;
    let lastTime = 0;
    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const t = video.currentTime;
      if (video.duration - t < FADE_WINDOW) {
        setVideoFaded(true);
      } else if (t < lastTime) {
        // currentTime just dropped back to the start — the loop wrapped,
        // regardless of how far past FADE_WINDOW the first post-wrap
        // timeupdate lands (relying on "t < FADE_WINDOW" alone can miss
        // that check and leave the video faded out for a whole cycle).
        setVideoFaded(false);
      }
      lastTime = t;
    };
    const handleSeeked = () => {
      if (video.currentTime < FADE_WINDOW) setVideoFaded(false);
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeked", handleSeeked);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Entrance choreography — scaled 0.7x on mobile, skipped entirely for reduced motion.
  const sc = isMobile ? 0.7 : 1;
  const s = (v: number) => v * sc;
  const T = {
    h1Start: 0.3,
    h1Stagger: 0.12,
    h1Dur: 1.1,
    subStart: 1.2,
    subDur: 0.9,
    btnStart: 1.5,
    btnDur: 0.8,
    btnStagger: 0.1,
    svcStart: 1.8,
    svcDur: 0.8,
    svcStagger: 0.1,
    scrollStart: 2.2,
    scrollDur: 1.0,
  };

  const fadeUpInitial = reducedMotion ? false : { opacity: 0, y: 16 };

  return (
    <section
      id="home"
      className="relative w-full min-h-[95vh] md:min-h-[105vh] overflow-hidden flex flex-col justify-between items-center bg-slate-950 pt-28 sm:pt-36 pb-16"
    >
      {/* Earth Background Layer — plays at full size, no zoom/entrance animation on the video itself */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          className={`absolute inset-0 min-w-full min-h-full w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
            videoFaded ? "opacity-0" : "opacity-100"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/earth-hero-poster.jpg"
        >
          <source src="/earth-hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay so headline stays legible regardless of frame brightness */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        {/* Top gradient keeps the navbar readable over a bright patch of the video */}
        <div className="absolute top-0 inset-x-0 h-[160px] bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Vertical social bar — desktop/tablet only, hidden on mobile (icons stay in the footer) */}
      <div className="hidden md:flex absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-5">
        {heroSocialOrder.map((name, i) => {
          const social = socialLinks.find((s) => s.name === name);
          if (!social) return null;
          return (
            <motion.a
              key={name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Atlas Digital Group on ${name}`}
              initial={reducedMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: s(0.5), delay: s(T.scrollStart) + i * s(0.1), ease: EASE }}
              className="flex items-center justify-center w-10 h-10 text-atlas-gold hover:text-[#f0dcb8] hover:scale-110 transition-all"
            >
              <SocialIcon name={name} className="w-5 h-5" />
            </motion.a>
          );
        })}
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Giant Serif Headline — words fade/blur in one at a time, single h1 for SEO/a11y */}
        <h1
          className="font-noto-serif font-bold tracking-[-0.02em] text-[#f5efe4]"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.25rem)", lineHeight: 1.05 }}
        >
          {HERO_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: s(T.h1Dur), delay: s(T.h1Start) + i * s(T.h1Stagger), ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {word}
              {i < HERO_WORDS.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>

        {/* Editorial Sub-Headline */}
        <motion.div
          initial={fadeUpInitial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: s(T.subDur), delay: s(T.subStart), ease: EASE }}
          className="mt-6 sm:mt-8"
          style={{ maxWidth: 760 }}
        >
          <p
            className="font-barlow text-[#EDE6DA] mx-auto"
            style={{
              fontSize: "clamp(1.125rem, 1.6vw, 1.4rem)",
              fontWeight: 400,
              lineHeight: 1.6,
              textShadow: "0 2px 12px rgba(0,0,0,.6)",
            }}
          >
            We build websites, marketing systems and intelligent automation that help businesses grow. From stronger online visibility to practical AI solutions, we turn bold ideas into measurable progress.
          </p>
        </motion.div>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <motion.div
            initial={fadeUpInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: s(T.btnDur), delay: s(T.btnStart), ease: EASE }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-atlas-gold px-8 py-3.5 text-sm font-bold font-barlow text-slate-950 uppercase tracking-[0.2em] hover:bg-[#e6c698] transition-all shadow-lg shadow-atlas-gold/20 group"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            initial={fadeUpInitial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: s(T.btnDur), delay: s(T.btnStart) + s(T.btnStagger), ease: EASE }}
          >
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-atlas-gold/30 bg-atlas-gold/10 px-8 py-3.5 text-sm font-bold font-barlow text-atlas-gold uppercase tracking-[0.2em] hover:border-atlas-gold hover:bg-atlas-gold/20 transition-all group"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Service Highlights Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 w-full max-w-6xl">
          {serviceHighlights.map(({ icon: Icon, title, caption }, i) => (
            <motion.div
              key={title}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: s(T.svcDur), delay: s(T.svcStart) + i * s(T.svcStagger), ease: EASE }}
            >
              <Link
                href="#services"
                className="group flex flex-col items-center text-center px-2 transition-transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full border border-atlas-gold/40 bg-atlas-gold/5 flex items-center justify-center text-atlas-gold mb-3 transition-colors group-hover:border-atlas-gold">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-atlas-cream font-barlow text-[1.3rem] font-bold leading-tight">{title}</span>
                <span className="mt-1.5 font-barlow text-[0.8rem] uppercase tracking-[0.15em] text-atlas-gold/80 md:whitespace-nowrap">
                  {caption}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Indicator Keyline */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: s(T.scrollDur), delay: s(T.scrollStart), ease: EASE }}
        className="relative z-10 flex flex-col items-center mt-12"
      >
        <span className="text-[10px] font-barlow uppercase tracking-[0.3em] text-atlas-gold/60 mb-3 font-semibold">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: s(T.scrollStart) }}
          className="w-[1px] h-14 bg-gradient-to-b from-atlas-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
