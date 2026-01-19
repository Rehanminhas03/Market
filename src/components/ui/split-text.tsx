"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
  staggerDelay?: number;
  highlightText?: string;
  highlightClassName?: string;
}

export default function SplitText({
  text,
  className = "",
  letterClassName = "",
  delay = 0,
  staggerDelay = 0.03,
  highlightText,
  highlightClassName = "",
}: SplitTextProps) {
  // Split text by spaces to get words, then split each word into letters
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => {
        const isHighlight = highlightText && word.includes(highlightText);
        const letters = word.split("");

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {letters.map((letter, letterIndex) => (
              <motion.span
                key={`${wordIndex}-${letterIndex}`}
                className={`inline-block ${letterClassName} ${isHighlight ? highlightClassName : ""}`}
                variants={letterVariants}
                style={{ transformOrigin: "bottom" }}
              >
                {letter}
              </motion.span>
            ))}
            {/* Add space after word (except last word) */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </motion.span>
  );
}

// Shimmer text effect component
export function ShimmerText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {/* Shimmer overlay */}
      <motion.span
        className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{
          backgroundSize: "200% 100%",
          mixBlendMode: "overlay",
        }}
        animate={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </span>
  );
}
