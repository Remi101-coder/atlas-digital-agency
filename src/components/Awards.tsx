"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Awards() {
  const trustCards = [
    {
      title: "97% client retention",
      desc: "Our clients stay with us because we deliver reliable growth and responsive support.",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=300&h=200",
    },
    {
      title: "150+ projects launched",
      desc: "From websites to automation systems, every project is built with measurable business impact.",
      img: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&q=80&w=300&h=200",
    },
    {
      title: "Global growth support",
      desc: "Serving startups, ecommerce brands, consultants and local businesses around the world.",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=300&h=200",
    },
  ];

  return (
    <section className="w-full bg-slate-950 text-white py-24 z-10 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-noto-serif font-light text-3xl md:text-5xl text-white"
          >
            Trusted by growth teams around the world
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-6xl font-unbounded font-black tracking-tight text-white uppercase mt-2"
          >
            AWARDS &amp; IMPACT
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {trustCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-700 flex flex-col h-full group cursor-pointer hover:border-amber-400/40 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors z-10" />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <h3 className="font-unbounded font-bold text-sm md:text-base text-amber-400 tracking-wide leading-snug">
                  {card.title}
                </h3>
                <p className="text-slate-300 font-barlow text-sm font-light">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-zinc-800/80 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <blockquote className="text-slate-200 font-barlow text-xl md:text-3xl font-light italic leading-relaxed !m-0 !p-0">
                “Atlas helped us move from scattered campaigns to a unified growth engine. The new website, automation setup, and campaign strategy delivered a consistent stream of better leads and more time back for our team.”
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 space-y-3 lg:border-l lg:border-zinc-800 lg:pl-8"
            >
              <div className="font-unbounded font-semibold text-amber-400 text-sm uppercase tracking-wider">
                Sarah Lin
              </div>
              <div className="text-slate-400 font-barlow text-xs uppercase tracking-widest">
                Founder, Growth Catalyst Studio
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
