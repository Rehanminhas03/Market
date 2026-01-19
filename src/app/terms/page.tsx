"use client";

import { motion } from "framer-motion";
import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import siteConfig from "@/config/site.json";

const termsContent = [
  {
    title: "1. Eligibility and Account Verification",
    content:
      "You must be at least 18 years old and legally authorized to operate a business in your jurisdiction. All information provided must be accurate, current, and truthful. We reserve the right to verify identity or business legitimacy at any time.",
  },
  {
    title: "2. Description of Services",
    content:
      "We provide digital marketing, campaign management, CRM access, SMS and email campaign facilitation, appointment booking tools, and related services. All services are provided on a best-effort basis. Results are not guaranteed, including conversions, appointments, revenue, or profits.",
  },
  {
    title: "3. Prohibited Activities",
    content:
      "You agree not to engage in unlawful, deceptive, or high-risk activities, including but not limited to:",
    list: [
      "Fraud or misrepresentation",
      "Spam, phishing, or unlawful communications",
      "Excessive, abusive, or unjustified chargebacks",
      "Unauthorized resale or redistribution of marketing materials",
      "Violations of CAN-SPAM, GDPR, CCPA, TCPA, or consumer protection laws",
    ],
    footer:
      "Violations may result in immediate termination and reporting to payment processors or authorities.",
  },
  {
    title: "4. Account Security",
    content:
      "You are responsible for maintaining the confidentiality of your login credentials and for all activity conducted through your account.",
  },
  {
    title: "5. Content and Campaign Ownership",
    content:
      "Marketing materials and campaigns created through our platform are licensed solely for your authorized business use. Resale, transfer, or misuse of these materials is strictly prohibited.",
  },
  {
    title: "6. Fees, Billing, and Refunds",
    content: "All fees and billing terms are defined in your service agreement.",
    list: [
      "Payments are processed through third-party processors.",
      "Billing disputes must be submitted within 30 days of the charge date.",
      "Refunds are available only as expressly stated in your service agreement.",
      "Initiating chargebacks without first contacting support may result in account termination.",
    ],
  },
  {
    title: "7. Intellectual Property",
    content:
      "All software, systems, content, and materials remain the exclusive property of the Company.",
  },
  {
    title: "8. Data Protection and Privacy",
    content:
      "We comply with applicable data protection laws, including GDPR and CCPA where applicable. We use vetted third-party providers to deliver our services.",
  },
  {
    title: "9. Third-Party Services and Payment Processors",
    content:
      "Our services rely on third-party platforms. We are not responsible for service interruptions, fund holds, or account actions taken by payment processors.",
  },
  {
    title: "10. No Guarantees",
    content:
      "We do not guarantee financial performance, income, or business success.",
  },
  {
    title: "11. Termination",
    content:
      "We may suspend or terminate your account immediately for violations of these Terms or conduct posing compliance or financial risk.",
  },
  {
    title: "12. Governing Law",
    content:
      "These Terms are governed by the laws of the State of Colorado, United States.",
  },
  {
    title: "13. Modifications",
    content:
      "We may update these Terms with 30 days' notice. Continued use of services constitutes acceptance.",
  },
  {
    title: "14. Contact and Support",
    content:
      "Support inquiries are addressed within five (5) business days. For questions regarding these Terms, please contact us at info@marketlyn.com.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#161616]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Spotlight effect */}
        <Spotlight className="absolute -top-40 left-0 md:left-60" fill="#d5b367" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>Legal</Badge>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Terms of Use
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Please read these terms carefully before using {siteConfig.name}&apos;s services.
            </p>
            <p className="mt-4 text-sm text-white/40">
              Last Updated: January 2025
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-white/70 leading-relaxed">
              These Terms of Use (&quot;Terms&quot;) govern your access to and use of the services
              provided by {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our
              services, you agree to be legally bound by these Terms.
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {termsContent.map((section, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d5b367]/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.03 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                <p className="text-white/60 leading-relaxed">{section.content}</p>
                {section.list && (
                  <ul className="mt-4 space-y-2">
                    {section.list.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-start gap-3 text-white/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d5b367] mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.footer && (
                  <p className="mt-4 text-white/50 text-sm italic">{section.footer}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#d5b367]/10 to-transparent border border-[#d5b367]/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Questions about our Terms?
            </h3>
            <p className="text-white/60 mb-6">
              If you have any questions or concerns about these Terms of Use, please don&apos;t hesitate to reach out.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d5b367] text-[#161616] font-medium hover:bg-[#c9a555] transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
