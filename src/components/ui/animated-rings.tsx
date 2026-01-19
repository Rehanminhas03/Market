"use client";

import { motion } from "framer-motion";

interface AnimatedRingsProps {
  className?: string;
}

export default function AnimatedRings({ className = "" }: AnimatedRingsProps) {
  // Ring configurations: size, duration, direction, tilt offset
  const rings = [
    { size: 600, duration: 25, direction: 1, tiltOffset: 0 },
    { size: 500, duration: 20, direction: -1, tiltOffset: 15 },
    { size: 400, duration: 18, direction: 1, tiltOffset: -10 },
    { size: 300, duration: 15, direction: -1, tiltOffset: 20 },
    { size: 200, duration: 12, direction: 1, tiltOffset: -15 },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Subtle background gradient - no blur to keep rings visible */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(8, 8, 8, 0.4) 100%)",
        }}
      />

      {/* 3D Rotating Ring Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main 3D scene that rotates */}
        <motion.div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [65, 70, 65, 60, 65],
            rotateY: [0, 360],
            rotateZ: [0, 5, 0, -5, 0],
          }}
          transition={{
            rotateX: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 60, repeat: Infinity, ease: "linear" },
            rotateZ: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {/* Orbital rings */}
          {rings.map((ring, idx) => (
            <motion.div
              key={idx}
              className="absolute left-1/2 top-1/2"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateX(-50%) translateY(-50%) rotateX(${ring.tiltOffset}deg)`,
              }}
              animate={{ rotateZ: ring.direction * 360 }}
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Ring circle */}
              <div
                className="rounded-full"
                style={{
                  width: ring.size,
                  height: ring.size,
                  border: `2px solid rgba(180, 145, 70, ${0.3 + idx * 0.08})`,
                  boxShadow: `
                    0 0 ${50 + idx * 15}px rgba(180, 145, 70, ${0.15 + idx * 0.05}),
                    inset 0 0 ${40 + idx * 10}px rgba(180, 145, 70, ${0.05 + idx * 0.02})
                  `,
                }}
              />

              {/* Glowing orb on the ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 12 + idx * 3,
                  height: 12 + idx * 3,
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                  background: `radial-gradient(circle, rgba(255, 220, 150, 1) 0%, rgba(180, 145, 70, 0.8) 40%, transparent 100%)`,
                  boxShadow: `0 0 ${25 + idx * 8}px rgba(180, 145, 70, 0.9), 0 0 ${50 + idx * 10}px rgba(180, 145, 70, 0.5)`,
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2 + idx * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Secondary orb on opposite side */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 8 + idx * 2,
                  height: 8 + idx * 2,
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%) translateY(50%)",
                  background: `radial-gradient(circle, rgba(255, 220, 150, 0.9) 0%, rgba(180, 145, 70, 0.5) 50%, transparent 100%)`,
                  boxShadow: `0 0 ${20 + idx * 5}px rgba(180, 145, 70, 0.7)`,
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3 + idx * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          ))}

          {/* Center core with pulsing glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 100,
              height: 100,
              background: "radial-gradient(circle, rgba(255, 220, 150, 0.5) 0%, rgba(180, 145, 70, 0.3) 40%, transparent 70%)",
              boxShadow: "0 0 100px rgba(180, 145, 70, 0.6), 0 0 150px rgba(180, 145, 70, 0.3)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner core ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 120,
              height: 120,
              border: "2px solid rgba(180, 145, 70, 0.5)",
              boxShadow: "0 0 40px rgba(180, 145, 70, 0.3), inset 0 0 30px rgba(180, 145, 70, 0.15)",
            }}
            animate={{ rotateZ: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Floating particles that orbit independently */}
      {[
        { size: 4, opacity: 0.5 },
        { size: 5, opacity: 0.6 },
        { size: 3.5, opacity: 0.45 },
        { size: 4.5, opacity: 0.55 },
        { size: 3, opacity: 0.5 },
        { size: 5.5, opacity: 0.65 },
      ].map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: `rgba(180, 145, 70, ${particle.opacity})`,
            boxShadow: `0 0 ${6 + i * 2}px rgba(180, 145, 70, 0.4)`,
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [
              Math.cos((i * 60 * Math.PI) / 180) * (150 + i * 40),
              Math.cos(((i * 60 + 120) * Math.PI) / 180) * (180 + i * 30),
              Math.cos(((i * 60 + 240) * Math.PI) / 180) * (160 + i * 35),
              Math.cos((i * 60 * Math.PI) / 180) * (150 + i * 40),
            ],
            y: [
              Math.sin((i * 60 * Math.PI) / 180) * (100 + i * 25),
              Math.sin(((i * 60 + 120) * Math.PI) / 180) * (120 + i * 20),
              Math.sin(((i * 60 + 240) * Math.PI) / 180) * (90 + i * 28),
              Math.sin((i * 60 * Math.PI) / 180) * (100 + i * 25),
            ],
            opacity: [0.3, 0.7, 0.4, 0.3],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 25%, rgba(8, 8, 8, 0.6) 100%)",
        }}
      />
    </div>
  );
}
