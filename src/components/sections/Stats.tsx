"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  IconPhone,
  IconTargetArrow,
  IconRocket,
  IconArrowRight,
} from "@tabler/icons-react";

const steps = [
  {
    number: "01",
    icon: IconPhone,
    title: "Book a Discovery Call",
    description:
      "Schedule a free 15-minute consultation to discuss your goals and challenges.",
    color: "#3b82f6", // Blue
  },
  {
    number: "02",
    icon: IconTargetArrow,
    title: "Get Your Custom Strategy",
    description:
      "We'll create a tailored marketing plan designed specifically for your market.",
    color: "#8b5cf6", // Purple
  },
  {
    number: "03",
    icon: IconRocket,
    title: "Watch Your Business Grow",
    description:
      "Sit back as qualified leads flow in and your pipeline fills with opportunities.",
    color: "#10b981", // Emerald
  },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(213, 179, 103, 0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge>How It Works</Badge>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Three Steps to Success
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-white/60 text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Getting started is simple. Here&apos;s how we help you grow.
        </motion.p>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop only - gradient through step colors */}
          <div
            className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px]"
            style={{
              background: "linear-gradient(to right, #3b82f6, #8b5cf6, #10b981)",
              opacity: 0.4,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.15 }}
              >
                {/* Card */}
                <div className="relative flex flex-col items-center text-center p-6 md:p-8">
                  {/* Step number + Icon */}
                  <div className="relative mb-6">
                    {/* Glowing background */}
                    <div
                      className="absolute inset-0 w-[120px] h-[120px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full blur-2xl"
                      style={{ backgroundColor: `${step.color}15` }}
                    />

                    {/* Icon container */}
                    <motion.div
                      className="relative w-[100px] h-[100px] rounded-full bg-[#0f0f0f] flex items-center justify-center"
                      style={{ borderColor: `${step.color}30`, borderWidth: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Step number badge */}
                      <div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: step.color }}
                      >
                        <span className="text-sm font-bold text-white">
                          {step.number}
                        </span>
                      </div>

                      <step.icon className="w-10 h-10" style={{ color: step.color }} />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for mobile - between cards */}
                  {idx < steps.length - 1 && (
                    <div className="md:hidden mt-6">
                      <IconArrowRight className="w-5 h-5 rotate-90" style={{ color: `${step.color}60` }} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[#d5b367] hover:text-[#e8d5a3] transition-colors font-medium"
          >
            Ready to get started?
            <IconArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
