"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
  opacity?: number;
  interactive?: boolean;
}

export default function AuroraBackground({
  className = "",
  colors = [
    "rgba(180, 145, 70, 0.4)",
    "rgba(213, 179, 103, 0.3)",
    "rgba(232, 213, 163, 0.2)",
    "rgba(180, 145, 70, 0.25)",
  ],
  speed = 1,
  blur = 80,
  opacity = 0.6,
  interactive = true,
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.targetX = (touch.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (touch.clientY - rect.top) / rect.height;
    };

    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleTouchMove);
    }

    // Aurora wave parameters
    const waves = [
      { amplitude: 0.15, frequency: 0.8, phase: 0, speed: 0.02 },
      { amplitude: 0.12, frequency: 1.2, phase: 2, speed: 0.015 },
      { amplitude: 0.1, frequency: 0.6, phase: 4, speed: 0.025 },
      { amplitude: 0.08, frequency: 1.5, phase: 1, speed: 0.018 },
    ];

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      timeRef.current += 0.016 * speed;

      // Draw multiple aurora layers
      colors.forEach((color, colorIndex) => {
        const wave = waves[colorIndex % waves.length];

        ctx.beginPath();

        // Start from bottom left
        ctx.moveTo(0, height);

        // Draw the aurora wave
        const segments = 100;
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * width;
          const normalizedX = i / segments;

          // Base wave calculation
          let y = height * 0.5;

          // Add multiple sine waves for organic movement
          y += Math.sin(normalizedX * Math.PI * wave.frequency + timeRef.current * wave.speed * 10 + wave.phase)
               * height * wave.amplitude;
          y += Math.sin(normalizedX * Math.PI * 2 + timeRef.current * 0.5 + colorIndex)
               * height * 0.05;
          y += Math.sin(normalizedX * Math.PI * 0.5 + timeRef.current * 0.3)
               * height * 0.08;

          // Mouse influence - waves bend toward cursor
          if (interactive) {
            const mouseInfluence = Math.exp(-Math.pow((normalizedX - mouseRef.current.x) * 3, 2));
            y += (mouseRef.current.y - 0.5) * height * 0.3 * mouseInfluence;
          }

          // Vertical offset for each layer
          y += colorIndex * height * 0.08;

          ctx.lineTo(x, y);
        }

        // Complete the shape
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, color.replace(/[\d.]+\)$/, "0.1)"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Add some glowing orbs that float
      const orbCount = 5;
      for (let i = 0; i < orbCount; i++) {
        const orbX = width * (0.1 + 0.8 * ((i / orbCount + timeRef.current * 0.02) % 1));
        const orbY = height * (0.3 + 0.2 * Math.sin(timeRef.current * 0.5 + i * 2));
        const orbSize = 50 + 30 * Math.sin(timeRef.current + i);

        const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbSize);
        orbGradient.addColorStop(0, "rgba(213, 179, 103, 0.15)");
        orbGradient.addColorStop(0.5, "rgba(180, 145, 70, 0.05)");
        orbGradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2);
        ctx.fillStyle = orbGradient;
        ctx.fill();
      }

      // Add shimmer streaks
      const streakCount = 3;
      for (let i = 0; i < streakCount; i++) {
        const streakProgress = ((timeRef.current * 0.1 + i * 0.33) % 1);
        const streakX = width * streakProgress;
        const streakY = height * (0.2 + 0.3 * Math.sin(i * 5));
        const streakLength = 100 + 50 * Math.sin(timeRef.current + i);

        const streakGradient = ctx.createLinearGradient(
          streakX - streakLength, streakY,
          streakX + streakLength, streakY
        );
        streakGradient.addColorStop(0, "transparent");
        streakGradient.addColorStop(0.5, "rgba(232, 213, 163, 0.1)");
        streakGradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(streakX - streakLength, streakY);
        ctx.lineTo(streakX + streakLength, streakY + 2);
        ctx.lineTo(streakX + streakLength, streakY - 2);
        ctx.closePath();
        ctx.fillStyle = streakGradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed, interactive]);

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    </motion.div>
  );
}
