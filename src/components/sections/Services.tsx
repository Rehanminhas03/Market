"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import MagneticButton from "@/components/ui/magnetic-button";
import {
  IconBrandFacebook,
  IconMail,
  IconVideo,
  IconPencil,
  IconSearch,
  IconRobot,
  IconBrandInstagram,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";

const categories = [
  { id: "all", label: "All Services" },
  { id: "marketing", label: "Marketing" },
  { id: "content", label: "Content" },
  { id: "technology", label: "Technology" },
];

const services = [
  // Row 1-2: Large (2x2) + 2 small (1x1 each stacked)
  {
    icon: IconBrandFacebook,
    title: "Social Media Marketing",
    description:
      "Strategic campaigns across Facebook, Instagram, and LinkedIn to reach your ideal audience and generate qualified leads.",
    features: ["Facebook Ads", "Instagram Marketing", "LinkedIn Outreach"],
    category: "marketing",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    stats: { value: "300%", label: "Avg. ROI" },
    gridClass: "md:col-span-2 md:row-span-2",
    accentColor: "#3b82f6", // Blue
  },
  {
    icon: IconMail,
    title: "Email Marketing",
    description:
      "Automated email sequences that nurture leads and convert prospects into clients.",
    features: ["Drip Campaigns", "Newsletter Design", "A/B Testing"],
    category: "marketing",
    image:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80",
    gridClass: "md:col-span-1 md:row-span-1",
    accentColor: "#10b981", // Emerald
  },
  {
    icon: IconRobot,
    title: "AI Automation",
    description:
      "Intelligent systems that work 24/7 to generate leads, qualify prospects, and automate follow-ups.",
    features: ["Lead Scoring", "Auto Follow-up", "CRM Integration"],
    category: "technology",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    stats: { value: "24/7", label: "Always On" },
    gridClass: "md:col-span-1 md:row-span-1",
    accentColor: "#8b5cf6", // Purple
  },
  {
    icon: IconVideo,
    title: "Video Production",
    description:
      "Professional video content that showcases properties and builds your brand.",
    features: ["Property Tours", "Agent Profiles", "Market Updates"],
    category: "content",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    gridClass: "md:col-span-1 md:row-span-1",
    accentColor: "#f97316", // Orange
  },
  {
    icon: IconPencil,
    title: "Content Creation",
    description:
      "Engaging content that tells your story, establishes authority, and connects with your target audience.",
    features: ["Blog Writing", "Social Posts", "Brand Voice"],
    category: "content",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    stats: { value: "10x", label: "Engagement" },
    gridClass: "md:col-span-1 md:row-span-1",
    accentColor: "#06b6d4", // Cyan
  },
  // Row 3: 4 small cards
  {
    icon: IconSearch,
    title: "SEO & Local Search",
    description:
      "Get found by buyers and sellers actively searching in your market area.",
    features: ["Local SEO", "Google Business", "Review Management"],
    category: "technology",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    gridClass: "md:col-span-1 md:row-span-1",
    accentColor: "#6366f1", // Indigo
  },
  {
    icon: IconBrandInstagram,
    title: "Brand Development",
    description:
      "Build a memorable personal brand that sets you apart from the competition.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    category: "content",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    stats: { value: "500+", label: "Brands Built" },
    gridClass: "md:col-span-1 md:row-span-1",
    accentColor: "#ec4899", // Pink
  },
  {
    icon: IconPhone,
    title: "Lead Generation",
    description:
      "Multi-channel lead generation strategies that deliver consistent, high-quality prospects.",
    features: ["PPC Campaigns", "Landing Pages", "Lead Magnets"],
    category: "marketing",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    stats: { value: "77k+", label: "Leads Generated" },
    gridClass: "md:col-span-2 md:row-span-1",
    accentColor: "#d5b367", // Gold (primary)
  },
];

// Service Card Component
function ServiceCard({
  service,
  idx,
  isInView,
}: {
  service: (typeof services)[0];
  idx: number;
  isInView: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isLarge = service.gridClass?.includes("row-span-2");

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden ${service.gridClass || ""}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/80 to-[#161616]/40" />
      </div>

      {/* Mouse follow glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${service.accentColor}33,
              transparent 80%
            )
          `,
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-300 z-10"
        style={{
          borderColor: isHovered ? `${service.accentColor}80` : undefined,
        }}
      />

      {/* Content */}
      <div className={`relative z-20 h-full flex flex-col justify-end ${isLarge ? "p-6" : "p-4"}`}>
        {/* Stats badge */}
        {service.stats && (
          <motion.div
            className="absolute top-4 right-4 backdrop-blur-sm rounded-lg px-3 py-1.5"
            style={{
              backgroundColor: `${service.accentColor}20`,
              borderColor: `${service.accentColor}40`,
              borderWidth: 1,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`${isLarge ? "text-xl" : "text-base"} font-bold`}
              style={{ color: service.accentColor }}
            >
              {service.stats.value}
            </div>
            <div className="text-[10px] text-white/60">{service.stats.label}</div>
          </motion.div>
        )}

        {/* Icon */}
        <motion.div
          className={`${isLarge ? "w-12 h-12" : "w-10 h-10"} rounded-lg backdrop-blur-sm flex items-center justify-center mb-3`}
          style={{
            backgroundColor: `${service.accentColor}20`,
            borderColor: `${service.accentColor}40`,
            borderWidth: 1,
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <service.icon
            className={`${isLarge ? "w-6 h-6" : "w-5 h-5"}`}
            style={{ color: service.accentColor }}
          />
        </motion.div>

        {/* Title */}
        <h3
          className={`${isLarge ? "text-xl" : "text-base"} font-semibold text-white mb-1 transition-colors`}
          style={{ color: isHovered ? service.accentColor : undefined }}
        >
          {service.title}
        </h3>

        {/* Description - always visible for large cards, hover for small */}
        {isLarge ? (
          <p className="text-sm text-white/60 leading-relaxed mb-3 max-w-md">
            {service.description}
          </p>
        ) : (
          <div className="overflow-hidden">
            <motion.p
              className="text-xs text-white/60 leading-relaxed"
              initial={false}
              animate={{
                height: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
                marginBottom: isHovered ? 8 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {service.description}
            </motion.p>
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {service.features.slice(0, 3).map((feature, fidx) => (
            <span
              key={fidx}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 transition-colors"
              style={{
                backgroundColor: isHovered ? `${service.accentColor}25` : undefined,
                color: isHovered ? "#ffffff" : undefined,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

// Category Tab Component
function CategoryTab({
  category,
  isActive,
  onClick,
}: {
  category: (typeof categories)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
        isActive ? "text-[#161616]" : "text-white/60 hover:text-white"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-[#d5b367] rounded-full"
          layoutId="activeTab"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{category.label}</span>
    </motion.button>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(213, 179, 103, 0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge>Our Services</Badge>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything You Need to Grow
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-white/60 text-center max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Comprehensive marketing solutions tailored for real estate
          professionals
        </motion.p>

        {/* Category Tabs */}
        <motion.div
          className="flex justify-center mb-12 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex gap-1 sm:gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 min-w-max">
            {categories.map((category) => (
              <CategoryTab
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            gridAutoRows: "160px",
          }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <ServiceCard
                key={service.title}
                service={service}
                idx={idx}
                isInView={isInView}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <MagneticButton variant="primary" href="/pricing">
            Get Started Today
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
