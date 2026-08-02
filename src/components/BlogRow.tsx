"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogRow() {
  const mainPost = {
    title: "How to Build a Growth Website That Converts in 30 Days",
    author: "Atlas Digital Group",
    date: "02 Jun 2026",
    img: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=600&h=400",
    href: "#",
  };

  const smallPosts = [
    {
      title: "How automation doubled a lead pipeline for a B2B consultancy",
      author: "Atlas Digital Group",
      date: "28 May 2026",
      img: "https://images.unsplash.com/photo-1521737711867-e3b9047d7a86?auto=format&fit=crop&q=80&w=400&h=300",
      href: "#",
    },
    {
      title: "The new rules of digital discovery for service businesses",
      author: "Atlas Digital Group",
      date: "20 May 2026",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=300",
      href: "#",
    },
  ];

  return (
    <section className="w-full bg-[#f4f8fe] text-rich-black py-24 z-10 relative overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Category Subtitle */}
        <div className="mb-12 text-center lg:text-left">
          <Link
            href="#"
            className="text-xs font-unbounded text-[#e46e00] font-bold tracking-[0.25em] hover:text-rich-black transition-colors uppercase"
          >
            OUR BLOG
          </Link>
        </div>

        {/* Blog items layout columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main post on Left (Spans 6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 group cursor-pointer flex flex-col justify-between h-full space-y-4"
          >
            <Link href={mainPost.href} className="block space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-lg aspect-video border border-zinc-200 bg-zinc-950">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src={mainPost.img}
                  alt={mainPost.title}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-unbounded font-bold text-xl md:text-2xl text-rich-black group-hover:text-[#eeba00] transition-colors leading-tight">
                  {mainPost.title}
                </h3>
                <div className="text-zinc-500 font-barlow text-sm font-light">
                  {mainPost.author} • {mainPost.date}
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Small posts on Right (Spans 3 each) */}
          {smallPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (index + 1) * 0.1 }}
              className="lg:col-span-3 group cursor-pointer flex flex-col justify-between h-full space-y-4"
            >
              <Link href={post.href} className="block space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg aspect-[4/3] border border-zinc-200 bg-zinc-950">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-unbounded font-bold text-sm md:text-base text-rich-black group-hover:text-[#eeba00] transition-colors leading-snug line-clamp-3">
                    {post.title}
                  </h4>
                  <div className="text-zinc-500 font-barlow text-xs font-light">
                    {post.author} • {post.date}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
