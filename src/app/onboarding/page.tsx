"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconUser,
  IconMapPin,
  IconTarget,
  IconCreditCard,
  IconSend,
  IconBuilding,
  IconPhone,
  IconMail,
  IconId,
  IconLicense,
  IconChevronDown,
} from "@tabler/icons-react";
import siteConfig from "@/config/site.json";
import Link from "next/link";

// Plan options
const planOptions = [
  { value: "dealflow", label: "$399 — Dealflow", price: 399 },
  { value: "marketedge", label: "$699 — MarketEdge", price: 699 },
  { value: "closepoint", label: "$999 — ClosePoint", price: 999 },
  { value: "core", label: "$2,695 — Core (Team)", price: 2695 },
  { value: "scale", label: "$3,899 — Scale (Team)", price: 3899 },
];

// Radius options
const radiusOptions = [
  { value: "15-30", label: "15–30 miles" },
  { value: "30-50", label: "30–50 miles" },
  { value: "50-80", label: "50–80 miles" },
];

// US States
const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

// Form sections for step indicator
const formSections = [
  { id: 1, title: "Personal Info", icon: IconUser },
  { id: 2, title: "Location", icon: IconMapPin },
  { id: 3, title: "Service Areas", icon: IconTarget },
  { id: 4, title: "Plan", icon: IconCreditCard },
  { id: 5, title: "Addresses", icon: IconBuilding },
];

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");

  // Form state
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mls: "",
    licenseNumber: "",
    // Location
    city: "",
    state: "",
    // Service Areas
    primaryArea: "",
    primaryRadius: "",
    secondaryArea: "",
    secondaryRadius: "",
    // Plan & Assignment
    accountManager: "",
    selectedPlan: "",
    // Addresses
    billingAddress: "",
    shippingAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currentSection, setCurrentSection] = useState(1);

  // Pre-select plan from URL parameter
  useEffect(() => {
    if (planParam) {
      const normalizedPlan = planParam.toLowerCase();
      const matchedPlan = planOptions.find(p => p.value === normalizedPlan);
      if (matchedPlan) {
        setFormData(prev => ({ ...prev, selectedPlan: matchedPlan.value }));
      }
    }
  }, [planParam]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input field component for consistency
  const InputField = ({
    name,
    label,
    type = "text",
    placeholder,
    required = true,
    icon: Icon,
  }: {
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/70">{label}{required && "*"}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        )}
        <input
          type={type}
          name={name}
          required={required}
          value={formData[name as keyof typeof formData]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors ${Icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );

  // Select field component
  const SelectField = ({
    name,
    label,
    options,
    placeholder,
    required = true,
  }: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    placeholder: string;
    required?: boolean;
  }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white/70">{label}{required && "*"}</label>
      <div className="relative">
        <select
          name={name}
          required={required}
          value={formData[name as keyof typeof formData]}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#161616]">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#161616]">
              {option.label}
            </option>
          ))}
        </select>
        <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#161616]">
        <ScrollProgress />
        <NavbarDemo />

        <main className="relative pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <IconCheck className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Submission Received!</h2>
              <p className="text-white/60 mb-6 text-lg">
                Thank you for your submission. Our team will review your information and get in touch within 24-48 hours.
              </p>
              <p className="text-white/40 mb-8">
                A confirmation email has been sent to <span className="text-[#d5b367]">{formData.email}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-lg bg-[#d5b367] text-[#161616] font-semibold hover:bg-[#c9a555] transition-colors"
                >
                  Return Home
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#161616]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #d5b367 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#d5b367]/5 blur-[120px]" />
          <div className="absolute top-1/4 -left-60 w-[500px] h-[500px] rounded-full bg-[#d5b367]/3 blur-[100px]" />
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#d5b367]/5 blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>
              <div className="w-2 h-2 rounded-full bg-[#d5b367] mr-2 animate-pulse" />
              Client Onboarding
            </Badge>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white">
              Welcome to {siteConfig.name}
            </h1>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Complete the form below to get started with your marketing journey. All fields marked with * are required.
            </p>
          </motion.div>

          {/* Section Progress Indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 md:gap-4 mb-10 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {formSections.map((section, idx) => (
              <div key={section.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs md:text-sm transition-colors ${
                    currentSection >= section.id
                      ? "bg-[#d5b367]/20 text-[#d5b367] border border-[#d5b367]/30"
                      : "bg-white/5 text-white/40 border border-white/10"
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.title}</span>
                </div>
                {idx < formSections.length - 1 && (
                  <div className={`w-4 md:w-8 h-0.5 mx-1 ${currentSection > section.id ? "bg-[#d5b367]" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Personal Information */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#d5b367]/20 flex items-center justify-center">
                    <IconUser className="w-5 h-5 text-[#d5b367]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    icon={IconUser}
                  />
                  <InputField
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    icon={IconUser}
                  />
                  <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    icon={IconMail}
                  />
                  <InputField
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    icon={IconPhone}
                  />
                  <InputField
                    name="mls"
                    label="MLS"
                    placeholder="Enter your MLS"
                    icon={IconId}
                  />
                  <InputField
                    name="licenseNumber"
                    label="License Number"
                    placeholder="Enter license number"
                    icon={IconLicense}
                  />
                </div>
              </div>

              {/* Section 2: Location Information */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#d5b367]/20 flex items-center justify-center">
                    <IconMapPin className="w-5 h-5 text-[#d5b367]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Location Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    icon={IconMapPin}
                  />
                  <SelectField
                    name="state"
                    label="State"
                    options={usStates.map(s => ({ value: s, label: s }))}
                    placeholder="Select state"
                  />
                </div>
              </div>

              {/* Section 3: Service Areas */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#d5b367]/20 flex items-center justify-center">
                    <IconTarget className="w-5 h-5 text-[#d5b367]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Service Areas</h2>
                </div>

                <div className="space-y-6">
                  {/* Primary Area */}
                  <div>
                    <h3 className="text-sm font-semibold text-[#d5b367] mb-3">Primary Area</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField
                        name="primaryArea"
                        label="Area Name"
                        placeholder="e.g., Downtown Los Angeles"
                      />
                      <SelectField
                        name="primaryRadius"
                        label="Servicing Radius"
                        options={radiusOptions}
                        placeholder="Select radius"
                      />
                    </div>
                  </div>

                  {/* Secondary Area */}
                  <div>
                    <h3 className="text-sm font-semibold text-[#d5b367] mb-3">Secondary Area</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InputField
                        name="secondaryArea"
                        label="Area Name"
                        placeholder="e.g., Beverly Hills"
                      />
                      <SelectField
                        name="secondaryRadius"
                        label="Servicing Radius"
                        options={radiusOptions}
                        placeholder="Select radius"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Plan & Assignment */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#d5b367]/20 flex items-center justify-center">
                    <IconCreditCard className="w-5 h-5 text-[#d5b367]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Plan & Assignment</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    name="accountManager"
                    label="Account Manager"
                    placeholder="Assigned account manager"
                    required={false}
                  />
                  <SelectField
                    name="selectedPlan"
                    label="Select Plan"
                    options={planOptions}
                    placeholder="Choose your plan"
                  />
                </div>
              </div>

              {/* Section 5: Addresses */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#d5b367]/20 flex items-center justify-center">
                    <IconBuilding className="w-5 h-5 text-[#d5b367]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Addresses</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/70">Billing Address*</label>
                    <textarea
                      name="billingAddress"
                      required
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your billing address"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-white/70">Shipping Address*</label>
                    <textarea
                      name="shippingAddress"
                      required
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your shipping address (or same as billing)"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-12 py-4 rounded-lg bg-[#d5b367] text-[#161616] font-semibold hover:bg-[#c9a555] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wide text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#161616]/30 border-t-[#161616] rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <IconSend className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>

                {/* Privacy & Terms Links */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <Link href="/privacy" className="text-[#d5b367] text-sm hover:underline">
                    Privacy Policy
                  </Link>
                  <span className="text-white/30">|</span>
                  <Link href="/terms" className="text-[#d5b367] text-sm hover:underline">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
