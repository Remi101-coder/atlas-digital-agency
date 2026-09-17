"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { contactDetails, socialLinks } from "@/lib/contact-links";
import SocialIcon from "@/components/SocialIcon";

export default function Footer() {
  const serviceLinks = [
    { name: "Web Development", href: "#services" },
    { name: "SEO & Ads", href: "#services" },
    { name: "Content & Branding", href: "#services" },
    { name: "Automation", href: "#services" },
    { name: "Virtual Assistants", href: "#services" },
    { name: "Video Production", href: "#services" },
    { name: "Growth Consulting", href: "#services" },
  ];

  return (
    <footer className="w-full bg-slate-950 text-white pt-24 pb-12 z-10 relative overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eeba00] via-[#e46e00] to-[#8db5f3]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-zinc-800/80 pb-12">
          <div className="lg:col-span-12 space-y-4">
            <div className="text-lg md:text-xl font-unbounded font-semibold text-atlas-gold">
              Reach us at{` `}
              <a href={`mailto:${contactDetails.email}`} className="hover:text-white transition-colors">
                {contactDetails.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <a href={contactDetails.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-atlas-gold"><Phone className="h-4 w-4" />{contactDetails.phone}</a>
              <a href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-atlas-gold"><MessageCircle className="h-4 w-4" />WhatsApp</a>
            </div>
            <a href={`mailto:${contactDetails.privacyEmail}`} className="block text-xs text-slate-500 hover:text-atlas-gold transition-colors">
              Privacy: {contactDetails.privacyEmail}
            </a>
            <p className="text-slate-500 font-barlow text-xs leading-relaxed max-w-md">
              We respect your privacy and only use your contact details to plan your project, share relevant advice and support your business growth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-12 border-b border-zinc-800/80">
          <div className="space-y-4">
            <h5 className="font-unbounded font-bold text-[#eeba00] text-xs uppercase tracking-widest">
              NAVIGATION
            </h5>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Home
              </Link>
              <Link href="#about" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                About
              </Link>
              <Link href="#services" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Services
              </Link>
              <Link href="#contact" className="text-slate-400 hover:text-white transition-colors text-sm font-light font-barlow">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
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
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 gap-4 text-slate-500 text-xs font-light">
          <div>
            © 2026 Atlas Digital Group. All rights reserved. · VAT No: 524398671 · Company No: 17321140
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => {
              return (
                <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Atlas Digital Group on ${social.name}`} title={social.name} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-atlas-gold hover:text-atlas-gold">
                  <SocialIcon name={social.name} className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-600 font-light">
          ATLAS DIGITAL GROUP LTD — Company No. 17321140 — VAT GB524398671 — 19 Abigail House, 1 Richards Close, Harrow, England, HA1 2BX
        </div>
      </div>
    </footer>
  );
}
