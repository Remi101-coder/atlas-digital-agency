"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Sectors() {
  const sectors = [
    {
      title: "Ecommerce",
      desc: "In the fast-paced world of ecommerce, supercharge digital marketing sales and traffic with data-driven strategy, creative powered by AI, and real-time performance insight.",
      href: "#",
      // Generic beautiful unspash tech/shopping images to simulate original theme
      img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600&h=400",
      alignLeft: true,
    },
    {
      title: "Travel",
      desc: "Transform how travellers discover, plan, and book. We combine AI-powered strategy, creative, and search to drive visibility, loyalty, and direct conversions.",
      href: "#",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600&h=400",
      alignLeft: false,
    },
    {
      title: "Hospitality",
      desc: "Be where your guests are searching. We optimise your presence across search, social, and AI platforms to drive direct bookings and reduce reliance on OTAs.",
      href: "#",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600&h=400",
      alignLeft: true,
    },
    {
      title: "B2B",
      desc: "As a digital marketing agency with proven B2B expertise, we deliver smart strategy, performance-driven solutions, and measurable growth across complex customer journeys.",
      href: "#",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=400",
      alignLeft: false,
    },
    {
      title: "Financial & Professional",
      desc: "Digital strategy that simplifies complexity, builds trust, and delivers intelligent, compliant growth at scale.",
      href: "#",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400",
      alignLeft: true,
    },
  ];

  return (
    <section className="w-full bg-[#f4f8fe] text-rich-black py-24 z-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Title */}
        <div className="mb-16">
          <motion.h6
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-unbounded text-[#e46e00] font-bold tracking-[0.25em] uppercase mb-4"
          >
            SECTORS
          </motion.h6>
        </div>

        {/* Sectors Column list */}
        <div className="space-y-24">
          {sectors.map((sector, idx) => (
            <div
              key={sector.title}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                sector.alignLeft ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image Box */}
              <motion.div
                initial={{ opacity: 0, x: sector.alignLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 rounded-3xl overflow-hidden aspect-video shadow-lg relative border border-zinc-200"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={sector.img}
                  alt={`${sector.title} sectors`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Copy Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <h3 className="font-unbounded font-bold text-3xl md:text-4xl text-rich-black leading-tight">
                  {sector.title}
                </h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                  {sector.desc}
                </p>
                <div>
                  <Link
                    href={sector.href}
                    className="inline-flex items-center justify-center px-8 py-3 bg-slate-950 text-white font-bold rounded-full text-xs hover:bg-amber-400 hover:text-slate-950 transition-all uppercase tracking-wider font-unbounded"
                  >
                    Learn more
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
