"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  IconTargetArrow,
  IconChartBar,
  IconUsers,
  IconClock,
  IconShieldCheck,
  IconArrowRight,
} from "@tabler/icons-react";

const benefits = [
  {
    icon: IconTargetArrow,
    badge: "Leads",
    title: "Intent-Verified Leads",
    description:
      "Get connected with prospects who are actively looking for your services, not cold contacts.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=90",
    accentColor: "#d5b367",
    tags: ["Buyer Leads", "Seller Leads", "Investor Leads"],
  },
  {
    icon: IconShieldCheck,
    badge: "Quality",
    title: "Human-Verified Leads",
    description:
      "Every lead is personally verified by our team to ensure you only connect with genuine prospects.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=90",
    accentColor: "#4a7c59",
    tags: ["Manual Review", "Quality Assured", "Real Prospects"],
  },
  {
    icon: IconChartBar,
    badge: "Analytics",
    title: "Data-Driven Results",
    description:
      "Track every metric that matters with comprehensive analytics and reporting dashboards.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90",
    accentColor: "#4a6fa5",
    tags: ["ROI Tracking", "Lead Scoring", "Performance"],
  },
  {
    icon: IconUsers,
    badge: "Support",
    title: "Dedicated Support",
    description:
      "Work with a dedicated team that understands your business and helps you succeed.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=90",
    accentColor: "#8b7355",
    tags: ["Account Manager", "Strategy Calls", "Priority Support"],
  },
  {
    icon: IconClock,
    badge: "Efficiency",
    title: "Save Time",
    description:
      "Automate repetitive tasks and focus on what matters most - building relationships and closing deals.",
    image: "https://images.unsplash.com/photo-1504607798333-52a30db54a5d?w=1200&q=90",
    accentColor: "#6b5b7a",
    tags: ["Task Automation", "Smart Scheduling", "Quick Setup"],
  },
  {
    icon: IconShieldCheck,
    badge: "Trust",
    title: "Proven Systems",
    description:
      "Leverage battle-tested marketing strategies that have helped hundreds of agents succeed.",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&q=90",
    accentColor: "#4a7a7a",
    tags: ["Case Studies", "Testimonials", "Certifications"],
  },
];

// Individual card component with scroll-linked animation
function BenefitCard({
  benefit,
  idx,
  scrollYProgress,
}: {
  benefit: (typeof benefits)[0];
  idx: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const totalCards = benefits.length;

  // Each card animates during the PREVIOUS card's scroll segment
  const segmentSize = 1 / totalCards;
  const animationStart = (idx - 1) * segmentSize;
  const animationEnd = idx * segmentSize;

  // Y position: smooth slide from bottom to top
  const y = useTransform(
    scrollYProgress,
    [animationStart, animationEnd],
    ["100%", "0%"],
    { ease: (t) => 1 - Math.pow(1 - t, 3) } // Cubic ease out for smooth animation
  );

  const yValue = idx === 0 ? "0%" : y;

  return (
    <motion.div
      className="absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
      style={{
        y: yValue,
        zIndex: idx + 1,
      }}
    >
      {/* Card Container - 80% width, 100% height */}
      <div className="relative w-[80%] h-full flex items-center pt-20 pb-8">
        {/* Inner Card with rounded corners - full height */}
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden flex"
          style={{
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px ${benefit.accentColor}20`,
          }}
        >
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 h-full bg-[#0f0f0f] p-8 md:p-12 lg:p-14 flex flex-col justify-center relative">
            {/* Accent gradient background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at top left, ${benefit.accentColor}40 0%, transparent 50%)`,
              }}
            />

            <div className="relative z-10">
              {/* Category Badge */}
              <div>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border"
                  style={{
                    backgroundColor: `${benefit.accentColor}20`,
                    color: benefit.accentColor,
                    borderColor: `${benefit.accentColor}40`,
                  }}
                >
                  <benefit.icon className="w-4 h-4" />
                  {benefit.badge}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {benefit.title}
              </h2>

              {/* Description */}
              <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed">
                {benefit.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {benefit.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3 py-1.5 rounded-full text-sm text-white/70 border border-white/10"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: benefit.accentColor,
                    color: "#161616",
                  }}
                >
                  Get Started
                  <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card Number - Bottom Left */}
            <div className="absolute bottom-6 left-8 md:left-12 lg:left-14">
              <span
                className="text-7xl md:text-8xl font-bold opacity-20"
                style={{ color: benefit.accentColor }}
              >
                0{idx + 1}
              </span>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:block w-1/2 h-full relative">
            <Image
              src={benefit.image}
              alt={benefit.title}
              fill
              className="object-cover"
              sizes="50vw"
              priority={idx <= 1}
            />
            {/* Subtle overlay for better blending */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, #1a1a1a 0%, transparent 20%), linear-gradient(135deg, ${benefit.accentColor}10 0%, transparent 50%)`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Badge animation - stays visible and pulses subtly
  const badgeScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [1, 1.05, 1.05, 1]
  );

  return (
    <section
      id="benefits"
      ref={containerRef}
      className="relative bg-[#0a0a0a]"
      style={{ height: `${benefits.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Badge at top - outside card stack, with animation */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 z-50"
          style={{ scale: badgeScale }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge>Why Choose Us</Badge>
        </motion.div>

        {/* Full-width card stack */}
        <div className="relative h-full w-full">
          {benefits.map((benefit, idx) => (
            <BenefitCard
              key={idx}
              benefit={benefit}
              idx={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
