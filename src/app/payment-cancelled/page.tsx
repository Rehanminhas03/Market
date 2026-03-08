"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconX, IconArrowLeft, IconMessageCircle } from "@tabler/icons-react";
import NavbarDemo from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/scroll-progress";

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500/20 flex items-center justify-center">
              <IconX className="w-10 h-10 text-orange-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Payment Cancelled
            </h1>

            <p className="text-white/60 text-lg mb-4">
              Your payment was not completed. No charges have been made to your account.
            </p>

            <p className="text-white/50 text-base mb-8">
              If you experienced any issues or have questions about our plans, our team is here to help.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d5b367] text-[#0a0a0a] font-medium rounded-full hover:bg-[#c9a555] transition-colors"
              >
                <IconArrowLeft className="w-5 h-5" />
                Back to Pricing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors"
              >
                <IconMessageCircle className="w-5 h-5" />
                Contact Us
              </Link>
            </div>

            {/* Reassurance section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-lg font-medium text-white mb-4">
                Why Choose Marketlyn?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-[#d5b367] font-medium mb-1">Exclusive Referrals</p>
                  <p className="text-white/50 text-sm">Never shared with competitors</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-[#d5b367] font-medium mb-1">One-Time Fee</p>
                  <p className="text-white/50 text-sm">No recurring monthly charges</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <p className="text-[#d5b367] font-medium mb-1">Quality Guaranteed</p>
                  <p className="text-white/50 text-sm">BDR verified leads</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
