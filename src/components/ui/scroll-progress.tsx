"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const progressBar = (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] z-[9999] pointer-events-none"
      style={{
        scaleX,
        transformOrigin: "0%",
      }}
    />
  );

  // Use portal to render outside page-wrapper
  if (!mounted) return progressBar;
  return createPortal(progressBar, document.body);
}
