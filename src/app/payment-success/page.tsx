"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconCheck, IconLoader2, IconAlertCircle } from "@tabler/icons-react";
import NavbarDemo from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/scroll-progress";

type VerificationStatus = "verifying" | "success" | "error";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  // Square redirects with these parameters
  const transactionId = searchParams.get("transactionId");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      // Need at least orderId to verify
      if (!orderId) {
        setStatus("error");
        setErrorMessage("Missing payment information. Please try again.");
        return;
      }

      try {
        const response = await fetch("/api/payments/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        });

        const data = await response.json();

        if (data.verified && data.accessToken) {
          setStatus("success");

          // Wait a moment to show success, then redirect to onboarding
          setTimeout(() => {
            const params = new URLSearchParams({
              token: data.accessToken,
              plan: data.plan,
              crm: data.includeCRM ? "true" : "false",
            });
            router.push(`/onboarding?${params.toString()}`);
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Payment verification failed.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setErrorMessage("Unable to verify payment. Please contact support.");
      }
    };

    verifyPayment();
  }, [orderId, router]);

  return (
    <main className="relative pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-12"
        >
          {status === "verifying" && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#d5b367]/20 flex items-center justify-center">
                <IconLoader2 className="w-10 h-10 text-[#d5b367] animate-spin" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Verifying Payment...
              </h1>
              <p className="text-white/60 text-lg mb-4">
                Please wait while we confirm your payment.
              </p>
              <p className="text-white/40 text-sm">
                This should only take a moment.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <IconCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Payment Successful!
              </h1>
              <p className="text-white/60 text-lg mb-2">
                Welcome on board! Thank you for your purchase.
              </p>
              <p className="text-white/50 text-base mb-4">
                Redirecting you to complete your onboarding...
              </p>
              <div className="flex items-center justify-center gap-2 text-[#d5b367]">
                <IconLoader2 className="w-5 h-5 animate-spin" />
                <span>Redirecting to onboarding...</span>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <IconAlertCircle className="w-10 h-10 text-red-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Verification Issue
              </h1>
              <p className="text-white/60 text-lg mb-6">
                {errorMessage}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d5b367] text-[#0a0a0a] font-medium rounded-full hover:bg-[#c9a555] transition-colors"
                >
                  Try Again
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
              {(transactionId || orderId) && (
                <p className="mt-6 text-white/30 text-xs">
                  Reference: {transactionId || orderId}
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}

function PaymentSuccessLoading() {
  return (
    <main className="relative pt-32 pb-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#d5b367]/20 flex items-center justify-center">
            <IconLoader2 className="w-10 h-10 text-[#d5b367] animate-spin" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Loading...
          </h1>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScrollProgress />
      <NavbarDemo />

      <Suspense fallback={<PaymentSuccessLoading />}>
        <PaymentSuccessContent />
      </Suspense>

      <Footer />
    </div>
  );
}
