"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  strength?: number;
}

// Custom smooth scroll function with easing
const smoothScrollTo = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = Math.min(Math.abs(distance) * 1.2, 4000); // Slower animation, max 4s
  let startTime: number | null = null;

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// Arrow Icon - diagonal pointing top-right
const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-4 h-4", className)}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function MagneticButton({
  children,
  className,
  variant = "primary",
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium transition-all duration-300 border border-white/10 overflow-hidden";

  const variants = {
    primary:
      "bg-[#b49146] text-[#161616] hover:bg-[#c9a555] shadow-[0_0.7px_0.7px_-0.625px_rgba(0,0,0,0.15),0_1.8px_1.8px_-1.25px_rgba(0,0,0,0.14),0_3.6px_3.6px_-1.875px_rgba(0,0,0,0.14),0_6.9px_6.9px_-2.5px_rgba(0,0,0,0.13),0_13.6px_13.6px_-3.125px_rgba(0,0,0,0.1),0_30px_30px_-3.75px_rgba(0,0,0,0.05)]",
    secondary:
      "bg-white/[0.06] text-white hover:bg-white/10 shadow-[0_0.7px_0.7px_-0.625px_rgba(0,0,0,0.15),0_1.8px_1.8px_-1.25px_rgba(0,0,0,0.14),0_3.6px_3.6px_-1.875px_rgba(0,0,0,0.14),0_6.9px_6.9px_-2.5px_rgba(0,0,0,0.13),0_13.6px_13.6px_-3.125px_rgba(0,0,0,0.1),0_30px_30px_-3.75px_rgba(0,0,0,0.05)]",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };

  const content = (
    <span className="relative block overflow-hidden h-[1.2em]">
      {/* Original text - rolls up on hover */}
      <span className="flex items-center gap-2 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
        {variant === "primary" && <ArrowUpRight />}
      </span>
      {/* Duplicate text - rolls in from below */}
      <span className="absolute left-0 top-0 flex items-center gap-2 translate-y-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        {children}
        {variant === "primary" && <ArrowUpRight />}
      </span>
    </span>
  );

  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variants[variant], className)}
    >
      {content}
    </motion.div>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (href && (href.startsWith("#") || href.startsWith("/#"))) {
      e.preventDefault();
      const targetId = href.replace("/#", "").replace("#", "");
      smoothScrollTo(targetId);
    }
    onClick?.();
  };

  if (href) {
    // For hash links, use smooth scroll
    if (href.startsWith("#") || href.startsWith("/#")) {
      return (
        <a href={href} onClick={handleClick} className="inline-block">
          {buttonContent}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  );
}
