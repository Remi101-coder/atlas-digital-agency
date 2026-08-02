"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface Service {
  name: string;
  href: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  categoryHref: string;
  services: Service[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "websites",
    title: "Website Solutions",
    categoryHref: "/services/website-solutions",
    services: [
      { name: "Website Design & Development", href: "/services/website-solutions" },
      { name: "E-commerce Store Development", href: "/services/website-solutions" },
      { name: "Landing Page Creation", href: "/services/website-solutions" },
      { name: "Website Maintenance & Support", href: "/services/website-solutions" },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    categoryHref: "/services/digital-marketing",
    services: [
      { name: "Search Engine Optimization (SEO)", href: "/services/digital-marketing" },
      { name: "Google Ads Management", href: "/services/digital-marketing" },
      { name: "Facebook & Instagram Advertising", href: "/services/digital-marketing" },
      { name: "TikTok Advertising", href: "/services/digital-marketing" },
      { name: "Social Media Management", href: "/services/digital-marketing" },
      { name: "Lead Generation & Business Growth Solutions", href: "/services/digital-marketing" },
    ],
  },
  {
    id: "content",
    title: "Content & Creative",
    categoryHref: "/services/content-creative",
    services: [
      { name: "Content Creation & Copywriting", href: "/services/content-creative" },
      { name: "Blog Writing & SEO Content", href: "/services/content-creative" },
      { name: "Graphic Design & Branding", href: "/services/content-creative" },
      { name: "Logo Design", href: "/services/content-creative" },
      { name: "Marketing Materials Design", href: "/services/content-creative" },
      { name: "Video Editing", href: "/services/content-creative" },
      { name: "Social Media Video Production", href: "/services/content-creative" },
      { name: "YouTube & TikTok Content Editing", href: "/services/content-creative" },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    categoryHref: "/services/ai-automation",
    services: [
      { name: "AI Chatbots & Customer Support Automation", href: "/services/ai-automation" },
      { name: "Business Process Automation", href: "/services/ai-automation" },
      { name: "CRM Integration & Automation", href: "/services/ai-automation" },
    ],
  },
  {
    id: "virtual",
    title: "Virtual Assistance",
    categoryHref: "/services/virtual-assistance",
    services: [
      { name: "Virtual Assistant Services", href: "/services/virtual-assistance" },
      { name: "Email & Calendar Management", href: "/services/virtual-assistance" },
      { name: "Data Entry & Administrative Support", href: "/services/virtual-assistance" },
      { name: "Customer Service Support", href: "/services/virtual-assistance" },
      { name: "Appointment Scheduling", href: "/services/virtual-assistance" },
    ],
  },
  {
    id: "consulting",
    title: "Consulting",
    categoryHref: "/services/consulting",
    services: [{ name: "Digital Marketing Consulting", href: "/services/consulting" }],
  },
];

// ─── Desktop: flat panel matching Found.co.uk layout ────────────────────────

function ServiceCategoryColumn({
  category,
  onServiceClick,
}: {
  category: ServiceCategory;
  onServiceClick?: () => void;
}) {
  return (
    <div className="flex flex-col">
      {/* Category heading — bold, dark, clickable */}
      <Link
        href={category.categoryHref}
        onClick={onServiceClick}
        className="text-sm font-bold text-gray-900 mb-5 tracking-normal hover:text-amber-600 transition-colors"
      >
        {category.title}
      </Link>
      <ul className="space-y-3.5">
        {category.services.map((service) => (
          <li key={service.name}>
            <Link
              href={service.href}
              onClick={onServiceClick}
              className="
                text-sm
                text-gray-700
                font-normal
                leading-snug
                hover:text-amber-600
                transition-colors
                duration-150
              "
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesktopMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      // ↓ Full-width flat white panel, no rounded corners, no shadow card
      className="absolute top-full left-0 w-full bg-white border-b border-gray-200 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-16 py-10">
        {/* "Services" eyebrow label — matches Found's top-left label */}
        <p className="text-sm font-bold text-gray-900 mb-8">Services</p>

        {/* 6-column grid — one column per category */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-6
            gap-x-8
            gap-y-8
          "
        >
          {SERVICES_DATA.map((category) => (
            <ServiceCategoryColumn
              key={category.id}
              category={category}
              onServiceClick={onClose}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile: accordion (unchanged logic, updated styling) ────────────────────

function MobileAccordion({
  category,
  isOpen,
  onToggle,
}: {
  category: ServiceCategory;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-gray-900 text-sm">{category.title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-3 space-y-3">
              {category.services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="block text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMegaMenu({ onClose }: { onClose: () => void }) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set([SERVICES_DATA[0].id])
  );

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 py-2">
        {SERVICES_DATA.map((category) => (
          <MobileAccordion
            key={category.id}
            category={category}
            isOpen={openCategories.has(category.id)}
            onToggle={() => toggleCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServicesMegaMenu({ isOpen, onClose }: ServicesMegaMenuProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (isMobile ? (
        <MobileMegaMenu onClose={onClose} />
      ) : (
        <DesktopMegaMenu onClose={onClose} />
      ))}
    </AnimatePresence>
  );
}