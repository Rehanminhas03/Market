"use client";

import { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  glowIntensity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface DottedBackgroundProps {
  className?: string;
  dotCount?: number;
  dotColor?: string;
  glowColor?: string;
  maxDotSize?: number;
  minDotSize?: number;
  speed?: number;
}

export default function DottedBackground({
  className = "",
  dotCount = 80,
  dotColor = "rgba(213, 179, 103, 1)",
  glowColor = "rgba(213, 179, 103, 0.6)",
  maxDotSize = 4,
  minDotSize = 1,
  speed = 0.3,
}: DottedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize dots with varied properties
    dotsRef.current = Array.from({ length: dotCount }, () => {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * (maxDotSize - minDotSize) + minDotSize,
        opacity: Math.random() * 0.5 + 0.3,
        glowIntensity: Math.random() * 0.8 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    });

    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const dots = dotsRef.current;

      // Update and draw dots
      dots.forEach((dot) => {
        // Smooth floating movement
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Soft boundary bounce with dampening
        if (dot.x < 0 || dot.x > dimensions.width) {
          dot.vx *= -0.8;
          dot.x = Math.max(0, Math.min(dimensions.width, dot.x));
        }
        if (dot.y < 0 || dot.y > dimensions.height) {
          dot.vy *= -0.8;
          dot.y = Math.max(0, Math.min(dimensions.height, dot.y));
        }

        // Add slight random drift
        dot.vx += (Math.random() - 0.5) * 0.02;
        dot.vy += (Math.random() - 0.5) * 0.02;

        // Limit velocity
        const maxVel = speed * 2;
        dot.vx = Math.max(-maxVel, Math.min(maxVel, dot.vx));
        dot.vy = Math.max(-maxVel, Math.min(maxVel, dot.vy));

        // Calculate pulsing opacity
        const pulse = Math.sin(timeRef.current * dot.pulseSpeed * 60 + dot.pulseOffset);
        const currentOpacity = dot.opacity * (0.7 + pulse * 0.3);
        const currentGlow = dot.glowIntensity * (0.6 + pulse * 0.4);

        // Draw glow effect
        const glowRadius = dot.size * 4;
        const gradient = ctx.createRadialGradient(
          dot.x,
          dot.y,
          0,
          dot.x,
          dot.y,
          glowRadius
        );
        gradient.addColorStop(0, glowColor.replace("0.6", (currentGlow * 0.5).toFixed(2)));
        gradient.addColorStop(0.5, glowColor.replace("0.6", (currentGlow * 0.2).toFixed(2)));
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor.replace("1)", `${currentOpacity})`);
        ctx.fill();

        // Draw bright center
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.6})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, dotCount, dotColor, glowColor, maxDotSize, minDotSize, speed]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
      />
    </div>
  );
}
