import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import BrandsCarousel from "@/components/BrandsCarousel";
import SearchChanged from "@/components/SearchChanged";
import Automation from "@/components/Automation";
import About from "@/components/About";
import Luminr from "@/components/Luminr";
import Services from "@/components/Services";
import Sectors from "@/components/Sectors";
import CaseStudies from "@/components/CaseStudies";
import Contact from "@/components/Contact";
import Awards from "@/components/Awards";
import TeamPhoto from "@/components/TeamPhoto";
import BlogRow from "@/components/BlogRow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative w-full bg-white">
      {/* Header Navigation */}
      <Navbar />

      {/* Hero Header video & overlay */}
      <Hero />

      {/* Intro details with awards mini cards */}
      <Intro />

      {/* Brands logo continuous loop */}
      <BrandsCarousel />

      {/* Search statistics section */}
      <SearchChanged />

      {/* Automation that saves time */}
      <Automation />

      {/* About section - why choose us */}
      <About />

      {/* Luminr dashboard showcase details */}
      <Luminr />

      {/* 14 services catalog lists */}
      <Services />

      {/* Sectors list layout */}
      <Sectors />

      {/* Case studies details card */}
      <CaseStudies />

      {/* Contact section for growth consultation */}
      <Contact />

      {/* Awards grids list & testimonial */}
      <Awards />

      {/* Great humans team backdrop */}
      <TeamPhoto />

      {/* Recent blog grid */}
      <BlogRow />

      {/* Footers signups & maps */}
      <Footer />
    </main>
  );
}
