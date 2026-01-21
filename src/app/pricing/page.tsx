"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight";
import MagneticButton from "@/components/ui/magnetic-button";
import Image from "next/image";
import {
  IconCrown,
  IconShieldCheck,
  IconTargetArrow,
  IconUsers,
  IconCurrencyDollar,
  IconBrandInstagram,
  IconMail,
  IconSeo,
  IconCheck,
  IconX,
  IconRocket,
  IconBolt,
  IconDiamond,
  IconUsersGroup,
  IconChevronDown,
  IconArrowUpRight,
  IconPhone,
  IconMessageCircle,
  IconBrandWhatsapp,
  IconCalendarEvent,
  IconRobot,
  IconWorld,
  IconCreditCard,
  IconSpeakerphone,
  IconChartPie,
  IconDatabase,
  IconHeadset,
  IconAutomation,
  IconDeviceMobile,
  IconPlugConnected,
  IconClock,
  IconTrendingUp,
} from "@tabler/icons-react";
import siteConfig from "@/config/site.json";

// Logo data for marquee
const brokerageLogos = [
  { name: "Partner 1", logo: "/logos/1.png", scale: 1, keepColor: false },
  { name: "Partner 2", logo: "/logos/2.png", scale: 1, keepColor: false },
  { name: "Zillow", logo: "/logos/33.png", scale: 1, keepColor: true },
  { name: "Partner 4", logo: "/logos/4.png", scale: 1, keepColor: false },
  { name: "Partner 5", logo: "/logos/5.png", scale: 1, keepColor: false },
  { name: "Partner 6", logo: "/logos/6.png", scale: 1.1, keepColor: false },
  { name: "Partner 7", logo: "/logos/7.png", scale: 1.2, keepColor: false },
  { name: "Partner 8", logo: "/logos/8.png", scale: 1, keepColor: false },
  { name: "Partner 9", logo: "/logos/9.png", scale: 1.1, keepColor: false },
  { name: "Partner 10", logo: "/logos/10.png", scale: 1.3, keepColor: false },
  { name: "Partner 11", logo: "/logos/11.png", scale: 1.3, keepColor: false },
  { name: "Partner 12", logo: "/logos/12.png", scale: 1.1, keepColor: false },
  { name: "Partner 13", logo: "/logos/13.png", scale: 1, keepColor: false },
];

// Why choose us features
const whyChooseFeatures = [
  {
    icon: IconCrown,
    title: "Exclusivity Guaranteed",
    description: "We ensure our Referrals are exclusive to you, never shared with your competitors.",
  },
  {
    icon: IconShieldCheck,
    title: "Quality Assured",
    description: "Beyond market share, we guarantee the quality of Referrals you've purchased.",
  },
  {
    icon: IconTargetArrow,
    title: "Targeted Locally",
    description: "Dominate your local market with Referrals tailored to your preferred areas.",
  },
  {
    icon: IconUsers,
    title: "Expertly Curated",
    description: "Save time with referrals powered by Internal Sales Agents (ISA) — going beyond the norm to ensure your success.",
  },
];

// Proven channels
const provenChannels = [
  {
    icon: IconCurrencyDollar,
    title: "Paid Advertising",
    description: "We drive targeted traffic and generate high-quality leads by running strategic PPC campaigns across search engines and social media platforms.",
  },
  {
    icon: IconBrandInstagram,
    title: "Social Media Campaigns",
    description: "We build brand awareness and engage prospects with creative ads and organic outreach on the most relevant social channels for your audience.",
  },
  {
    icon: IconMail,
    title: "Email Marketing",
    description: "We nurture leads and boost conversions by creating personalized, automated email sequences that keep your brand front and center.",
  },
  {
    icon: IconSeo,
    title: "SEO & Content Marketing",
    description: "We attract motivated prospects and improve your online presence by producing optimized content and enhancing your search engine visibility.",
  },
];

// Process accordion items
const processItems = [
  {
    title: "Referral Generation at Marketlyn",
    content: "We generate high-quality referrals using a blend of strategic PPC, SEO, social media marketing, organic website traffic, and trusted partner platforms. Our multi-channel outreach ensures a steady stream of qualified prospects ready to engage with your business.",
  },
  {
    title: "Referral Verification Process",
    content: "Every referral goes through our rigorous verification process to ensure they are genuine, interested, and ready to take action. We verify contact information and intent before passing leads to you.",
  },
  {
    title: "Appointment Scheduling",
    content: "Our team handles the scheduling process, setting up appointments at times that work for both you and your prospects. No more phone tag or missed opportunities.",
  },
  {
    title: "Referral Distribution & Relationship Building",
    content: "Referrals are distributed exclusively to you in your chosen areas. We help you build lasting relationships with prospects through our ongoing support system.",
  },
  {
    title: "Ongoing Support",
    content: "Our dedicated support team is always available to help you maximize your results. From strategy adjustments to technical assistance, we're here for you.",
  },
];

// Comparison table data
const comparisonRows = [
  { feature: "Subscription Cost", marketlyn: "$399 - $1,495 one-time fee", competitor1: "$200+/month*, up to $1000+/month*", competitor2: "$150 per referral*" },
  { feature: "Referral Exclusivity", marketlyn: "Exclusive referrals", competitor1: "Varies with subscription tier", competitor2: "First-come, first-served" },
  { feature: "Consistent Pricing", marketlyn: "Stable rates", competitor1: "Interest and market-driven variability", competitor2: "Sort by property costs and area competition" },
  { feature: "Preferred Area Selection", marketlyn: "Scheduled appts from your zip codes", competitor1: "Agents can purchase exclusive zip codes", competitor2: "Limited due to high competition" },
  { feature: "Referral Generation", marketlyn: "Geo-targeted campaigns on multiple platforms", competitor1: "Campaigns across various platforms", competitor2: "Listings/ads on own/other platforms" },
  { feature: "Contact Confirmation", marketlyn: true, competitor1: false, competitor2: true },
  { feature: "Referral Distribution Priority", marketlyn: "Exclusive to you", competitor1: "Referrals placed in a pool for agents in that area", competitor2: "Referrals placed in a pool for agents in that area" },
  { feature: "Customized Advertising Campaigns", marketlyn: true, competitor1: false, competitor2: "Available at an extra cost" },
  { feature: "SEO Optimized Agent Profile", marketlyn: "Included (MarketEdge & ClosePoint)", competitor1: false, competitor2: false },
];

// CRM Add-on pricing
const crmAddon = {
  name: "CRM Add-on",
  originalPrice: "$297",
  discountedPrice: "$197",
  period: "/one-time",
  description: "Full GoHighLevel CRM access",
  features: [
    "Unlimited Contacts",
    "Email & SMS Marketing",
    "Appointment Scheduling",
    "Pipeline Management",
    "Automated Follow-ups",
  ],
};

// Solo pricing plans
const soloPlans = [
  {
    name: "Dealflow",
    icon: IconRocket,
    iconColor: "text-blue-400",
    price: "$399",
    originalPrice: "",
    period: "/one-time",
    tagline: "A steady stream of qualified conversations.",
    bestFor: "Solo agents and newer realtors who want predictable lead flow without complexity.",
    features: [
      "15% Referral Fee",
      "2-3 Exclusive Referrals/month",
      "2-4 Zip Codes/Areas",
      "BDR - Verified",
      "Email Marketing",
    ],
    tag: "Starter",
    tagColor: "bg-blue-500",
    crmOption: "addon",
  },
  {
    name: "MarketEdge",
    icon: IconBolt,
    iconColor: "text-yellow-400",
    price: "$799",
    originalPrice: "$897",
    period: "/one-time",
    tagline: "Be the agent prospects see and speak to first.",
    bestFor: "Agents ready to move from average exposure to local dominance.",
    features: [
      "15% Referral Fee",
      "3-5 Exclusive Referrals/month",
      "5-7 Zip Codes/Areas",
      "Exclusive Scheduled Appointments",
      "BDR - Verified",
      "Email Marketing",
      "SEO Optimized Agent Profile",
      "Priority Support",
    ],
    tag: "Most Popular",
    tagColor: "bg-[#d5b367]",
    crmOption: "addon",
  },
  {
    name: "ClosePoint",
    icon: IconDiamond,
    iconColor: "text-emerald-400",
    price: "$1,495",
    originalPrice: "$1,695",
    period: "/one-time",
    tagline: "Designed for agents who expect efficiency.",
    bestFor: "High performers who want leads closer to decision-making.",
    features: [
      "10% Referral Fee",
      "4-6 Exclusive Referrals/month",
      "Zip Codes/Counties/Cities",
      "Live Transfers",
      "SEO Optimized Agent Profile",
      "Dedicated Support Manager",
      "FREE CRM Included",
    ],
    tag: "Best Results",
    tagColor: "bg-emerald-500",
    crmOption: "included",
  },
];

// Team pricing plans
const teamPlans = [
  {
    name: "Core",
    icon: IconUsersGroup,
    iconColor: "text-purple-400",
    price: "$2,695",
    originalPrice: "",
    period: "/one-time",
    tagline: "Tailored campaigns to fuel small team success.",
    bestFor: "Small teams ready to scale their lead generation together.",
    features: [
      "10% Referral Fee",
      "Up to 5 Agents",
      "2-4 Exclusive Referrals/month per Agent",
      "Zip Codes/Counties/Cities",
      "Live Transfers",
      "Exclusive Scheduled Appointments",
      "BDR - Verified",
      "Free Blog Posting",
      "SEO Optimized Agent Profile (per agent)",
      "SEO Optimized Team Profile",
      "Dedicated Support Manager",
      "FREE CRM Included",
    ],
    tag: "",
    tagColor: "",
  },
  {
    name: "Scale",
    icon: IconTrendingUp,
    iconColor: "text-orange-400",
    price: "$3,899",
    originalPrice: "",
    period: "/one-time",
    tagline: "Scalable lead generation for larger teams.",
    bestFor: "Growing teams who need maximum coverage and support.",
    features: [
      "10% Referral Fee",
      "Up to 10 Agents",
      "2-4 Exclusive Referrals/month per Agent",
      "Zip Codes/Counties/Cities",
      "Live Transfers",
      "Exclusive Scheduled Appointments",
      "BDR - Verified",
      "Free Blog Posting",
      "SEO Optimized Agent Profile (per agent)",
      "SEO Optimized Team Profile",
      "Dedicated Support Manager",
      "FREE CRM Included",
      "Priority Support",
    ],
    tag: "Best Value",
    tagColor: "bg-orange-500",
  },
];

// CRM Perks - GoHighLevel Features
const crmPerks = [
  {
    icon: IconRocket,
    title: "Unlimited Sub-Accounts",
    description: "Create unlimited client accounts with their own branded CRM portal.",
    highlight: true,
  },
  {
    icon: IconMail,
    title: "Email Marketing",
    description: "Unlimited emails with drag-and-drop builder and automation.",
  },
  {
    icon: IconMessageCircle,
    title: "2-Way SMS & MMS",
    description: "Text your leads directly from the CRM with automated responses.",
  },
  {
    icon: IconBrandWhatsapp,
    title: "WhatsApp Integration",
    description: "Connect with clients via WhatsApp for instant communication.",
  },
  {
    icon: IconCalendarEvent,
    title: "Appointment Booking",
    description: "Online booking calendar with automated reminders.",
  },
  {
    icon: IconRobot,
    title: "AI-Powered Chatbot",
    description: "24/7 lead capture and qualification with intelligent AI.",
  },
  {
    icon: IconWorld,
    title: "Website & Funnel Builder",
    description: "Create landing pages and sales funnels with no code.",
  },
  {
    icon: IconCreditCard,
    title: "Payment Processing",
    description: "Accept payments, create invoices, and manage subscriptions.",
  },
  {
    icon: IconSpeakerphone,
    title: "Reputation Management",
    description: "Automated review requests and monitoring across platforms.",
  },
  {
    icon: IconChartPie,
    title: "Advanced Analytics",
    description: "Detailed reporting on campaigns and revenue performance.",
  },
  {
    icon: IconDatabase,
    title: "Pipeline Management",
    description: "Visual drag-and-drop pipeline with custom stages.",
  },
  {
    icon: IconHeadset,
    title: "Call Tracking & Recording",
    description: "Track calls, record conversations, and analyze performance.",
  },
];

// CRM Benefits
const crmBenefits = [
  {
    icon: IconClock,
    stat: "10+ Hours",
    label: "Saved Weekly",
    description: "Automate repetitive tasks",
  },
  {
    icon: IconTrendingUp,
    stat: "40%",
    label: "More Conversions",
    description: "With automated follow-ups",
  },
  {
    icon: IconCurrencyDollar,
    stat: "3x",
    label: "ROI Increase",
    description: "Triple your marketing ROI",
  },
  {
    icon: IconUsers,
    stat: "500+",
    label: "Agents Using",
    description: "Join successful agents",
  },
];

// Tools CRM Replaces
const toolsReplaced = [
  { name: "Mailchimp", cost: "$99/mo", icon: IconMail },
  { name: "Calendly", cost: "$16/mo", icon: IconCalendarEvent },
  { name: "ClickFunnels", cost: "$127/mo", icon: IconWorld },
  { name: "ActiveCampaign", cost: "$149/mo", icon: IconAutomation },
  { name: "CallRail", cost: "$45/mo", icon: IconHeadset },
];

// FAQ items
const faqItems = [
  {
    question: "How does Marketlyn generate high-quality leads?",
    answer: "We use a combination of paid advertising, SEO, social media marketing, and strategic partnerships to generate leads. Each lead is verified by our internal team before being passed to you.",
  },
  {
    question: "What sets Marketlyn's referrals apart from others?",
    answer: "Our referrals are exclusive to you - we never share them with competitors in your area. Each referral is ISA qualified and verified, ensuring higher conversion rates.",
  },
  {
    question: "How many referrals do I get per month?",
    answer: "The number of referrals depends on your plan. Dealflow receives 2-3 referrals/month, MarketEdge receives 3-5, and ClosePoint receives 4-6 exclusive referrals per month.",
  },
  {
    question: "How do I sign up to receive referrals from Marketlyn?",
    answer: "Simply choose a plan that fits your needs and click 'Claim my area'. Our team will reach out to set up your account and preferred areas within 24 hours.",
  },
  {
    question: "How does Marketlyn nurture/verify the referrals?",
    answer: "Our Business Development Representatives (BDRs) verify each lead through phone calls and email confirmation. We ensure the prospect is genuinely interested before scheduling appointments.",
  },
  {
    question: "What is Marketlyn's referral fee structure?",
    answer: "Referral fees range from 10-15% depending on your plan. ClosePoint and Team plans enjoy lower referral fees at 10%, while Dealflow and MarketEdge plans have a 15% referral fee.",
  },
];

export default function PricingPage() {
  const [planType, setPlanType] = useState<"solo" | "team">("solo");
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentPlans = planType === "solo" ? soloPlans : teamPlans;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#161616]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative pt-32 pb-20 overflow-hidden">

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #d5b367 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Top-right floating ambient blob */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#d5b367]/5 blur-[120px]" />

          {/* Left-side floating ambient blob */}
          <div className="absolute top-1/4 -left-60 w-[500px] h-[500px] rounded-full bg-[#d5b367]/3 blur-[100px]" />

          {/* Center glow for pricing section */}
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#d5b367]/5 blur-[150px]" />

          {/* Bottom-right ambient blob */}
          <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full bg-emerald-500/3 blur-[100px]" />
        </div>

        {/* Section 1: Hero Header */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#b49146] to-[#e8d5a3] mr-2" />
              {siteConfig.name}&apos;s Lead Generation
            </Badge>
            <h1 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Our Proven approach to<br />
              <span className="bg-gradient-to-r from-[#e8d5a3] via-[#fff8e7] to-[#e8d5a3] bg-clip-text text-transparent">
                Lead Generation.
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/60 max-w-3xl mx-auto">
              We blend a mixture of Human and AI-powered qualification, multi-channel outreach, and targeted marketing strategies to consistently deliver high-intent leads ready to engage with your business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton variant="primary" href="#plans">
                View Plans
              </MagneticButton>
              <MagneticButton variant="secondary" href="#how-we-work">
                How We Work
              </MagneticButton>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Logo Marquee */}
        <section className="relative z-10 w-full md:w-[60%] mx-auto mb-24 px-0">
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div className="flex w-max animate-marquee">
              {/* First set of logos */}
              {brokerageLogos.map((brokerage, idx) => (
                <div
                  key={`first-${idx}`}
                  className="relative h-12 w-24 md:h-12 md:w-36 mx-4 md:mx-6 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <Image
                    src={brokerage.logo}
                    alt={brokerage.name}
                    fill
                    className={`object-contain ${brokerage.keepColor ? "" : "[filter:brightness(0)_invert(1)]"}`}
                    sizes="(max-width: 768px) 96px, 150px"
                    style={{ transform: `scale(${brokerage.scale})` }}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {brokerageLogos.map((brokerage, idx) => (
                <div
                  key={`second-${idx}`}
                  className="relative h-12 w-24 md:h-12 md:w-36 mx-4 md:mx-6 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <Image
                    src={brokerage.logo}
                    alt={brokerage.name}
                    fill
                    className={`object-contain ${brokerage.keepColor ? "" : "[filter:brightness(0)_invert(1)]"}`}
                    sizes="(max-width: 768px) 96px, 150px"
                    style={{ transform: `scale(${brokerage.scale})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Why Choose Marketlyn */}
        <section id="how-we-work" className="relative z-10 max-w-6xl mx-auto px-4 mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Why choose {siteConfig.name}?
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              In the luxury real estate world, quality leads are the key to successful sales campaigns. Our approach? Precision-targeted, visually striking, compelling campaigns that convert.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyChooseFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <SpotlightCard className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#d5b367]/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#d5b367]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/60">{feature.description}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4: Proven Channels */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative h-[500px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
                alt="Strategic Planning"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Proven Channels
              </h2>
              <p className="text-white/60 mb-8">
                We create dynamic and multifaceted sales strategies that employ a wide variety of channels to capture attention. For us, it&apos;s not about flooding your pipeline with leads—it&apos;s about curating connections that count.
              </p>

              <div className="space-y-6">
                {provenChannels.map((channel, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <channel.icon className="w-5 h-5 text-[#d5b367]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{channel.title}</h4>
                      <p className="text-sm text-white/50">{channel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: At Marketlyn, we simplify */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 mb-32">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            At {siteConfig.name}, we simplify.
          </motion.h2>
          <motion.p
            className="text-white/60 mb-12 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our goal is to connect businesses with qualified prospects, giving them the opportunity to grow and expand their reach.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
                  alt="Team collaboration"
                  fill
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
              </div>
              <div className="flex gap-2">
                {["Lead Generation", "Lead Qualification", "Lead Nurturing"].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      activeTab === idx
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-white/50 hover:text-white/70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {processItems.map((item, idx) => (
                <div
                  key={idx}
                  className="border-b border-white/10"
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-lg font-medium text-white">{item.title}</span>
                    <motion.div
                      animate={{ rotate: openAccordion === idx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {openAccordion === idx ? (
                        <IconX className="w-5 h-5 text-white/50" />
                      ) : (
                        <IconChevronDown className="w-5 h-5 text-white/50" />
                      )}
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openAccordion === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-white/60">{item.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 6: Comparison Table */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 mb-32">
          <motion.h2
            className="text-3xl font-bold text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Comparison Table
          </motion.h2>

          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-4 text-left text-white/50 font-normal"></th>
                  <th className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b49146] to-[#e8d5a3] flex items-center justify-center">
                        <span className="text-[#161616] font-bold text-sm">M</span>
                      </div>
                      <span className="text-white font-bold">{siteConfig.name}</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center text-white/70">realtor.com</th>
                  <th className="py-4 px-4 text-center text-white/70">Zillow</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/60">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.marketlyn === "boolean" ? (
                        row.marketlyn ? (
                          <IconCheck className="w-5 h-5 text-[#d5b367] mx-auto" />
                        ) : (
                          <IconX className="w-5 h-5 text-white/30 mx-auto" />
                        )
                      ) : (
                        <span className="text-white text-sm">{row.marketlyn}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.competitor1 === "boolean" ? (
                        row.competitor1 ? (
                          <IconCheck className="w-5 h-5 text-[#d5b367] mx-auto" />
                        ) : (
                          <IconX className="w-5 h-5 text-white/30 mx-auto" />
                        )
                      ) : (
                        <span className="text-white/50 text-sm">{row.competitor1}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.competitor2 === "boolean" ? (
                        row.competitor2 ? (
                          <IconCheck className="w-5 h-5 text-[#d5b367] mx-auto" />
                        ) : (
                          <IconX className="w-5 h-5 text-white/30 mx-auto" />
                        )
                      ) : (
                        <span className="text-white/50 text-sm">{row.competitor2}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>

        {/* Section 7: Pricing Plans */}
        <section id="plans" className="relative z-10 max-w-6xl mx-auto px-4 mb-32">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge>Pricing</Badge>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Great plans, right prices.
            </h2>
            <p className="mt-4 text-white/60">
              Choose a plan that fits your business needs
            </p>

            {/* Solo/Team Toggle Switch */}
            <div className="mt-8 inline-flex items-center gap-5">
              <span
                className={`text-lg font-bold transition-all cursor-pointer ${
                  planType === "solo" ? "text-white scale-105" : "text-white/40 hover:text-white/60"
                }`}
                onClick={() => setPlanType("solo")}
              >
                Solo
              </span>
              <button
                onClick={() => setPlanType(planType === "solo" ? "team" : "solo")}
                className="relative w-16 h-8 rounded-full bg-[#d5b367] p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d5b367]/50"
                aria-label="Toggle between Solo and Team plans"
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-[#161616] shadow-md"
                  animate={{ x: planType === "team" ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={`text-lg font-bold transition-all cursor-pointer ${
                  planType === "team" ? "text-white scale-105" : "text-white/40 hover:text-white/60"
                }`}
                onClick={() => setPlanType("team")}
              >
                Team
              </span>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={planType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-6 ${
                planType === "solo" ? "md:grid-cols-3" : "md:grid-cols-2 max-w-4xl mx-auto"
              }`}
            >
              {currentPlans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative rounded-2xl p-6 ${
                    plan.tag === "Most Popular"
                      ? "bg-gradient-to-b from-[#d5b367]/20 to-transparent border-2 border-[#d5b367]/50"
                      : plan.tag === "Best Results"
                      ? "bg-gradient-to-b from-emerald-500/20 to-transparent border-2 border-emerald-500/50"
                      : "bg-white/[0.02] border border-white/10"
                  }`}
                >
                  {plan.tag && (
                    <div className="absolute -top-3 right-6">
                      <span className={`px-3 py-1 text-xs font-medium ${plan.tagColor} text-white rounded-full`}>
                        {plan.tag}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <plan.icon className={`w-6 h-6 ${plan.iconColor || "text-white/70"}`} />
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  </div>

                  <div className="mb-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-white/40 line-through mr-2">{plan.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/50">{plan.period}</span>
                  </div>

                  <p className="text-[#d5b367] text-sm font-medium mb-2">{plan.tagline}</p>
                  <p className="text-white/50 text-xs mb-6">Best for: {plan.bestFor}</p>

                  <div>
                    <p className="text-sm font-medium text-white mb-4">What&apos;s Included:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-3">
                          <IconCheck className="w-5 h-5 text-[#d5b367] flex-shrink-0 mt-0.5" />
                          <span className={`text-sm ${feature.includes("FREE CRM") ? "text-[#d5b367] font-medium" : "text-white/70"}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/contact"
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium transition-all mt-6 ${
                      plan.tag === "Most Popular"
                        ? "bg-[#d5b367] text-[#161616] hover:bg-[#c9a555]"
                        : plan.tag === "Best Results" || plan.tag === "Best Value"
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    Claim My Area
                    <IconArrowUpRight className="w-4 h-4" />
                  </a>

                  {/* CRM Add-on Section */}
                  {planType === "solo" && (plan as typeof soloPlans[0]).crmOption === "addon" && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <IconDeviceMobile className="w-5 h-5 text-[#d5b367]" />
                          <span className="text-sm font-medium text-white">Add CRM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40 line-through">{crmAddon.originalPrice}</span>
                          <span className="text-sm font-bold text-[#d5b367]">{crmAddon.discountedPrice}</span>
                        </div>
                      </div>
                      <p className="text-xs text-white/50 mb-3">
                        Full GoHighLevel CRM access with unlimited contacts, automation & more.
                      </p>
                      <a
                        href="/contact"
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-[#d5b367]/10 text-[#d5b367] border border-[#d5b367]/30 hover:bg-[#d5b367]/20 transition-all"
                      >
                        Add CRM to this plan
                        <IconArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {/* CRM Included Badge for Premium */}
                  {planType === "solo" && (plan as typeof soloPlans[0]).crmOption === "included" && (
                    <div className="mt-6 pt-6 border-t border-[#d5b367]/20">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#d5b367]/10 border border-[#d5b367]/30">
                        <div className="w-10 h-10 rounded-lg bg-[#d5b367]/20 flex items-center justify-center flex-shrink-0">
                          <IconDeviceMobile className="w-5 h-5 text-[#d5b367]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#d5b367]">CRM Included Free!</p>
                          <p className="text-xs text-white/50">$297 value included at no extra cost</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Commitment Note */}
        </section>

        {/* Section 8: CRM Services */}
        <section id="crm" className="relative z-10 max-w-6xl mx-auto px-4 mb-32">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge>
              <IconDeviceMobile className="w-4 h-4 mr-2" />
              CRM Services
            </Badge>
            <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Your Complete Real Estate{" "}
              <span className="bg-gradient-to-r from-[#e8d5a3] via-[#fff8e7] to-[#e8d5a3] bg-clip-text text-transparent">
                Business Hub
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
              Powered by GoHighLevel – the #1 all-in-one platform trusted by 100,000+ businesses.
              We set it up, customize it for real estate, and manage it so you can focus on closing deals.
            </p>
          </motion.div>

          {/* CRM Benefits Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {crmBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#d5b367]/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#d5b367]/20 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-5 h-5 text-[#d5b367]" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{benefit.stat}</div>
                <div className="text-sm text-[#d5b367] font-medium">{benefit.label}</div>
                <p className="text-xs text-white/50 mt-1">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CRM Perks Grid */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Everything Included with {siteConfig.name} CRM
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crmPerks.map((perk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-4 rounded-xl border transition-all ${
                    perk.highlight
                      ? "bg-gradient-to-br from-[#d5b367]/20 to-transparent border-[#d5b367]/40"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      perk.highlight ? "bg-[#d5b367]/30" : "bg-white/5"
                    }`}>
                      <perk.icon className={`w-4 h-4 ${perk.highlight ? "text-[#d5b367]" : "text-white/60"}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{perk.title}</h4>
                      <p className="text-xs text-white/50">{perk.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Replace Your Tech Stack */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Tools You Replace */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <IconX className="w-5 h-5 text-red-400" />
                What You&apos;re Currently Paying
              </h4>
              <div className="space-y-3">
                {toolsReplaced.map((tool, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <tool.icon className="w-4 h-4 text-white/40" />
                      <span className="text-white/70 text-sm">{tool.name}</span>
                    </div>
                    <span className="text-red-400 font-medium text-sm">{tool.cost}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-white/60 text-sm">Total Monthly Cost</span>
                <span className="text-xl font-bold text-red-400">$436+/mo</span>
              </div>
            </div>

            {/* What You Get */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d5b367]/10 to-transparent border border-[#d5b367]/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <IconCheck className="w-5 h-5 text-green-400" />
                What You Get with {siteConfig.name}
              </h4>
              <div className="space-y-2 mb-6">
                {[
                  "All-in-one CRM platform",
                  "Unlimited contacts & emails",
                  "SMS & WhatsApp messaging",
                  "Funnel & website builder",
                  "Appointment scheduling",
                  "Marketing automation",
                  "Mobile app access",
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <IconCheck className="w-4 h-4 text-[#d5b367]" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-[#d5b367]/20 text-center">
                <p className="text-xs text-white/60 mb-1">Included with ClosePoint and Team Plans</p>
                <p className="text-2xl font-bold text-white">FREE CRM</p>
                <p className="text-xs text-[#d5b367] mt-1">$197/mo value included</p>
              </div>
            </div>
          </motion.div>

          {/* Mobile App Highlight */}
          <motion.div
            className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#d5b367]/20 flex items-center justify-center flex-shrink-0">
              <IconDeviceMobile className="w-8 h-8 text-[#d5b367]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-2">Run Your Business From Anywhere</h4>
              <p className="text-white/60 text-sm">
                The full power of your CRM in your pocket. Respond to leads instantly, manage appointments,
                and close deals on the go with our mobile app for iOS and Android.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconPlugConnected className="w-5 h-5 text-[#d5b367]" />
              <span className="text-white/60 text-sm">50+ Integrations</span>
            </div>
          </motion.div>
        </section>

        {/* Section 9: FAQ */}
        <section className="relative z-10 max-w-3xl mx-auto px-4 mb-32">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              We&apos;re here to help
            </h2>
            <p className="mt-4 text-white/60">
              FAQs designed to provide the information you need.
            </p>
          </motion.div>

          <div className="space-y-2">
            {faqItems.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconChevronDown className="w-5 h-5 text-white/50 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-white/60">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 9: Contact CTA */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SpotlightCard className="text-center py-16 bg-gradient-to-br from-white/[0.08] to-transparent">
              <Badge>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#b49146] to-[#e8d5a3] mr-2" />
                {siteConfig.name}
              </Badge>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">
                Questions? Let&apos;s talk about your<br />next big move
              </h2>
              <p className="mt-4 text-white/60 max-w-md mx-auto">
                Hop on a call with us to see how our services can accelerate your growth.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#d5b367] text-[#161616] font-medium hover:bg-[#c9a555] transition-colors"
                >
                  <IconPhone className="w-5 h-5" />
                  Schedule a quick call
                  <IconArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
