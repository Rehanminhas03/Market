"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight";
import MagneticButton from "@/components/ui/magnetic-button";
import {
  IconUsers,
  IconChartBar,
  IconBell,
  IconDeviceAnalytics,
  IconDeviceMobile,
  IconPlugConnected,
  IconMail,
  IconCalendarEvent,
  IconFileDescription,
  IconAutomation,
  IconMessageCircle,
  IconTarget,
  IconCloudUpload,
  IconShieldCheck,
  IconCheck,
  IconRocket,
  IconCurrencyDollar,
  IconClock,
  IconTrendingUp,
  IconBrandWhatsapp,
  IconWorld,
  IconHeadset,
  IconReportAnalytics,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandGoogle,
  IconCreditCard,
  IconCalendar,
  IconRobot,
  IconSpeakerphone,
  IconChartPie,
  IconDatabase,
  IconBrandLinkedin,
  IconArrowRight,
  IconStar,
  IconX,
  IconBrandApple,
  IconBrandGooglePlay,
} from "@tabler/icons-react";
import siteConfig from "@/config/site.json";

// GHL Perks - What's included with GoHighLevel
const ghlPerks = [
  {
    icon: IconRocket,
    title: "Unlimited Sub-Accounts",
    description: "Create unlimited client accounts with their own branded CRM portal.",
    highlight: true,
    color: "#d5b367", // Gold
  },
  {
    icon: IconMail,
    title: "Email Marketing",
    description: "Unlimited emails with drag-and-drop builder, templates, and automation.",
    color: "#3b82f6", // Blue
  },
  {
    icon: IconMessageCircle,
    title: "2-Way SMS & MMS",
    description: "Text your leads directly from the CRM with automated responses.",
    color: "#10b981", // Emerald
  },
  {
    icon: IconBrandWhatsapp,
    title: "WhatsApp Integration",
    description: "Connect with clients via WhatsApp for instant communication.",
    color: "#22c55e", // Green
  },
  {
    icon: IconCalendarEvent,
    title: "Appointment Booking",
    description: "Online booking calendar with automated reminders and confirmations.",
    color: "#8b5cf6", // Purple
  },
  {
    icon: IconRobot,
    title: "AI-Powered Chatbot",
    description: "24/7 lead capture and qualification with intelligent AI responses.",
    color: "#06b6d4", // Cyan
  },
  {
    icon: IconWorld,
    title: "Website & Funnel Builder",
    description: "Create landing pages, websites, and sales funnels with no code.",
    color: "#6366f1", // Indigo
  },
  {
    icon: IconCreditCard,
    title: "Payment Processing",
    description: "Accept payments, create invoices, and manage subscriptions.",
    color: "#f97316", // Orange
  },
  {
    icon: IconSpeakerphone,
    title: "Reputation Management",
    description: "Automated review requests and reputation monitoring across platforms.",
    color: "#ec4899", // Pink
  },
  {
    icon: IconChartPie,
    title: "Advanced Analytics",
    description: "Detailed reporting on campaigns, leads, and revenue performance.",
    color: "#14b8a6", // Teal
  },
  {
    icon: IconDatabase,
    title: "Pipeline Management",
    description: "Visual drag-and-drop pipeline with custom stages and automation.",
    color: "#a855f7", // Purple
  },
  {
    icon: IconHeadset,
    title: "Call Tracking & Recording",
    description: "Track calls, record conversations, and analyze call performance.",
    color: "#f59e0b", // Amber
  },
];

// Key Benefits with stats
const keyBenefits = [
  {
    icon: IconClock,
    stat: "10+ Hours",
    label: "Saved Weekly",
    description: "Automate repetitive tasks and focus on closing deals",
    color: "#3b82f6", // Blue
  },
  {
    icon: IconTrendingUp,
    stat: "40%",
    label: "More Conversions",
    description: "Convert more leads with automated follow-ups",
    color: "#10b981", // Emerald
  },
  {
    icon: IconCurrencyDollar,
    stat: "3x",
    label: "ROI Increase",
    description: "Triple your return on marketing investment",
    color: "#d5b367", // Gold
  },
  {
    icon: IconUsers,
    stat: "500+",
    label: "Agents Using",
    description: "Join successful real estate professionals",
    color: "#8b5cf6", // Purple
  },
];

// Use Cases - How agents use the CRM
const useCases = [
  {
    title: "Lead Capture & Nurturing",
    description: "Automatically capture leads from your website, Facebook ads, and landing pages. Nurture them with personalized email and SMS sequences until they're ready to buy.",
    features: ["Multi-channel lead capture", "Automated drip campaigns", "Lead scoring & prioritization", "Smart follow-up reminders"],
    icon: IconTarget,
    color: "#d5b367",
  },
  {
    title: "Client Communication Hub",
    description: "All your conversations in one place. Text, email, call, and chat with clients directly from the CRM. Never miss a message or opportunity.",
    features: ["Unified inbox for all channels", "WhatsApp & Facebook Messenger", "Call tracking & recording", "Automated responses"],
    icon: IconMessageCircle,
    color: "#8b5cf6",
  },
  {
    title: "Appointment & Showing Management",
    description: "Let clients book appointments online. Send automated reminders, sync with your calendar, and manage showings effortlessly.",
    features: ["Online booking calendar", "Automatic reminders", "Google/Outlook sync", "Group availability"],
    icon: IconCalendar,
    color: "#3b82f6",
  },
  {
    title: "Marketing Automation",
    description: "Create and automate entire marketing campaigns. From social media posts to email newsletters, do it all without leaving the platform.",
    features: ["Email campaign builder", "Social media scheduling", "Landing page builder", "A/B testing"],
    icon: IconAutomation,
    color: "#10b981",
  },
];

// What You Get vs What You Replace
const platformComparison = {
  replaces: [
    { name: "Mailchimp", cost: "$99/mo", icon: IconMail },
    { name: "Calendly", cost: "$16/mo", icon: IconCalendarEvent },
    { name: "ClickFunnels", cost: "$127/mo", icon: IconWorld },
    { name: "Podium", cost: "$399/mo", icon: IconStar },
    { name: "ActiveCampaign", cost: "$149/mo", icon: IconAutomation },
    { name: "CallRail", cost: "$45/mo", icon: IconHeadset },
  ],
  totalSavings: "$835+/mo",
};

// Integrations
const integrations = [
  { name: "Facebook Ads", icon: IconBrandFacebook },
  { name: "Google Ads", icon: IconBrandGoogle },
  { name: "Instagram", icon: IconBrandInstagram },
  { name: "LinkedIn", icon: IconBrandLinkedin },
  { name: "Zillow", icon: IconWorld },
  { name: "Realtor.com", icon: IconWorld },
  { name: "Google Calendar", icon: IconCalendar },
  { name: "Stripe", icon: IconCreditCard },
];

// Workflow automation examples
const automationExamples = [
  {
    trigger: "New Lead Captured",
    actions: ["Send welcome SMS", "Add to email sequence", "Notify agent", "Create task"],
  },
  {
    trigger: "Appointment Booked",
    actions: ["Send confirmation", "Add to calendar", "Reminder 24hrs before", "Follow-up after"],
  },
  {
    trigger: "Deal Closed",
    actions: ["Send thank you", "Request review", "Add to newsletter", "Update pipeline"],
  },
];

export default function CRM() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  return (
    <section id="crm" className="relative py-24 md:py-32 px-4 bg-[#0a0a0a] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(213,179,103,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(213,179,103,0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge>CRM Services</Badge>
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

        {/* Key Benefits Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {keyBenefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10 transition-colors"
              style={{ borderColor: `${benefit.color}30` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ borderColor: `${benefit.color}60` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${benefit.color}20` }}
              >
                <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{benefit.stat}</div>
              <div className="text-sm font-medium mb-2" style={{ color: benefit.color }}>{benefit.label}</div>
              <p className="text-xs text-white/50">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* What's Included - GHL Perks */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Everything You Get with {siteConfig.name} CRM
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              One platform to replace your entire tech stack. Powered by GoHighLevel with real estate-specific customizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ghlPerks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-5 rounded-xl border transition-all ${
                  perk.highlight
                    ? "bg-gradient-to-br from-[#d5b367]/20 to-transparent border-[#d5b367]/40"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${perk.color}20` }}
                  >
                    <perk.icon className="w-5 h-5" style={{ color: perk.color }} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{perk.title}</h4>
                    <p className="text-sm text-white/50">{perk.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases Interactive Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              How Real Estate Agents Use Our CRM
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              See how our CRM transforms your daily workflow and helps you close more deals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Use Case Tabs */}
            <div className="space-y-3">
              {useCases.map((useCase, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveUseCase(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    activeUseCase === idx
                      ? "bg-white/[0.05] border-[#d5b367]/50"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${useCase.color}20` }}
                    >
                      <useCase.icon className="w-6 h-6" style={{ color: useCase.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{useCase.title}</h4>
                      <p className="text-sm text-white/50 line-clamp-1">{useCase.description}</p>
                    </div>
                    <IconArrowRight className={`w-5 h-5 transition-transform ${
                      activeUseCase === idx ? "text-[#d5b367] translate-x-1" : "text-white/30"
                    }`} />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Use Case Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUseCase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${useCases[activeUseCase].color}20` }}
                >
                  {(() => {
                    const Icon = useCases[activeUseCase].icon;
                    return <Icon className="w-7 h-7" style={{ color: useCases[activeUseCase].color }} />;
                  })()}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {useCases[activeUseCase].title}
                </h4>
                <p className="text-white/60 mb-6">
                  {useCases[activeUseCase].description}
                </p>
                <div className="space-y-3">
                  {useCases[activeUseCase].features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <IconCheck className="w-5 h-5 text-[#d5b367]" />
                      <span className="text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Automation Showcase */}
        <motion.div
          className="mb-20 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <IconAutomation className="w-6 h-6 text-[#d5b367]" />
              <h3 className="text-2xl font-bold text-white">Powerful Automation</h3>
            </div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Set it and forget it. Our automations work 24/7 so you never miss an opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {automationExamples.map((automation, idx) => (
              <motion.div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-white">{automation.trigger}</span>
                </div>
                <div className="space-y-2 pl-4 border-l-2 border-[#d5b367]/30">
                  {automation.actions.map((action, actionIdx) => (
                    <div key={actionIdx} className="flex items-center gap-2">
                      <IconArrowRight className="w-3 h-3 text-[#d5b367]" />
                      <span className="text-sm text-white/60">{action}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cost Comparison - What You Replace */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Replace Your Entire Tech Stack
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Stop paying for multiple tools. Our CRM includes everything you need in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Tools You Replace */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <IconX className="w-5 h-5 text-red-400" />
                What You're Currently Paying
              </h4>
              <div className="space-y-3">
                {platformComparison.replaces.map((tool, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <tool.icon className="w-5 h-5 text-white/40" />
                      <span className="text-white/70">{tool.name}</span>
                    </div>
                    <span className="text-red-400 font-medium">{tool.cost}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-white/60">Total Monthly Cost</span>
                <span className="text-2xl font-bold text-red-400">{platformComparison.totalSavings}</span>
              </div>
            </div>

            {/* What You Get */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d5b367]/10 to-transparent border border-[#d5b367]/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <IconCheck className="w-5 h-5 text-green-400" />
                What You Get with {siteConfig.name}
              </h4>
              <div className="space-y-3 mb-6">
                {[
                  "All-in-one CRM platform",
                  "Unlimited contacts & emails",
                  "SMS & WhatsApp messaging",
                  "Funnel & website builder",
                  "Appointment scheduling",
                  "Marketing automation",
                  "Reputation management",
                  "Mobile app access",
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <IconCheck className="w-4 h-4 text-[#d5b367]" />
                    <span className="text-white/80">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-[#d5b367]/20 text-center">
                <p className="text-sm text-white/60 mb-1">All for just</p>
                <p className="text-3xl font-bold text-white">One Simple Price</p>
                <p className="text-sm text-[#d5b367] mt-1">See pricing for details</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Integrations */}
        <motion.div
          className="mb-20 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <IconPlugConnected className="w-5 h-5 text-[#d5b367]" />
            <h3 className="text-xl font-bold text-white">Connects With Your Favorite Tools</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:border-[#d5b367]/30 hover:text-white transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <integration.icon className="w-4 h-4" />
                {integration.name}
              </motion.div>
            ))}
            <div className="px-4 py-2 rounded-full bg-[#d5b367]/10 border border-[#d5b367]/30 text-[#d5b367] text-sm">
              + 50 more integrations
            </div>
          </div>
        </motion.div>

        {/* Mobile App Section */}
        <motion.div
          className="mb-20 grid md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <IconDeviceMobile className="w-6 h-6 text-[#d5b367]" />
              <span className="text-sm text-[#d5b367] font-medium">Mobile App Included</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Run Your Business From Anywhere
            </h3>
            <p className="text-white/60 mb-6">
              The full power of your CRM in your pocket. Respond to leads instantly, manage appointments,
              and close deals on the go with our mobile app for iOS and Android.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Instant push notifications for new leads",
                "Reply to texts, emails & calls in one app",
                "View & update your pipeline on the go",
                "Access client info before meetings",
                "Voice notes & quick task creation",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-white/80">
                  <IconCheck className="w-4 h-4 text-[#d5b367]" />
                  {item}
                </li>
              ))}
            </ul>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://apps.apple.com/us/app/highlevel/id1425004076"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black border border-white/20 hover:bg-black/80 transition-all group"
              >
                <IconBrandApple className="w-7 h-7 text-white" />
                <div className="text-left">
                  <p className="text-[10px] text-white/70 leading-none">Download on the</p>
                  <p className="text-sm font-semibold text-white">App Store</p>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.gohighlevel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black border border-white/20 hover:bg-black/80 transition-all group"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#00D7FE"/>
                  <path d="M17.556 8.236L14.85 10.94l-1.058-1.06 2.706-2.702.058.058 1 .5.5.5.5.5z" fill="#00F076"/>
                  <path d="M20.609 10.5L17.556 8.236l-2.706 2.704L17.556 13.644l3.053-2.264a1 1 0 000-1.88z" fill="#FFCB00"/>
                  <path d="M3.609 22.186L14.85 12.94l2.706 2.704-12.947 7.462a1 1 0 01-1-.92z" fill="#F93646"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/70 leading-none">Get it on</p>
                  <p className="text-sm font-semibold text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] max-w-[280px] mx-auto rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-3">
              <div className="h-full rounded-2xl bg-[#0a0a0a] p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white text-sm font-medium">Leads</span>
                  <div className="w-8 h-8 rounded-full bg-[#d5b367]/20 flex items-center justify-center">
                    <IconBell className="w-4 h-4 text-[#d5b367]" />
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  {[
                    { name: "John Smith", status: "New Lead", time: "2m ago" },
                    { name: "Sarah Johnson", status: "Showing Today", time: "1h ago" },
                    { name: "Mike Wilson", status: "Contract Sent", time: "3h ago" },
                  ].map((lead, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d5b367]/20" />
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{lead.name}</p>
                          <p className="text-xs text-white/50">{lead.status}</p>
                        </div>
                        <span className="text-xs text-white/30">{lead.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-around pt-4 border-t border-white/10">
                  {[IconUsers, IconMessageCircle, IconCalendar, IconChartBar].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white/40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#d5b367]/10 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#d5b367]/10 blur-2xl" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center p-8 md:p-12 rounded-2xl bg-gradient-to-b from-[#d5b367]/10 to-transparent border border-[#d5b367]/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Streamline Your Real Estate Business?
          </h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful agents who've transformed their business with {siteConfig.name} CRM.
            We handle the setup – you focus on selling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton variant="primary" href="/pricing">
              View CRM Plans
            </MagneticButton>
            <MagneticButton variant="secondary" href="/contact">
              Book a Demo
            </MagneticButton>
          </div>
          <p className="text-sm text-white/40 mt-4">
            Full setup included • Training provided • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
