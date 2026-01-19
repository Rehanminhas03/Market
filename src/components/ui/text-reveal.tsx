"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  type?: "word" | "character" | "line";
}

export function TextRevealByWord({
  text,
  className,
  delay = 0,
  staggerChildren = 0.08,
}: TextRevealProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
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
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ perspective: "1000px" }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block mr-[0.25em]"
          variants={child}
          style={{ transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function TextRevealByCharacter({
  text,
  className,
  delay = 0,
  staggerChildren = 0.03,
}: TextRevealProps) {
  const characters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          className="inline-block"
          variants={child}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function TextSlideUp({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}

export function GradientText({
  children,
  className,
  colors = ["#d5b367", "#e8d5a3", "#d5b367"],
  animationSpeed = 3,
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}) {
  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: animationSpeed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + idx * speed,
            duration: 0,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
