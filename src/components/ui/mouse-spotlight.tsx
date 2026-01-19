"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MouseSpotlightProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export default function MouseSpotlight({
  className = "",
  size = 400,
  color = "#d5b367",
  opacity = 0.15,
}: MouseSpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <motion.div
      className={`fixed pointer-events-none z-0 ${className}`}
      animate={{
        x: mousePosition.x - size / 2,
        y: mousePosition.y - size / 2,
        opacity: isVisible ? opacity : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(40px)",
      }}
    />
  );
}
