"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Code2, PieChart, PenTool, Zap, Users, Video } from "lucide-react";

const serviceCards = [
  {
    title: "Website Design & Development",
    category: "Web Design & Development",
    desc: "We design and build fast, responsive websites that make it easy for customers to understand your offer and take action. Every project is shaped around your goals, audience and day-to-day operations, with clear structure, mobile usability, accessibility and reliable performance. From a focused landing page to a complete business website, we create a platform that can grow with you, with ongoing support and improvements available after launch.",
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
    desc: "We help businesses become easier to find and turn search demand into qualified enquiries, through technical SEO, local search, content planning, Google Ads and campaign tracking. We choose channels according to commercial intent rather than chasing traffic for its own sake, with clear reporting on where leads come from and which activity deserves more budget.",
    icon: Zap,
    href: "#contact",
  },
  {
    title: "Content, Copy & Branding",
    category: "Branding & Content",
    desc: "We create the words, visuals and brand systems that make a business recognisable and credible, from messaging and website copy to identity development, social content and campaign assets. We begin with the audience and the decision you want them to make, so people understand what you offer and why they should trust you.",
    icon: PenTool,
    href: "#contact",
  },
  {
    title: "AI & Automation",
    category: "Automation Solutions",
    desc: "We connect everyday tools and automate repetitive work so your team spends less time copying information and chasing routine tasks — lead routing, enquiry responses, booking workflows, document creation, reporting and CRM updates. Each workflow is designed around your existing process, with human approval where judgement is needed, for measurable time saved without losing control of the customer experience.",
    icon: Zap,
    href: "#contact",
  },
  {
    title: "Virtual Assistant Services",
    category: "Virtual Assistant Services",
    desc: "We provide flexible remote support for the administrative and customer-facing work that keeps a business moving — inboxes, scheduling, research, data entry, follow-ups and routine client communication. Responsibilities and approval limits are agreed before work begins, and support can scale up or down as the workload changes.",
    icon: Users,
    href: "#contact",
  },
  {
    title: "Video Production",
    category: "Video Production",
    desc: "We plan and produce video content for websites, advertising, social media and company communications — promotional films, interviews, explainers, short-form content and edited campaign assets. We shape the concept around the platform, audience and business goal before filming or editing begins, so storytelling and pacing come first.",
    icon: Video,
    href: "#contact",
  },
  {
    title: "Growth Consulting",
    category: "Growth Consulting",
    desc: "We help business owners identify the digital work most likely to improve revenue, efficiency or customer acquisition, combining commercial priorities with evidence from websites, campaigns, sales activity and internal workflows. We turn broad ambitions into a focused plan with a clear order, ownership and measures of success, and can support implementation so the plan does not remain a document.",
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
