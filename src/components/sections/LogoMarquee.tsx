"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Brokerage logos for the marquee - using local images
// scale property to adjust for logos with different visual sizes
const brokerageLogos = [
  { name: "Partner 1", logo: "/logos/1.png", scale: 1 },
  { name: "Partner 2", logo: "/logos/2.png", scale: 1 },
  { name: "Partner 3", logo: "/logos/3.png", scale: 1 },
  { name: "Partner 4", logo: "/logos/4.png", scale: 1 },
  { name: "Partner 5", logo: "/logos/5.png", scale: 1 },
  { name: "Partner 6", logo: "/logos/6.png", scale: 1.3 },
  { name: "Partner 7", logo: "/logos/7.png", scale: 1.2 },
  { name: "Partner 8", logo: "/logos/8.png", scale: 1 },
  { name: "Partner 9", logo: "/logos/9.png", scale: 1.1 },
  { name: "Partner 10", logo: "/logos/10.png", scale: 1.3 },
  { name: "Partner 11", logo: "/logos/11.png", scale: 1.3 },
  { name: "Partner 12", logo: "/logos/12.png", scale: 1.1 },
  { name: "Partner 13", logo: "/logos/13.png", scale: 1 },
];

export default function LogoMarqueeSection() {
  return (
    <section className="relative -mt-8 pb-12 bg-[#0a0a0a] overflow-hidden">
      <motion.div
        className="relative z-10 w-[70%] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-sm text-white/40 text-center mb-6">
          Trusted by agents at leading brokerages
        </p>

        {/* Logo Images Marquee */}
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
          <div className="flex w-max animate-marquee">
            {/* First set of logos */}
            {brokerageLogos.map((brokerage, idx) => (
              <div
                key={`first-${idx}`}
                className="relative h-10 w-32 mx-5 opacity-60 hover:opacity-90 transition-opacity flex-shrink-0"
              >
                <Image
                  src={brokerage.logo}
                  alt={brokerage.name}
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="160px"
                  style={{ transform: `scale(${brokerage.scale})` }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brokerageLogos.map((brokerage, idx) => (
              <div
                key={`second-${idx}`}
                className="relative h-10 w-32 mx-5 opacity-60 hover:opacity-90 transition-opacity flex-shrink-0"
              >
                <Image
                  src={brokerage.logo}
                  alt={brokerage.name}
                  fill
                  className="object-contain brightness-0 invert"
                  sizes="160px"
                  style={{ transform: `scale(${brokerage.scale})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
