"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

interface CursorTrailProps {
  className?: string;
  particleCount?: number;
  particleLifetime?: number;
}

export default function CursorTrail({
  className = "",
  particleCount = 15,
  particleLifetime = 800,
}: CursorTrailProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  const addParticle = useCallback(
    (x: number, y: number) => {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x,
        y,
      };

      setParticles((prev) => {
        const updated = [...prev, newParticle];
        // Limit particle count
        if (updated.length > particleCount) {
          return updated.slice(-particleCount);
        }
        return updated;
      });

      // Remove particle after lifetime
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, particleLifetime);
    },
    [particleCount, particleLifetime]
  );

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let throttleTimeout: NodeJS.Timeout | null = null;
    let movingTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );

      // Only create particle if cursor moved enough distance
      if (distance > 20) {
        if (!throttleTimeout) {
          throttleTimeout = setTimeout(() => {
            addParticle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
            throttleTimeout = null;
          }, 30);
        }
      }

      setIsMoving(true);
      if (movingTimeout) clearTimeout(movingTimeout);
      movingTimeout = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
      if (movingTimeout) clearTimeout(movingTimeout);
    };
  }, [addParticle]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 0.8,
            }}
            animate={{
              y: particle.y - 30 - Math.random() * 20,
              x: particle.x + (Math.random() - 0.5) * 30,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: particleLifetime / 1000,
              ease: "easeOut",
            }}
            style={{
              left: 0,
              top: 0,
            }}
          >
            {/* Golden sparkle */}
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(213, 179, 103, 1) 0%, rgba(255, 180, 80, 0.8) 50%, transparent 100%)`,
                boxShadow: "0 0 6px rgba(213, 179, 103, 0.8), 0 0 12px rgba(255, 180, 80, 0.4)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
