"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBuilding,
  IconLicense,
  IconMap,
  IconTarget,
  IconCreditCard,
  IconTruck,
  IconCheck,
  IconArrowRight,
  IconArrowLeft,
  IconSparkles,
} from "@tabler/icons-react";
import NavbarDemo from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/scroll-progress";

// US States
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

// Radius options
const RADIUS_OPTIONS = [
  { value: "15-30", label: "15–30 miles" },
  { value: "30-50", label: "30–50 miles" },
  { value: "50-80", label: "50–80 miles" },
];

// Plan options
const PLAN_OPTIONS = [
  { value: "dealflow", label: "$399 — Dealflow", price: "$399" },
  { value: "marketedge", label: "$699 — MarketEdge", price: "$699" },
  { value: "closepoint", label: "$999 — ClosePoint", price: "$999" },
  { value: "core", label: "$2,695 — Core (up to 5 agents)", price: "$2,695" },
  { value: "scale", label: "$3,899 — Scale (up to 10 agents)", price: "$3,899" },
];

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mls: string;
  licenseNumber: string;
  // Location Information
  city: string;
  state: string;
  // Service Areas
  primaryArea: string;
  primaryRadius: string;
  secondaryArea: string;
  secondaryRadius: string;
  // Plan & Assignment
  accountManager: string;
  selectedPlan: string;
  // Addresses
  billingAddress: string;
  shippingAddress: string;
  sameAsBilling: boolean;
}

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan") || "";
  const crmFromUrl = searchParams.get("crm") === "true";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    mls: "",
    licenseNumber: "",
    city: "",
    state: "",
    primaryArea: "",
    primaryRadius: "",
    secondaryArea: "",
    secondaryRadius: "",
    accountManager: "",
    selectedPlan: planFromUrl,
    billingAddress: "",
    shippingAddress: "",
    sameAsBilling: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Update plan from URL when component mounts
  useEffect(() => {
    if (planFromUrl) {
      setFormData(prev => ({ ...prev, selectedPlan: planFromUrl }));
    }
  }, [planFromUrl]);

  // Handle same as billing checkbox
  useEffect(() => {
    if (formData.sameAsBilling) {
      setFormData(prev => ({ ...prev, shippingAddress: prev.billingAddress }));
    }
  }, [formData.sameAsBilling, formData.billingAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.mls.trim()) newErrors.mls = "MLS is required";
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.primaryArea.trim()) newErrors.primaryArea = "Primary area is required";
    if (!formData.primaryRadius) newErrors.primaryRadius = "Primary radius is required";
    if (!formData.selectedPlan) newErrors.selectedPlan = "Please select a plan";
    if (!formData.billingAddress.trim()) newErrors.billingAddress = "Billing address is required";
    if (!formData.shippingAddress.trim() && !formData.sameAsBilling) {
      newErrors.shippingAddress = "Shipping address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector(".text-red-400");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          shippingAddress: formData.sameAsBilling ? formData.billingAddress : formData.shippingAddress,
          includeCRM: crmFromUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { title: "Personal Information", icon: IconUser },
    { title: "Location", icon: IconMapPin },
    { title: "Service Areas", icon: IconTarget },
    { title: "Plan & Assignment", icon: IconSparkles },
    { title: "Addresses", icon: IconTruck },
  ];

  if (isSubmitted) {
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
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <IconCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Submission Received!
              </h1>
              <p className="text-white/60 text-lg mb-4">
                Thank you for your submission. Our team will review your information and get in touch within 24-48 hours.
              </p>
              <p className="text-white/50 text-base mb-8">
                A confirmation email has been sent to <span className="text-[#d5b367]">support@marketlyn.com</span>
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d5b367] text-[#0a0a0a] font-medium rounded-full hover:bg-[#c9a555] transition-colors"
                >
                  Return Home
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors"
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
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative pt-32 pb-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#d5b367]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#d5b367]/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#d5b367]/10 text-[#d5b367] text-sm font-medium rounded-full border border-[#d5b367]/20 mb-6">
              Onboarding
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let&apos;s Get You Started
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Complete the form below to begin your journey with Marketlyn. We&apos;ll have you up and running in no time.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {sections.map((section, idx) => (
              <div key={idx} className="flex items-center">
                <button
                  onClick={() => setCurrentSection(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currentSection === idx
                      ? "bg-[#d5b367] text-[#0a0a0a]"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.title}</span>
                  <span className="sm:hidden">{idx + 1}</span>
                </button>
                {idx < sections.length - 1 && (
                  <div className="w-4 h-px bg-white/20 mx-1" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Section 1: Personal Information */}
            <div className={currentSection === 0 ? "block" : "hidden"}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#d5b367]/20 flex items-center justify-center">
                  <IconUser className="w-5 h-5 text-[#d5b367]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.firstName ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.lastName ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.email ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <IconPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.phone ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* MLS */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    MLS <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <IconBuilding className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      name="mls"
                      value={formData.mls}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.mls ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                      placeholder="Enter your MLS ID"
                    />
                  </div>
                  {errors.mls && <p className="text-red-400 text-sm mt-1">{errors.mls}</p>}
                </div>

                {/* License Number */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    License Number <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <IconLicense className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.licenseNumber ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                      placeholder="Enter your license number"
                    />
                  </div>
                  {errors.licenseNumber && <p className="text-red-400 text-sm mt-1">{errors.licenseNumber}</p>}
                </div>
              </div>
            </div>

            {/* Section 2: Location Information */}
            <div className={currentSection === 1 ? "block" : "hidden"}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#d5b367]/20 flex items-center justify-center">
                  <IconMapPin className="w-5 h-5 text-[#d5b367]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Location Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    City <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.city ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                    placeholder="Los Angeles"
                  />
                  {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    State <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.state ? "border-red-400" : "border-white/10"} rounded-xl text-white focus:outline-none focus:border-[#d5b367] transition-colors appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[#161616]">Select a state</option>
                    {US_STATES.map(state => (
                      <option key={state} value={state} className="bg-[#161616]">{state}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Service Areas */}
            <div className={currentSection === 2 ? "block" : "hidden"}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#d5b367]/20 flex items-center justify-center">
                  <IconTarget className="w-5 h-5 text-[#d5b367]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Service Areas</h2>
              </div>

              {/* Primary Area */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Primary Area</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Primary Area <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <IconMap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        name="primaryArea"
                        value={formData.primaryArea}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.primaryArea ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors`}
                        placeholder="Enter your primary area"
                      />
                    </div>
                    {errors.primaryArea && <p className="text-red-400 text-sm mt-1">{errors.primaryArea}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Servicing Radius <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="primaryRadius"
                      value={formData.primaryRadius}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.primaryRadius ? "border-red-400" : "border-white/10"} rounded-xl text-white focus:outline-none focus:border-[#d5b367] transition-colors appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-[#161616]">Select radius</option>
                      {RADIUS_OPTIONS.map(option => (
                        <option key={option.value} value={option.value} className="bg-[#161616]">{option.label}</option>
                      ))}
                    </select>
                    {errors.primaryRadius && <p className="text-red-400 text-sm mt-1">{errors.primaryRadius}</p>}
                  </div>
                </div>
              </div>

              {/* Secondary Area */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Secondary Area <span className="text-white/40 text-sm font-normal">(Optional)</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Secondary Area
                    </label>
                    <div className="relative">
                      <IconMap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                      <input
                        type="text"
                        name="secondaryArea"
                        value={formData.secondaryArea}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors"
                        placeholder="Enter your secondary area"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Servicing Radius
                    </label>
                    <select
                      name="secondaryRadius"
                      value={formData.secondaryRadius}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d5b367] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#161616]">Select radius</option>
                      {RADIUS_OPTIONS.map(option => (
                        <option key={option.value} value={option.value} className="bg-[#161616]">{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Plan & Assignment */}
            <div className={currentSection === 3 ? "block" : "hidden"}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#d5b367]/20 flex items-center justify-center">
                  <IconSparkles className="w-5 h-5 text-[#d5b367]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Plan & Assignment</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Manager */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Account Manager <span className="text-white/40 text-sm font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="accountManager"
                    value={formData.accountManager}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors"
                    placeholder="Enter account manager name"
                  />
                </div>

                {/* Select Plan */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Select Plan <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="selectedPlan"
                    value={formData.selectedPlan}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.selectedPlan ? "border-red-400" : "border-white/10"} rounded-xl text-white focus:outline-none focus:border-[#d5b367] transition-colors appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[#161616]">Select a plan</option>
                    {PLAN_OPTIONS.map(option => (
                      <option key={option.value} value={option.value} className="bg-[#161616]">{option.label}</option>
                    ))}
                  </select>
                  {errors.selectedPlan && <p className="text-red-400 text-sm mt-1">{errors.selectedPlan}</p>}
                </div>
              </div>

              {crmFromUrl && (
                <div className="mt-6 p-4 bg-[#d5b367]/10 border border-[#d5b367]/30 rounded-xl">
                  <p className="text-[#d5b367] text-sm font-medium">
                    ✓ CRM Add-on ($197) will be included with your plan
                  </p>
                </div>
              )}
            </div>

            {/* Section 5: Addresses */}
            <div className={currentSection === 4 ? "block" : "hidden"}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#d5b367]/20 flex items-center justify-center">
                  <IconTruck className="w-5 h-5 text-[#d5b367]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Addresses</h2>
              </div>

              <div className="space-y-6">
                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Billing Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <IconCreditCard className="absolute left-4 top-4 w-5 h-5 text-white/30" />
                    <textarea
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.billingAddress ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors resize-none`}
                      placeholder="Enter your billing address"
                    />
                  </div>
                  {errors.billingAddress && <p className="text-red-400 text-sm mt-1">{errors.billingAddress}</p>}
                </div>

                {/* Same as Billing Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                      {formData.sameAsBilling && <IconCheck className="w-3 h-3 text-[#0a0a0a]" />}
                    </div>
                  </div>
                  <span className="text-white/70 text-sm">Shipping address same as billing</span>
                </label>

                {/* Shipping Address */}
                {!formData.sameAsBilling && (
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Shipping Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <IconTruck className="absolute left-4 top-4 w-5 h-5 text-white/30" />
                      <textarea
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.shippingAddress ? "border-red-400" : "border-white/10"} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#d5b367] transition-colors resize-none`}
                        placeholder="Enter your shipping address"
                      />
                    </div>
                    {errors.shippingAddress && <p className="text-red-400 text-sm mt-1">{errors.shippingAddress}</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  currentSection === 0
                    ? "opacity-50 cursor-not-allowed bg-white/5 text-white/50"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
                disabled={currentSection === 0}
              >
                <IconArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentSection < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentSection(prev => Math.min(sections.length - 1, prev + 1))}
                  className="flex items-center gap-2 px-6 py-3 bg-[#d5b367] text-[#0a0a0a] rounded-full font-medium hover:bg-[#c9a555] transition-all"
                >
                  Next
                  <IconArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-[#d5b367] text-[#0a0a0a] rounded-full font-medium hover:bg-[#c9a555] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <IconCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
