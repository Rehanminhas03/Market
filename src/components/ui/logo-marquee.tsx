"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Partner logos for the marquee - using local images
// scale property to adjust for logos with different visual sizes
const partnerLogos = [
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

interface LogoMarqueeProps {
  title?: string;
  duration?: number;
  className?: string;
  width?: string;
}

export default function LogoMarquee({
  title = "Trusted by businesses across industries",
  duration = 25,
  className = "",
  width = "75%",
}: LogoMarqueeProps) {
  return (
    <motion.div
      className={`relative z-10 mx-auto ${className}`}
      style={{ width }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {title && (
        <p className="text-sm text-white/40 text-center mb-6">{title}</p>
      )}

      {/* Logo Images Marquee */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
        <motion.div
          className="flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        >
          {[...partnerLogos, ...partnerLogos].map((partner, idx) => (
            <div
              key={idx}
              className="relative h-10 w-32 mx-5 opacity-60 hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain brightness-0 invert"
                sizes="160px"
                style={{ transform: `scale(${partner.scale})` }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
