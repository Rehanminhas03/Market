"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent } from "react";

export const Spotlight = ({
  className,
  fill = "white",
}: {
  className?: string;
  fill?: string;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <svg
        className="absolute h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="spotlight-gradient" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.2" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="600"
          cy="0"
          rx="800"
          ry="500"
          fill="url(#spotlight-gradient)"
        />
      </svg>
    </div>
  );
};

export const SpotlightCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-white/10 bg-white/[0.02] p-8",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(213, 179, 103, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
};
