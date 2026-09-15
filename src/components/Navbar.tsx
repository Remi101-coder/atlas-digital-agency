"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Menu, ChevronDown } from "lucide-react";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  // ↓ Ref on the entire <nav> so the mega menu can be absolutely
  //   positioned relative to the navbar, not the Services button
  const navRef = useRef<HTMLElement>(null);
  const hoverIntent = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close desktop mega menu on click outside the entire nav
  useEffect(() => {
    if (!servicesOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [servicesOpen]);

  // Debounced hover helpers — prevents flicker when crossing
  // the small gap between the button and the dropdown panel
  const handleMouseEnter = () => {
    if (hoverIntent.current) clearTimeout(hoverIntent.current);
    setServicesOpen(true);
  };
  const handleMouseLeave = () => {
    hoverIntent.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      {/* ── Nav bar ───────────────────────────────────────────────────────── */}
      <motion.nav
        ref={navRef}
        initial={reducedMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: (isMobile ? 0.7 : 1) * 0.8, delay: (isMobile ? 0.7 : 1) * 2.2, ease: EASE }}
        // ↓ position:relative here so the mega menu's absolute positioning
        //   resolves to the full nav width, not the button container
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Inner row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-24 sm:h-[84px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 z-10">
              <Image
                src="/atlas-navbar-logo-final.png?v=1"
                alt="Atlas Digital Group"
                width={140}
                height={40}
                className="h-[67px] w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">

              {/* Services trigger — hover zone covers button only */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  className="flex items-center gap-1 text-white/90 hover:text-atlas-gold text-sm font-medium tracking-wide transition-colors py-2"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/90 hover:text-atlas-gold text-sm font-medium tracking-wide transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="#contact"
                className="hidden lg:inline-flex items-center gap-2 bg-atlas-gold text-slate-950 text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#e6c698] transition-colors"
              >
                Get in touch
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Desktop mega menu ─────────────────────────────────────────────
            Rendered INSIDE <nav> so it's in the same stacking/positioning
            context and its own hover keeps the menu alive               */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ServicesMegaMenu
            isOpen={servicesOpen}
            onClose={() => setServicesOpen(false)}
          />
        </div>
      </motion.nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-slate-950 overflow-y-auto"
          >
            <div className="pt-24 pb-10 px-6">

              {/* Services accordion trigger */}
              <div className="mb-2">
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-4 border-b border-white/10 text-white font-medium text-lg"
                >
                  Services
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 
                  ↓ Pass isOpen directly — ServicesMegaMenu's MobileMegaMenu
                    branch handles its own accordion rendering and animation.
                    No extra AnimatePresence wrapper needed here.
                */}
                <ServicesMegaMenu
                  isOpen={mobileServicesOpen}
                  onClose={() => {
                    setMobileServicesOpen(false);
                    setMobileOpen(false);
                  }}
                />
              </div>

              {/* Other nav links */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-4 border-b border-white/10 text-white font-medium text-lg hover:text-atlas-gold transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="#contact"
                  className="block w-full text-center bg-atlas-gold text-slate-950 font-bold py-4 rounded-full text-lg hover:bg-[#e6c698] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}