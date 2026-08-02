"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for reaching out! We will contact you shortly.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="w-full bg-slate-950 text-white py-24 z-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-noto-serif font-light text-4xl md:text-6xl leading-tight"
            >
              Let&apos;s Grow Your Business
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed"
            >
              Book a free consultation with our growth experts, and discover how Atlas Digital Group can turn your website, marketing and operations into measurable revenue engines.
            </motion.p>
            <div className="space-y-4 text-sm text-slate-400 font-light">
              <div>
                <strong className="text-white">Email:</strong> hello@atlasdigitalgroup.com
              </div>
              <div>
                <strong className="text-white">Phone:</strong> +1 (800) 123-4567
              </div>
              <div>
                <strong className="text-white">Location:</strong> Remote-first agency serving businesses worldwide
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-slate-900/40 border border-slate-700 rounded-3xl p-6 md:p-10 shadow-2xl"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-slate-400 text-xs uppercase tracking-[0.2em] font-unbounded">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-zinc-700 bg-[#020405] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#eeba00]"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-slate-400 text-xs uppercase tracking-[0.2em] font-unbounded">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-3xl border border-zinc-700 bg-[#020405] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#eeba00]"
                  placeholder="your@email.com"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-slate-400 text-xs uppercase tracking-[0.2em] font-unbounded">Company</span>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-3xl border border-zinc-700 bg-[#020405] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#eeba00]"
                  placeholder="Business name"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-slate-400 text-xs uppercase tracking-[0.2em] font-unbounded">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="mt-2 w-full rounded-3xl border border-zinc-700 bg-[#020405] px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#eeba00]"
                  placeholder="Tell us about your project"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#eeba00] px-8 py-4 text-sm font-bold text-[#010b0c] uppercase tracking-[0.2em] hover:bg-white transition-all"
            >
              Book A Free Consultation
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
