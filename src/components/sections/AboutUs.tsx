"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/ui/magnetic-button";
import Image from "next/image";
import {
  IconBulb,
  IconChartLine,
  IconHeartHandshake,
} from "@tabler/icons-react";

const words = [
  '"We\'re',
  "more",
  "than",
  "marketers—",
  "we're",
  "growth",
  "partners.",
  "Our",
  "proven",
  "systems",
  "combine",
  "strategy,",
  "digital",
  "content,",
  "and",
  "artificial",
  "intelligence",
  "to",
  "deliver",
  "real",
  "results",
  "for",
  "ambitious",
  'businesses."',
];

const differentiators = [
  { title: "Custom Strategies", description: "Tailored for your business" },
  { title: "No Contracts", description: "Month-to-month flexibility" },
  { title: "Dedicated Support", description: "Your success is our priority" },
];

const features = [
  {
    icon: IconBulb,
    title: "Innovation",
    description: "Cutting-edge AI and automation",
  },
  {
    icon: IconChartLine,
    title: "Results",
    description: "Data-driven growth strategies",
  },
  {
    icon: IconHeartHandshake,
    title: "Partnership",
    description: "Dedicated support & guidance",
  },
];

// Array of marketing themed Unsplash images
const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    alt: "Digital marketing analytics",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    alt: "Creative team meeting",
  },
  {
    src: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    alt: "Marketing strategy session",
  },
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    alt: "Modern office workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    alt: "Business presentation",
  },
];


export default function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about-us"
      className="relative pt-16 pb-32 px-4 overflow-hidden bg-[#0a0a0a]"
      ref={ref}
    >
      {/* Top fade gradient to blend with hero section */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)",
        }}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold gradient orb - left */}
        <div
          className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(213, 179, 103, 0.3) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(213, 179, 103, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(213, 179, 103, 0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge>Who We Are</Badge>
        </motion.div>

        {/* Main content - Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image with decorative elements */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Main image container with carousel */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                {/* Gold gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#d5b367]/20 to-transparent z-10" />

                {/* Animated image carousel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={carouselImages[currentImageIndex].src}
                      alt={carouselImages[currentImageIndex].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentImageIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? "bg-[#d5b367] w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative corner accent - top right */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#d5b367]/40 rounded-tr-3xl" />

              {/* Decorative corner accent - bottom left */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#d5b367]/40 rounded-bl-3xl" />

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 bg-[#d5b367] text-[#161616] px-6 py-4 rounded-2xl shadow-2xl z-20"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <p className="text-xl font-bold">Growth Partners</p>
                <p className="text-sm font-medium">For Your Business</p>
              </motion.div>

              {/* Decorative dots pattern */}
              <div className="absolute -top-8 -left-8 grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#d5b367]/30"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Animated text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 leading-relaxed">
                {words.map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : {}
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + idx * 0.04,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            {/* Key Differentiators */}
            <motion.div
              className="grid grid-cols-3 gap-4 py-8 border-y border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {differentiators.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-base md:text-lg font-semibold text-[#d5b367] mb-1">
                    {item.title}
                  </div>
                  <p className="text-xs md:text-sm text-white/50">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="group p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#d5b367]/30 transition-all duration-300 text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#d5b367]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#d5b367]/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-[#d5b367]" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-white/50">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <MagneticButton variant="secondary" href="#services">
                Explore Our Services
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
