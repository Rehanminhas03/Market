"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/ui/magnetic-button";
import siteConfig from "@/config/site.json";
import Image from "next/image";

// Partner logos for the marquee
const partnerLogos = [
  { name: "Partner 1", logo: "/logos/1.png", scale: 1, keepColor: false },
  { name: "Partner 2", logo: "/logos/2.png", scale: 1, keepColor: false },
  { name: "Partner 3", logo: "/logos/33.png", scale: 1, keepColor: true },
  { name: "Partner 4", logo: "/logos/4.png", scale: 1, keepColor: false },
  { name: "Partner 5", logo: "/logos/5.png", scale: 1, keepColor: false },
  { name: "Partner 6", logo: "/logos/6.png", scale: 1.1, keepColor: false },
  { name: "Partner 7", logo: "/logos/7.png", scale: 1.2, keepColor: false },
  { name: "Partner 8", logo: "/logos/8.png", scale: 1, keepColor: false },
  { name: "Partner 9", logo: "/logos/9.png", scale: 1.1, keepColor: false },
  { name: "Partner 10", logo: "/logos/10.png", scale: 1.3, keepColor: false },
  { name: "Partner 11", logo: "/logos/11.png", scale: 1.3, keepColor: false },
  { name: "Partner 12", logo: "/logos/12.png", scale: 1.1, keepColor: false },
  { name: "Partner 13", logo: "/logos/13.png", scale: 1, keepColor: false },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background with diagonal image */}
      <div className="absolute inset-0">
        {/* Dark background base */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Diagonal Image Container */}
        <motion.div
          className="absolute top-0 right-0 w-[65%] h-full origin-top-right"
          style={{ scale: imageScale, y: imageY }}
        >
          {/* Diagonal clip path */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            {/* Image */}
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
              alt="Modern Architecture"
              fill
              className="object-cover"
              priority
              sizes="65vw"
            />
            {/* Dark overlay on image */}
            <div className="absolute inset-0 bg-[#0a0a0a]/40" />
            {/* Gold tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d5b367]/10 via-transparent to-transparent mix-blend-overlay" />
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-[35%] w-px h-full bg-gradient-to-b from-transparent via-[#d5b367]/20 to-transparent" />

        {/* Subtle colorful ambient blobs */}
        <div className="absolute top-1/4 left-[10%] w-[300px] h-[300px] rounded-full bg-[#3b82f6]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-[20%] w-[250px] h-[250px] rounded-full bg-[#8b5cf6]/5 blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 right-[20%] w-[200px] h-[200px] rounded-full bg-[#10b981]/5 blur-[80px] pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        {/* Hero Content */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge>
                <div className="w-2 h-2 rounded-full bg-[#d5b367] mr-2 animate-pulse" />
                {siteConfig.tagline}
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="mt-8 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="block">Marketing</span>
              <span className="block">Without The</span>
              <span className="block bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">
                Hassle.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-6 text-lg md:text-xl text-white/60 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              With our AI-driven marketing platform, you can accelerate your growth
              with data-driven strategies. Scale your business effortlessly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <MagneticButton variant="primary" href="/pricing">
                Get Started
              </MagneticButton>
              <MagneticButton variant="secondary" href="#services">
                Learn More
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Trusted By Marquee - Centered */}
        <motion.div
          className="pb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="w-full md:w-[60%] mx-auto px-0">
            <p className="text-sm text-white/50 font-semibold text-center mb-8 uppercase tracking-widest">
              Trusted by businesses across industries
            </p>

            {/* Logo Images Marquee */}
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
              <div className="flex w-max animate-marquee">
                {/* First set of logos */}
                {partnerLogos.map((partner, idx) => (
                  <div
                    key={`first-${idx}`}
                    className="relative h-12 w-24 md:h-12 md:w-36 mx-4 md:mx-6 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className={`object-contain ${partner.keepColor ? "" : "[filter:brightness(0)_invert(1)]"}`}
                      sizes="(max-width: 768px) 96px, 150px"
                      style={{ transform: `scale(${partner.scale})` }}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partnerLogos.map((partner, idx) => (
                  <div
                    key={`second-${idx}`}
                    className="relative h-12 w-24 md:h-12 md:w-36 mx-4 md:mx-6 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className={`object-contain ${partner.keepColor ? "" : "[filter:brightness(0)_invert(1)]"}`}
                      sizes="(max-width: 768px) 96px, 150px"
                      style={{ transform: `scale(${partner.scale})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#161616] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
