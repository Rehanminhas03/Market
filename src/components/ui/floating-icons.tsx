"use client";

import { motion } from "framer-motion";
import {
  IconHome,
  IconChartBar,
  IconUsers,
  IconMail,
  IconStar,
  IconRocket,
  IconTarget,
  IconTrendingUp,
} from "@tabler/icons-react";

interface FloatingIconsProps {
  className?: string;
}

const icons = [
  { Icon: IconHome, delay: 0, x: "10%", y: "20%" },
  { Icon: IconChartBar, delay: 0.5, x: "85%", y: "15%" },
  { Icon: IconUsers, delay: 1, x: "15%", y: "70%" },
  { Icon: IconMail, delay: 1.5, x: "80%", y: "65%" },
  { Icon: IconStar, delay: 2, x: "25%", y: "40%" },
  { Icon: IconRocket, delay: 2.5, x: "75%", y: "35%" },
  { Icon: IconTarget, delay: 3, x: "5%", y: "50%" },
  { Icon: IconTrendingUp, delay: 3.5, x: "90%", y: "45%" },
];

export default function FloatingIcons({ className = "" }: FloatingIconsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {icons.map(({ Icon, delay, x, y }, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0.3, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [0, -20, 0, 20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-3 rounded-xl bg-[#d5b367]/10 backdrop-blur-sm border border-[#d5b367]/20">
            <Icon className="w-6 h-6 text-[#d5b367]/50" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
