"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import MagneticButton from "@/components/ui/magnetic-button";

const faqs = [
  {
    question: "How quickly can I expect to see results?",
    answer:
      "Most clients start seeing measurable improvements within the first 2-4 weeks. However, building sustainable growth typically takes 2-3 months of consistent effort. We'll set realistic expectations based on your industry and goals.",
  },
  {
    question: "What marketing services do you offer?",
    answer:
      "We offer comprehensive digital marketing services including SEO, PPC advertising (Google Ads, Facebook Ads), social media marketing, content creation, email marketing, video production, and brand development. Each strategy is tailored to your specific business needs.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "We offer flexible month-to-month agreements because we believe our results should speak for themselves. That said, marketing takes time to compound, so we recommend committing to at least 3 months for best results.",
  },
  {
    question: "How much should I budget for marketing?",
    answer:
      "Marketing budgets vary based on your industry and goals. We typically recommend starting with $1,500-3,000/month for ad spend plus our service fee. We'll help you determine the right investment during our discovery call.",
  },
  {
    question: "Will I have a dedicated point of contact?",
    answer:
      "Yes! Every client is assigned a dedicated account manager who knows your business inside and out. You'll also have direct access to our team of specialists whenever you need them.",
  },
  {
    question: "Can you work with my existing tools and systems?",
    answer:
      "Absolutely. We integrate with all major CRMs, marketing platforms, and business tools including HubSpot, Salesforce, Mailchimp, and many others. If you use a custom solution, we can usually find a way to connect.",
  },
];

// Animated circle toggle icon component with rotation
function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      className="relative w-12 h-12 flex-shrink-0"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle with animated stroke */}
        <motion.circle
          cx="24"
          cy="24"
          r="23"
          stroke="#d5b367"
          strokeWidth="1.5"
          fill="none"
          initial={false}
          animate={{
            strokeOpacity: isOpen ? 1 : 0.4,
            scale: isOpen ? 1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Animated background fill */}
        <motion.circle
          cx="24"
          cy="24"
          r="22"
          fill="#d5b367"
          initial={false}
          animate={{
            fillOpacity: isOpen ? 0.15 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Horizontal line (always visible) */}
        <motion.line
          x1="16"
          y1="24"
          x2="32"
          y2="24"
          stroke="#d5b367"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            stroke: isOpen ? "#d5b367" : "#d5b367",
          }}
        />
        {/* Vertical line (fades out when open) */}
        <motion.line
          x1="24"
          y1="16"
          x2="24"
          y2="32"
          stroke="#d5b367"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleY: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </motion.div>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
  isInView,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      className="relative rounded-xl overflow-hidden mb-3 last:mb-0"
    >
      {/* Background with alternating colors and hover effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        animate={{
          backgroundColor: isOpen
            ? "rgba(213, 179, 103, 0.12)"
            : isHovered
              ? "rgba(213, 179, 103, 0.08)"
              : isEven
                ? "rgba(255, 255, 255, 0.02)"
                : "rgba(255, 255, 255, 0.05)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Active/Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={false}
        animate={{
          boxShadow: isOpen
            ? "inset 0 0 0 1px rgba(213, 179, 103, 0.3), 0 0 20px rgba(213, 179, 103, 0.1)"
            : isHovered
              ? "inset 0 0 0 1px rgba(213, 179, 103, 0.2)"
              : "inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Active indicator bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        initial={false}
        animate={{
          backgroundColor: isOpen ? "#d5b367" : "transparent",
          scaleY: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ originY: 0.5 }}
      />

      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full py-5 md:py-6 px-5 md:px-6 flex items-center justify-between text-left group gap-6 relative z-10"
      >
        <motion.span
          className="text-base md:text-lg font-medium transition-colors"
          initial={false}
          animate={{
            color: isOpen ? "#d5b367" : "#ffffff",
          }}
          transition={{ duration: 0.3 }}
        >
          {faq.question}
        </motion.span>
        <ToggleIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden relative z-10"
          >
            <motion.p
              className="pb-5 md:pb-6 px-5 md:px-6 text-white/60 text-sm md:text-base leading-relaxed pr-16"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(213, 179, 103, 0.06) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Split layout container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left side - Heading and CTA */}
          <div className="lg:w-[38%] lg:sticky lg:top-32 lg:self-start lg:pl-4">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Everything you need to know
            </motion.h2>

            <motion.p
              className="text-white/60 text-base md:text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Got questions? We&apos;ve got answers. If you can&apos;t find what
              you&apos;re looking for, feel free to reach out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MagneticButton variant="primary" href="/contact">
                Contact us
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right side - Accordion */}
          <div className="lg:w-[62%]">
            <motion.div
              className="bg-[#141414]/60 backdrop-blur-sm rounded-2xl p-4 md:p-5"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.03)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  faq={faq}
                  index={idx}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
