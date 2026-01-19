"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function Parallax({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`relative ${className}`}>{children}</div>;
}

export function ParallaxLayer({
  children,
  className = "",
  offset = 0,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// Scroll-triggered entrance animation
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const initialOffset = {
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [initialOffset[direction].x, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [initialOffset[direction].y, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, y }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
