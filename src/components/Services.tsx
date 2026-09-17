"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Code2, PieChart, PenTool, Zap, Users, Video } from "lucide-react";

const serviceCards = [
  {
    title: "Website Design & Development",
    category: "Web Design & Development",
    desc: "Launch a high-converting website built for speed, lead capture, and measurable growth.",
    icon: Code2,
    href: "#contact",
  },
  {
    title: "E-commerce Store Development",
    category: "Web Design & Development",
    desc: "Custom e-commerce experiences that turn visitors into repeat customers.",
    icon: PieChart,
    href: "#contact",
  },
  {
    title: "SEO & Paid Ads",
    category: "Digital Marketing",
    desc: "Drive qualified traffic with SEO, Google Ads, Facebook, Instagram and TikTok campaigns.",
    icon: Zap,
    href: "#contact",
  },
  {
    title: "Content, Copy & Branding",
    category: "Branding & Content",
    desc: "Position your brand with compelling creative, copy and marketing collateral.",
    icon: PenTool,
    href: "#contact",
  },
  {
    title: "AI & Automation",
    category: "Automation Solutions",
    desc: "Streamline sales, support and operations with chatbots, CRM workflows and automation.",
    icon: Zap,
    href: "#contact",
  },
  {
    title: "Virtual Assistant Services",
    category: "Virtual Assistant Services",
    desc: "Free your time with email, calendar, admin and customer support handled by experts.",
    icon: Users,
    href: "#contact",
  },
  {
    title: "Video Production",
    category: "Video Production",
    desc: "Create short-form video, editing and content for social media, YouTube and ads.",
    icon: Video,
    href: "#contact",
  },
  {
    title: "Growth Consulting",
    category: "Growth Consulting",
    desc: "Align strategy, sales and digital growth with a clear plan to scale revenue.",
    icon: PieChart,
    href: "#contact",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-slate-950 text-atlas-cream py-24 overflow-hidden z-10">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square max-w-[1400px] rounded-full bg-gradient-to-tr from-atlas-gold/15 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-noto-serif font-light text-4xl md:text-5xl text-atlas-cream"
          >
            High-impact services for every stage of growth
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-unbounded font-black tracking-tight text-atlas-cream uppercase mt-2"
          >
            DIGITAL GROWTH SERVICES
          </motion.div>
          <motion.h6
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs font-unbounded text-atlas-gold font-bold tracking-[0.2em] uppercase mt-6"
          >
            BUILD, MARKET, AUTOMATE, SUPPORT
          </motion.h6>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-700/80 hover:border-atlas-gold/50 transition-all flex flex-col justify-between min-h-[320px] cursor-pointer"
              >
                <Link href={service.href} className="flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-full bg-atlas-gold/10 text-atlas-gold p-3">
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="text-slate-500 group-hover:text-atlas-gold transition-colors">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div>
                      <p className="text-atlas-gold text-xs uppercase tracking-[0.2em] font-unbounded font-bold">
                        {service.category}
                      </p>
                      <h4 className="font-unbounded font-bold text-xl text-atlas-cream group-hover:text-atlas-gold transition-colors mt-3">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-slate-400 font-barlow text-sm leading-relaxed font-light">
                      {service.desc}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-atlas-gold uppercase tracking-[0.15em]">
                    Learn more
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
