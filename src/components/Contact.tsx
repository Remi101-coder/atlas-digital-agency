"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { contactDetails, socialLinks } from "@/lib/contact-links";
import SocialIcon from "@/components/SocialIcon";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      "New Atlas Digital Group enquiry",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Company: ${formData.company || "Not provided"}`,
      "",
      "Project details:",
      formData.message || "Not provided",
    ].join("\n");
    window.location.href = `https://wa.me/447355890373?text=${encodeURIComponent(message)}`;
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
                <strong className="text-white">Email:</strong>{" "}
                <a href={`mailto:${contactDetails.email}`} className="transition-colors hover:text-amber-400">{contactDetails.email}</a>
              </div>
              <div>
                <strong className="text-white">Phone:</strong>{" "}
                <a href="tel:" className="transition-colors hover:text-amber-400">+XX XXX XXX XXXX</a>
              </div>
              <div>
                <strong className="text-white">Location:</strong> Remote-first agency serving businesses worldwide
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((social) => {
                  return <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Atlas Digital Group on ${social.name}`} title={social.name} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-amber-400 hover:text-amber-400"><SocialIcon name={social.name} className="h-4 w-4" /></a>;
                })}
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
          <div className="lg:col-span-7 rounded-3xl border border-slate-700 bg-slate-900/40 p-5 text-slate-300">
            <p className="mb-4 text-xs font-unbounded uppercase tracking-[0.2em] text-amber-400">Connect with Atlas</p>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${contactDetails.email}`} className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm transition-colors hover:border-amber-400 hover:text-amber-400"><Mail className="h-4 w-4" />Email</a>
              <a href={contactDetails.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm transition-colors hover:border-amber-400 hover:text-amber-400"><Phone className="h-4 w-4" />Call</a>
              <a href={contactDetails.whatsappHref} className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm transition-colors hover:border-amber-400 hover:text-amber-400"><MessageCircle className="h-4 w-4" />WhatsApp</a>
              {socialLinks.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`Atlas Digital Group on ${social.name}`} className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm transition-colors hover:border-amber-400 hover:text-amber-400"><SocialIcon name={social.name} className="h-4 w-4" />{social.name}</a>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
