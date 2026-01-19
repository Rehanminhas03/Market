"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

export default function Particles({
  className = "",
  quantity = 50,
  staticity = 50,
  ease = 50,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const initCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const createParticles = useCallback(() => {
    particles.current = [];
    for (let i = 0; i < quantity; i++) {
      particles.current.push({
        x: Math.random() * canvasSize.current.w,
        y: Math.random() * canvasSize.current.h,
        vx: (Math.random() - 0.5) * 0.5 + vx,
        vy: (Math.random() - 0.5) * 0.5 + vy,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }, [quantity, vx, vy]);

  const drawParticles = useCallback(() => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
      const rgb = hexToRgb(color);

      particles.current.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          particle.x -= (dx / distance) * force * (ease / 100);
          particle.y -= (dy / distance) * force * (ease / 100);
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvasSize.current.w;
        if (particle.x > canvasSize.current.w) particle.x = 0;
        if (particle.y < 0) particle.y = canvasSize.current.h;
        if (particle.y > canvasSize.current.h) particle.y = 0;

        // Draw particle
        context.current!.beginPath();
        context.current!.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );
        context.current!.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${particle.opacity})`;
        context.current!.fill();

        // Draw connections
        particles.current.slice(i + 1).forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 120) {
            context.current!.beginPath();
            context.current!.moveTo(particle.x, particle.y);
            context.current!.lineTo(otherParticle.x, otherParticle.y);
            context.current!.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${
              0.1 * (1 - dist / 120)
            })`;
            context.current!.stroke();
          }
        });
      });
    }
  }, [color, ease]);

  const animate = useCallback(() => {
    drawParticles();
    requestAnimationFrame(animate);
  }, [drawParticles]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      initCanvas();
      createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initCanvas, createParticles, animate]);

  return (
    <motion.div
      ref={canvasContainerRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}
