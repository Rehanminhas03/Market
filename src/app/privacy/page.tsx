"use client";

import { motion } from "framer-motion";
import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly and information generated through use of our services.",
    subsections: [
      {
        title: "Personal and Contact Information",
        content: "Name, email address, phone number, business name, billing address, and mailing address."
      },
      {
        title: "Business and Professional Information",
        content: "Company details, industry information, service areas, business preferences, and onboarding details provided by business clients."
      },
      {
        title: "Marketing and Campaign Information",
        content: "Campaign preferences, target audience details, marketing goals, and interaction data."
      },
      {
        title: "Communication Data",
        content: "Text messages, calls, emails, voicemails, and chat communications sent or received through our systems."
      },
      {
        title: "Technical Information",
        content: "IP address, browser type, device information, and usage data collected through cookies and analytics tools."
      }
    ]
  },
  {
    title: "How We Use Information",
    content: "We use collected information to operate and improve our services.",
    list: [
      "To provide digital marketing, campaign management, appointment booking, and CRM services.",
      "To communicate with clients, prospects, and partners.",
      "To process payments, subscriptions, and billing.",
      "To verify accounts and comply with legal and financial requirements.",
      "To improve performance, security, and user experience."
    ]
  },
  {
    title: "Legal Basis for Processing",
    content: "We process data based on one or more of the following.",
    list: [
      "Your consent.",
      "Performance of a contract.",
      "Compliance with legal obligations.",
      "Legitimate business interests such as fraud prevention, service improvement, and security."
    ]
  },
  {
    title: "Sharing of Information",
    content: "We do not sell or rent personal information.",
    paragraphs: [
      "We may share information with trusted third party service providers who help us operate our business. These include payment processors, CRM platforms, SMS and email providers, hosting services, analytics tools, and customer support systems.",
      "Campaign data and results generated for clients are exclusive to the client for whom they were generated unless otherwise agreed in writing.",
      "We may disclose information if required by law, regulation, court order, or lawful request."
    ]
  },
  {
    title: "SMS Communications",
    content: "We collect mobile phone numbers only when voluntarily submitted by users. Phone numbers are used solely for service-related communications including lead notifications, onboarding updates, account alerts, and support messages. SMS consent is not shared with third parties or affiliates. Users may opt out at any time by replying STOP.",
    paragraphs: [
      "Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.",
      "By submitting your phone number and opting in, you consent to receive SMS messages from Marketlyn. Consent is not a condition of purchase."
    ]
  },
  {
    title: "International Data Processing",
    content: "We serve clients globally. Data may be processed and stored in the United States, Canada, or other jurisdictions where our service providers operate. By using our services, you consent to this processing."
  },
  {
    title: "Data Retention",
    content: "We retain personal and business information only as long as needed to provide services, meet contractual obligations, resolve disputes, and comply with legal and accounting requirements."
  },
  {
    title: "Your Rights",
    content: "Depending on your location, you may have the right to access, correct, update, delete, or restrict use of your personal information.",
    list: [
      "You may opt out of marketing communications at any time.",
      "You may request a copy of the data we hold about you.",
      "Requests can be sent to support@marketlyn.com."
    ]
  },
  {
    title: "Cookies and Tracking",
    content: "We use cookies and similar technologies to operate our website, analyze traffic, and improve performance. You can control cookies through your browser settings."
  },
  {
    title: "Security",
    content: "We take reasonable technical and organizational measures to protect your information from unauthorized access, loss, misuse, or disclosure. No system offers absolute security."
  },
  {
    title: "Third Party Links",
    content: "Our website may contain links to third party websites. We are not responsible for their privacy practices or content."
  },
  {
    title: "Updates to This Policy",
    content: "We may update this Privacy Policy from time to time. The effective date at the top reflects the most recent version. Continued use of our services means you accept the updated policy."
  }
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>Legal</Badge>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-white/60">
              We respect your privacy. This Privacy Policy explains what information we collect, how we use it, and how we protect it when you use our website, services, and platforms.
            </p>
            <p className="mt-4 text-sm text-white/40">
              Last updated: January 2025
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {sections.map((section, idx) => (
              <section
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  {section.content}
                </p>

                {/* Subsections */}
                {section.subsections && (
                  <div className="space-y-4 mt-6">
                    {section.subsections.map((sub, subIdx) => (
                      <div key={subIdx} className="pl-4 border-l-2 border-[#d5b367]/30">
                        <h3 className="text-base font-semibold text-white mb-1">
                          {sub.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* List items */}
                {section.list && (
                  <ul className="space-y-2 mt-4">
                    {section.list.map((item, listIdx) => (
                      <li key={listIdx} className="flex items-start gap-3 text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d5b367] mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Paragraphs */}
                {section.paragraphs && (
                  <div className="space-y-4 mt-4">
                    {section.paragraphs.map((para, paraIdx) => (
                      <p key={paraIdx} className="text-white/70 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Contact Section */}
            <section className="bg-gradient-to-br from-[#d5b367]/10 to-transparent border border-[#d5b367]/20 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                Contact Us
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data practices, contact us at:
              </p>
              <div className="space-y-2">
                <p className="text-white">
                  <span className="text-white/50">Email: </span>
                  <a
                    href="mailto:support@marketlyn.com"
                    className="text-[#d5b367] hover:underline"
                  >
                    support@marketlyn.com
                  </a>
                </p>
              </div>
            </section>

            {/* Back to Home */}
            <div className="text-center pt-6">
              <Link
                href="/"
                className="text-[#d5b367] hover:underline text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
