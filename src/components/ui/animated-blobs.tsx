"use client";

import { motion } from "framer-motion";

interface AnimatedBlobsProps {
  className?: string;
  color1?: string;
  color2?: string;
  color3?: string;
}

export default function AnimatedBlobs({
  className = "",
  color1 = "rgba(213, 179, 103, 0.4)",
  color2 = "rgba(213, 179, 103, 0.3)",
  color3 = "rgba(232, 213, 163, 0.25)",
}: AnimatedBlobsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Blob 1 - Large morphing blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, 50, -50, 0],
          y: [0, -50, 100, 50, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
          borderRadius: ["50%", "40%", "60%", "45%", "50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 - Medium morphing blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[70px]"
        style={{
          background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
          top: "30%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, 30, 60, 0],
          y: [0, 80, -30, -60, 0],
          scale: [1, 0.9, 1.15, 1, 1],
          borderRadius: ["50%", "55%", "40%", "50%", "50%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Blob 3 - Small floating blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[60px]"
        style={{
          background: `radial-gradient(circle, ${color3} 0%, transparent 70%)`,
          bottom: "20%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -40, 20, 0],
          y: [0, -40, 60, -20, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
          borderRadius: ["50%", "45%", "55%", "48%", "50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Blob 4 - Extra ambient glow */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[50px]"
        style={{
          background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
          top: "50%",
          right: "30%",
        }}
        animate={{
          x: [0, -40, 80, -30, 0],
          y: [0, 60, -40, 30, 0],
          scale: [1, 1.2, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Noise/grain overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
