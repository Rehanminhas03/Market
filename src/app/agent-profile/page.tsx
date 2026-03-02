"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/magnetic-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import {
  IconHome,
  IconCash,
  IconChartLine,
  IconPlane,
  IconShieldCheck,
  IconClock,
  IconMapPin,
  IconBed,
  IconBath,
  IconRuler,
  IconMap,
  IconHeartHandshake,
  IconTargetArrow,
  IconTrophy,
  IconCheck,
  IconMail,
  IconChevronRight,
  IconArrowRight,
  IconStar,
  IconAward,
  IconQuote,
  IconSparkles,
  IconRocket,
  IconEye,
  IconHeart,
} from "@tabler/icons-react";

// Services data
const services = [
  {
    icon: IconHome,
    title: "Buyer Representation",
    description: "Finding your dream home with expert market analysis and tailored search tools.",
  },
  {
    icon: IconCash,
    title: "Seller Representation",
    description: "Strategic marketing and staging to get your property sold for top dollar.",
  },
  {
    icon: IconChartLine,
    title: "Investment Guidance",
    description: "Identifying high-yield investment properties and portfolio diversification.",
  },
  {
    icon: IconPlane,
    title: "Relocation Support",
    description: "Concierge-level service for clients moving to new areas.",
  },
];

// Stats data
const stats = [
  { value: 500, suffix: "+", label: "Homes Sold" },
  { value: 4.9, suffix: "/5", label: "Google Rating", isDecimal: true },
  { value: 150, prefix: "$", suffix: "M+", label: "Sales Volume" },
  { value: 12, suffix: "+", label: "Years Active" },
];

// Featured listings
const featuredListings = [
  {
    title: "Greenwood Estate",
    address: "123 Forest Oak Dr, Beverly Hills",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: "3,400",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "New Listing",
  },
  {
    title: "Sunset Villa",
    address: "45 Highpoint Ave, Malibu",
    price: "$890,000",
    beds: 3,
    baths: 2.5,
    sqft: "2,800",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    status: "Pending",
  },
  {
    title: "The Modern Loft",
    address: "99 Loft Way, Santa Monica",
    price: "$545,000",
    beds: 2,
    baths: 2,
    sqft: "1,650",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    status: null,
  },
  {
    title: "Ocean View Penthouse",
    address: "200 Pacific Coast Hwy, Malibu",
    price: "$2,850,000",
    beds: 5,
    baths: 4.5,
    sqft: "4,200",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    status: "Featured",
  },
  {
    title: "Canyon Retreat",
    address: "567 Laurel Canyon Blvd, Beverly Hills",
    price: "$1,675,000",
    beds: 4,
    baths: 3.5,
    sqft: "3,100",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    status: "New Listing",
  },
  {
    title: "Downtown Luxury Condo",
    address: "888 Wilshire Blvd, Los Angeles",
    price: "$725,000",
    beds: 2,
    baths: 2,
    sqft: "1,450",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    status: null,
  },
];

// Market expertise
const expertiseCards = [
  {
    icon: IconMap,
    title: "Local Market Knowledge",
    description: "Hyper-local insights into neighborhoods, including school districts and future development plans.",
  },
  {
    icon: IconHeartHandshake,
    title: "Expert Negotiation",
    description: "A master of tactical negotiation to ensure you get the best possible terms in any market.",
  },
  {
    icon: IconTargetArrow,
    title: "Digital Marketing Strategy",
    description: "Cutting-edge SEO and social media placement to put your listing in front of qualified buyers.",
  },
];

// Awards & certifications
const awards = [
  {
    title: "Five Star Real Estate Agent",
    description: "Recognized for excellence in client service for 8 consecutive years.",
  },
  {
    title: "Certified Luxury Home Marketing Specialist (CLHMS)",
    description: "Expertise in the upper-tier residential market.",
  },
  {
    title: "Accredited Buyer's Representative (ABR)",
    description: "Specialized training in representing buyers throughout the transaction.",
  },
];

// Blog posts
const blogPosts = [
  {
    title: "Real Estate Forecast 2024: What Buyers Need to Know",
    date: "March 15, 2024",
    category: "Market Trends",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  },
  {
    title: "The Ultimate Checklist for First-Time Homebuyers",
    date: "March 10, 2024",
    category: "Home Buying Tips",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    title: "Maximizing ROI: High-Impact Home Improvements",
    date: "March 02, 2024",
    category: "Selling",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
];

export default function AgentProfilePage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const listingsRef = useRef(null);
  const expertiseRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const listingsInView = useInView(listingsRef, { once: true, margin: "-100px" });
  const expertiseInView = useInView(expertiseRef, { once: true, margin: "-100px" });
  const blogInView = useInView(blogRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative overflow-hidden">
        {/* Hero Section - About */}
        <section ref={heroRef} className="relative pt-32 pb-20 md:pb-28 px-4 md:px-8 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(to right, #d5b367 1px, transparent 1px), linear-gradient(to bottom, #d5b367 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}
            />
            {/* Gradient Orbs */}
            <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[#d5b367]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d5b367]/5 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Agent Image */}
              <motion.div
                className="lg:col-span-5 relative group order-2 lg:order-1"
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-6 bg-gradient-to-br from-[#d5b367]/30 via-[#d5b367]/10 to-transparent rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition duration-700" />
                {/* Decorative Border */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#d5b367]/50 via-transparent to-[#d5b367]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#d5b367]/10">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                    alt="Professional Real Estate Agent"
                    fill
                    className="object-cover grayscale-[30%] hover:grayscale-0 transition duration-700"
                    priority
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
                </div>
                {/* Floating Badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-6 bg-[#d5b367] text-[#0a0a0a] px-5 py-3 rounded-xl shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <IconStar className="w-5 h-5 fill-current" />
                    <span className="font-bold">Top 1% Agent</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Agent Info */}
              <motion.div
                className="lg:col-span-7 space-y-8 order-1 lg:order-2"
                initial={{ opacity: 0, x: 40 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-5">
                  {/* Tagline */}
                  <motion.p
                    className="text-[#d5b367] font-semibold tracking-wider uppercase text-sm flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <IconSparkles className="w-4 h-4" />
                    Your Trusted Real Estate Expert
                  </motion.p>

                  {/* Name */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                    John <span className="bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">Smith</span>
                  </h1>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="px-4 py-2 rounded-full bg-[#d5b367]/10 text-[#d5b367] text-xs font-semibold uppercase tracking-wider border border-[#d5b367]/30 flex items-center gap-2">
                      <IconHome className="w-3.5 h-3.5" />
                      Buyer Specialist
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-xs font-semibold uppercase tracking-wider border border-white/20 flex items-center gap-2">
                      <IconCash className="w-3.5 h-3.5" />
                      Seller Specialist
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-xs font-semibold uppercase tracking-wider border border-white/20 flex items-center gap-2">
                      <IconChartLine className="w-3.5 h-3.5" />
                      Investment Expert
                    </span>
                  </div>

                  {/* License & Experience */}
                  <div className="flex flex-col space-y-3 text-base text-white/60 pt-2">
                    <p className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#d5b367]/10">
                        <IconShieldCheck className="w-4 h-4 text-[#d5b367]" />
                      </span>
                      License #123456 — Real Estate Commission
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#d5b367]/10">
                        <IconClock className="w-4 h-4 text-[#d5b367]" />
                      </span>
                      12+ Years of Elite Real Estate Experience
                    </p>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <motion.div
                  className="grid grid-cols-3 gap-4 py-6 border-y border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-white">500<span className="text-[#d5b367]">+</span></p>
                    <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Homes Sold</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <p className="text-3xl md:text-4xl font-bold text-white">$150<span className="text-[#d5b367]">M</span></p>
                    <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Sales Volume</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-white">4.9<span className="text-[#d5b367]">★</span></p>
                    <p className="text-xs text-white/50 uppercase tracking-wider mt-1">Client Rating</p>
                  </div>
                </motion.div>

                {/* Service Areas */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <IconMapPin className="w-3.5 h-3.5" />
                    Primary Service Areas
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Beverly Hills", "Malibu", "Santa Monica"].map((area, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-lg bg-white/5 text-white font-medium border border-white/10 text-sm hover:border-[#d5b367]/30 hover:bg-[#d5b367]/5 transition-all cursor-default"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Get in Touch Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#d5b367] hover:text-[#e8d5a3] transition-colors font-medium"
                  >
                    <IconMail className="w-5 h-5" />
                    Get in Touch
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Professional Story Section */}
        <section ref={storyRef} className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0a]">
          {/* Subtle ambient glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-[#d5b367]/5 rounded-full blur-[100px]" />
          <div className="absolute top-0 left-1/3 w-[400px] h-[200px] bg-[#d5b367]/3 rounded-full blur-[80px]" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Badge>About Me</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-6">
                My <span className="bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">Story</span>
              </h2>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Story Text & Quote */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                  <p>
                    With over a decade of dedicated service in the luxury real estate market, I have built a reputation based on transparency, expertise, and a relentless commitment to my clients&apos; success.
                  </p>
                  <p>
                    Whether you are a first-time homebuyer navigating the complexities of the market or a seasoned investor looking for prime opportunities, my goal is to provide seamless, data-driven guidance at every step.
                  </p>
                </div>

                {/* Quote Box */}
                <motion.div
                  className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#d5b367]/10 via-[#d5b367]/5 to-transparent border border-[#d5b367]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <IconQuote className="absolute top-4 left-4 w-8 h-8 text-[#d5b367]/30" />
                  <p className="text-xl md:text-2xl font-medium text-white italic pl-8">
                    &quot;My mission is to make real estate transactions as seamless and rewarding as possible for every client I serve.&quot;
                  </p>
                  <div className="mt-4 pl-8 flex items-center gap-3">
                    <div className="w-10 h-px bg-[#d5b367]" />
                    <span className="text-[#d5b367] font-semibold">John Smith</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Key Highlights Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 30 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {[
                  {
                    icon: IconRocket,
                    title: "Results-Driven",
                    description: "Proven track record of exceeding client expectations and closing deals efficiently."
                  },
                  {
                    icon: IconEye,
                    title: "Market Vision",
                    description: "Deep insight into market trends and emerging opportunities in luxury real estate."
                  },
                  {
                    icon: IconHeart,
                    title: "Client-Centric",
                    description: "Your goals become my mission. Personalized service tailored to your needs."
                  },
                  {
                    icon: IconAward,
                    title: "Award-Winning",
                    description: "Recognized as a top performer with multiple industry awards and certifications."
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d5b367]/30 hover:bg-white/[0.04] transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={storyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#d5b367]/10 flex items-center justify-center mb-4 group-hover:bg-[#d5b367]/20 transition-colors">
                      <item.icon className="w-6 h-6 text-[#d5b367]" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Approach Statement */}
            <motion.div
              className="mt-16 text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={storyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-white/50 text-base leading-relaxed">
                My approach combines <span className="text-[#d5b367] font-medium">modern digital marketing strategies</span> with <span className="text-[#d5b367] font-medium">proven negotiation techniques</span> to ensure my clients get the best possible value in today&apos;s competitive landscape.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="relative py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge>What I Offer</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 mt-6">
                Services <span className="bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">Offered</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Comprehensive real estate solutions tailored to your unique lifestyle and financial goals.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d5b367]/30 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <service.icon className="w-10 h-10 text-[#d5b367] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="relative py-16 bg-[#d5b367]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-bold text-[#0a0a0a] mb-2">
                    {stat.prefix}
                    {stat.isDecimal ? stat.value : <AnimatedCounter end={stat.value} />}
                    {stat.suffix}
                  </p>
                  <p className="text-[#0a0a0a]/70 uppercase tracking-widest text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section ref={listingsRef} className="relative py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={listingsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge>Properties</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
                Featured <span className="bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">Listings</span>
              </h2>
              <p className="text-white/60 mt-2 max-w-2xl mx-auto">Handpicked properties currently active in the market.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings.map((listing, idx) => (
                <motion.div
                  key={listing.title}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={listingsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] border border-white/10">
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />
                    {listing.status && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded text-xs font-bold uppercase text-[#0a0a0a]">
                        {listing.status}
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-2xl font-bold text-white drop-shadow-lg">{listing.price}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{listing.title}</h3>
                  <p className="text-white/60 flex items-center gap-1 mt-1">
                    <IconMapPin className="w-4 h-4" />
                    {listing.address}
                  </p>
                  <div className="flex gap-4 mt-3 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <IconBed className="w-4 h-4" /> {listing.beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <IconBath className="w-4 h-4" /> {listing.baths} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <IconRuler className="w-4 h-4" /> {listing.sqft} sqft
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Expertise Section */}
        <section ref={expertiseRef} className="relative py-24 px-4 md:px-8 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge>Credentials</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 mt-6">
                Market <span className="bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">Expertise</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Elite credentials and specialized strategic knowledge to give you the competitive edge.
              </p>
            </motion.div>

            {/* Expertise Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {expertiseCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d5b367]/30 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <card.icon className="w-12 h-12 text-[#d5b367] mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Awards & Volume */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Awards */}
              <motion.div
                className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10"
                initial={{ opacity: 0, x: -30 }}
                animate={expertiseInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <IconTrophy className="w-8 h-8 text-[#d5b367]" />
                  <h3 className="text-2xl font-bold text-white">Awards & Certifications</h3>
                </div>
                <ul className="space-y-6 mb-8">
                  {awards.map((award, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <IconCheck className="w-5 h-5 text-[#d5b367] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-white">{award.title}</p>
                        <p className="text-sm text-white/60">{award.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-6">Industry Associations</p>
                  <div className="flex flex-wrap items-center gap-8 text-white/40">
                    <span className="text-xl font-black italic tracking-tighter">NAR</span>
                    <span className="text-xl font-black italic tracking-tighter">TAR</span>
                    <span className="text-xl font-black italic tracking-tighter">CREA</span>
                    <span className="text-xl font-black italic tracking-tighter">LUXE</span>
                  </div>
                </div>
              </motion.div>

              {/* Transaction Volume */}
              <motion.div
                className="p-8 md:p-10 rounded-3xl bg-[#d5b367] text-[#0a0a0a] flex flex-col justify-center relative overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                animate={expertiseInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-24 -mt-24 blur-3xl" />
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#0a0a0a]/20 text-[#0a0a0a] text-xs font-bold uppercase tracking-widest mb-6">
                    Transaction Volume Range
                  </span>
                  <h4 className="text-5xl md:text-6xl font-black mb-4">$100M - $250M</h4>
                  <p className="text-[#0a0a0a]/70 text-lg max-w-sm">
                    Total lifetime transaction volume successfully closed for clients across the region.
                  </p>
                  <div className="mt-12 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-[#0a0a0a]/20 border-2 border-[#d5b367]" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Trusted by 500+ Local Families</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog/Resources Section */}
        <section ref={blogRef} className="relative py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={blogInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Badge>Resources</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">
                Latest <span className="bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">Insights</span>
              </h2>
              <p className="text-white/60 mt-2 max-w-2xl mx-auto">Expert advice and market analysis to help you make informed decisions.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, idx) => (
                <motion.div
                  key={post.title}
                  className="group rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#d5b367]/30 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={blogInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#d5b367] text-[#0a0a0a] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-white/40 text-xs font-medium mb-3 uppercase">{post.date}</p>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#d5b367] transition-colors leading-tight">
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Background Image */}
        <section ref={contactRef} className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
              alt="Modern Office"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/80" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge>Get Started</Badge>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 mt-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to Elevate Your<br />
              <span className="bg-gradient-to-r from-[#d5b367] via-[#e8d5a3] to-[#d5b367] bg-clip-text text-transparent">Online Presence?</span>
            </motion.h2>

            <motion.p
              className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Schedule a free consultation and let&apos;s discuss how an SEO-optimized agent profile can help you attract more qualified leads and grow your real estate business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <MagneticButton variant="primary" href="/contact">
                Book a Free Call
              </MagneticButton>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-white/50 text-sm mb-2">Or email us directly at</p>
              <a
                href="mailto:info@marketlyn.com"
                className="inline-flex items-center gap-2 text-[#d5b367] hover:text-[#e8d5a3] transition-colors"
              >
                <IconMail className="w-5 h-5" />
                info@marketlyn.com
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
