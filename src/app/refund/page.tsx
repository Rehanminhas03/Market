"use client";

import { motion } from "framer-motion";
import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const sections = [
  {
    title: "Money-Back Guarantee on Lead Generation",
    content: "Marketlyn LLC provides a conditional money-back guarantee tied strictly to lead delivery, lead accuracy, and exclusivity as defined below. Results, closings, revenue, or conversion outcomes are not guaranteed due to market conditions and agent-controlled follow-up.",
    paragraphs: [
      "Refunds are not automatic and are subject to verification under this Policy."
    ]
  },
  {
    title: "Refund Eligibility",
    content: "Refunds for the sign-up fee will be considered only under the following circumstances:",
    subsections: [
      {
        title: "Failure to Provide Leads",
        content: "If Marketlyn LLC fails to deliver any leads within 90 days from the execution date of the Referral Agreement."
      },
      {
        title: "Materially Inaccurate Lead Information",
        content: "If a lead contains materially false or unusable information, including invalid contact details. The agent must report the issue within the required timeframe. Marketlyn LLC will first attempt to provide a replacement lead. If no replacement is provided within 30 days, the agent may request a refund."
      },
      {
        title: "Breach of Lead Exclusivity",
        content: "If a lead assigned to the agent lacks primary exclusivity and is shared with another agent within Marketlyn's network."
      },
      {
        title: "Leads Outside Approved Territory",
        content: "If the agent voluntarily agrees to receive leads outside their preferred zip codes or service areas, such leads are considered accepted and are not eligible for refund or replacement."
      }
    ]
  },
  {
    title: "Mandatory Reporting and Timely Notification",
    content: "Proper reporting is essential for refund eligibility.",
    list: [
      "Any concerns regarding lead accuracy, quality, or exclusivity must be reported within 48 hours of lead delivery.",
      "All reports must be submitted in writing to support@marketlyn.com with specific details and examples.",
      "Failure to report issues within 48 hours constitutes acceptance of the lead, rendering it ineligible for refund or replacement."
    ]
  },
  {
    title: "Refund Procedure",
    content: "Follow these steps to initiate a refund request:",
    subsections: [
      {
        title: "Initial Notice for Non-Delivery",
        content: "In the event of failure to provide leads, the agent must first submit a written notice requesting delivery. If no leads are delivered within 30 days of this notice, the agent may submit a refund request."
      },
      {
        title: "Resolution and Replacement Period",
        content: "For issues related to lead accuracy or exclusivity: Marketlyn LLC will attempt to replace the reported lead(s) within 30 days. If replacement is not provided within this period, a refund request may be submitted for review."
      },
      {
        title: "90-Day Commitment and Evaluation Period",
        content: "No refunds will be processed before the completion of 90 days from the Agreement execution date. Any refund requests initiated prior to 90 days will be evaluated and processed only after the 90-day period has elapsed. This evaluation window allows leads to mature and enables proper follow-up and nurturing by the agent."
      }
    ]
  },
  {
    title: "Chargeback and Dispute Prevention",
    content: "Please follow our refund process before initiating any disputes.",
    list: [
      "Agents agree to follow this refund process before initiating any chargeback or payment dispute.",
      "Initiating a chargeback without first submitting a written refund request constitutes a material breach of this Policy and the Agreement.",
      "Unauthorized chargebacks may result in immediate service termination and forfeiture of refund eligibility.",
      "Marketlyn LLC reserves the right to submit this Policy, signed agreements, delivery logs, CRM records, and communication history to payment processors as dispute evidence."
    ]
  },
  {
    title: "General Terms",
    content: "Additional terms governing refunds:",
    list: [
      "Refunds are issued only to the original payment method used at sign-up.",
      "Refund requests must be submitted in writing to support@marketlyn.com.",
      "Marketlyn LLC reserves the right to review, validate, and approve all refund claims.",
      "Refund eligibility is strictly limited to the circumstances outlined in this Policy.",
      "Change of mind, voluntary withdrawal, inactivity, lack of follow-up, or failure to execute the Agreement does not qualify for a refund."
    ],
    paragraphs: [
      "This Refund Policy is designed to protect both parties, reduce disputes, and ensure a fair evaluation of lead generation services while maintaining full compliance with the payment processors."
    ]
  }
];

export default function RefundPolicyPage() {
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
              Refund Policy
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-3xl mx-auto">
              This Refund Policy governs the terms and conditions related to refund eligibility for the sign-up fee associated with the Referral Agreement executed with Marketlyn LLC.
            </p>
            <p className="mt-4 text-sm text-white/40">
              Effective for a period of 90 days from the date of execution of the Referral Agreement
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
                If you have questions about this Refund Policy or need to submit a refund request, contact us at:
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
