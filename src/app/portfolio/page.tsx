import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio | Atlas Digital Group",
  description: "See how Atlas Digital Group helps businesses grow — starting with MotiveX Recruitment Ltd.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-atlas-cream">
      <Navbar />

      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-unbounded uppercase tracking-[0.35em] text-atlas-gold">Our Work</p>
          <h1 className="mt-4 font-noto-serif text-4xl md:text-5xl text-atlas-cream">Portfolio</h1>
          <p className="mt-4 font-barlow text-slate-400">
            A growing list of businesses we&apos;ve helped scale. Here&apos;s our first project.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
            {/* Screenshot placeholder — swap this div for an <img> once the client site is live */}
            <div className="flex aspect-video w-full items-center justify-center bg-slate-800/80 text-sm text-slate-500">
              Website preview coming soon
            </div>
            <div className="p-8">
              <span className="text-xs font-unbounded uppercase tracking-[0.25em] text-atlas-gold">
                Website
              </span>
              <h2 className="mt-3 font-unbounded text-2xl font-bold text-atlas-cream">
                MotiveX Recruitment Ltd
              </h2>
              <p className="mt-3 text-slate-400 leading-relaxed">
                A new website and digital growth engine for MotiveX, a recruitment agency looking to
                modernise its online presence and generate a consistent stream of qualified leads.
              </p>
              <a
                href="https://motivex.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-atlas-gold/40 px-6 py-2.5 text-sm font-bold text-atlas-gold uppercase tracking-[0.15em] hover:border-atlas-gold hover:bg-atlas-gold/10 transition-colors"
              >
                Visit motivex.co.uk
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-atlas-gold px-8 py-3.5 text-sm font-bold text-slate-950 uppercase tracking-[0.2em] hover:bg-atlas-gold-light transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
