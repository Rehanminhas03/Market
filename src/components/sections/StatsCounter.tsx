"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    value: 2,
    suffix: "+",
    label: "Years in business",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    value: 500,
    suffix: "+",
    label: "Clients served",
  },
  {
    value: 1200,
    suffix: "+",
    label: "Campaigns launched",
    formatNumber: true,
  },
];

function AnimatedNumber({
  value,
  suffix,
  formatNumber,
  isInView,
}: {
  value: number;
  suffix: string;
  formatNumber?: boolean;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 30,
    duration: 2,
  });

  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  const formattedValue = formatNumber
    ? displayValue.toLocaleString()
    : displayValue.toString();

  return (
    <span className="tabular-nums">
      {formattedValue}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-16 px-4 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: idx * 0.15,
                ease: "easeOut"
              }}
            >
              <div className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-light text-white mb-2 tracking-tight">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  formatNumber={stat.formatNumber}
                  isInView={isInView}
                />
              </div>
              <p className="text-xs md:text-sm text-white/50 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
