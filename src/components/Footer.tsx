"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  const serviceLinks = [
    { name: "Web Development", href: "#services" },
    { name: "SEO & Ads", href: "#services" },
    { name: "Content & Branding", href: "#services" },
    { name: "Automation", href: "#services" },
    { name: "Virtual Assistants", href: "#services" },
    { name: "Video Production", href: "#services" },
    { name: "Growth Consulting", href: "#services" },
  ];

  const clientLinks = [
    { name: "Startups", href: "#clients" },
    { name: "Ecommerce", href: "#clients" },
    { name: "Local Businesses", href: "#clients" },
    { name: "Coaches & Consultants", href: "#clients" },
    { name: "Service Brands", href: "#clients" },
    { name: "Small Businesses", href: "#clients" },
    { name: "Growing Companies", href: "#clients" },
  ];

  return (
    <footer className="w-full bg-slate-950 text-white pt-24 pb-12 z-10 relative overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eeba00] via-[#e46e00] to-[#8db5f3]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-zinc-800/80 pb-12">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-3xl md:text-5xl font-noto-serif font-light text-white leading-tight">
              Ready to grow with Atlas?
            </h2>
            <div className="text-lg md:text-xl font-unbounded font-semibold text-amber-400">
              Reach us at{` `}
              <a href="mailto:hello@atlasdigitalgroup.com" className="hover:text-white transition-colors">
                hello@atlasdigitalgroup.com
              </a>
            </div>
            <p className="text-slate-500 font-barlow text-xs leading-relaxed max-w-md">
              We respect your privacy and only use your contact details to plan your project, share relevant advice and support your business growth.
            </p>
          </div>

          <div className="lg:col-span-6 w-full">
            <div className="bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-700/80 space-y-4">
              <h4 className="font-unbounded font-bold text-xs uppercase text-slate-400 tracking-wider">
                BOOK A CONSULTATION
              </h4>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[48px] bg-slate-900 border border-slate-700 rounded-full px-6 py-3 text-white font-barlow text-sm focus:outline-none focus:border-amber-400 transition-colors pr-14"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-[#eeba00] flex items-center justify-center text-[#010b0c] hover:bg-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-800/80">
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-unbounded font-bold text-[#eeba00] text-xs uppercase tracking-widest">
              NAVIGATION
            </h5>
            <div className="grid grid-cols-2 gap-2">
              <Link href="#home" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Home
              </Link>
              <Link href="#about" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                About
              </Link>
              <Link href="#services" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Services
              </Link>
              <Link href="#portfolio" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Portfolio
              </Link>
              <Link href="#blog" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Blog
              </Link>
              <Link href="#contact" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Contact
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-unbounded font-bold text-[#eeba00] text-xs uppercase tracking-widest">
              SERVICES
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {serviceLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors text-sm font-light font-barlow"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-unbounded font-bold text-[#eeba00] text-xs uppercase tracking-widest">
              TARGET CLIENTS
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {clientLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors text-sm font-light font-barlow"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 gap-4 text-slate-500 text-xs font-light">
          <div>
            © 2026 Atlas Digital Group. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              LinkedIn
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Instagram
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
