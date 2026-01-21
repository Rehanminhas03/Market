"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Footer from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconCalendarEvent,
  IconSend,
  IconClock,
  IconCalendar,
  IconWorld,
  IconChevronLeft,
  IconChevronRight,
  IconUser,
} from "@tabler/icons-react";
import siteConfig from "@/config/site.json";
import Link from "next/link";

// Calendar constants
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Business hours in Central Time (CT) - 9 AM to 5 PM
const BUSINESS_TIMEZONE = "America/Chicago"; // Central Time
const businessHoursCT = [
  { hour: 9, minute: 0 },
  { hour: 9, minute: 30 },
  { hour: 10, minute: 0 },
  { hour: 10, minute: 30 },
  { hour: 11, minute: 0 },
  { hour: 11, minute: 30 },
  { hour: 12, minute: 0 },
  { hour: 12, minute: 30 },
  { hour: 13, minute: 0 },
  { hour: 13, minute: 30 },
  { hour: 14, minute: 0 },
  { hour: 14, minute: 30 },
  { hour: 15, minute: 0 },
  { hour: 15, minute: 30 },
  { hour: 16, minute: 0 },
  { hour: 16, minute: 30 },
  { hour: 17, minute: 0 },
];

// Convert Central Time to user's local timezone
const convertCTToLocal = (hour: number, minute: number, date: Date): Date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Calculate offset difference between Central Time and user's local timezone
  const testDate = new Date(`${year}-${month}-${day}T12:00:00Z`);
  const ctOffset = new Date(testDate.toLocaleString('en-US', { timeZone: BUSINESS_TIMEZONE })).getTime() - testDate.getTime();
  const localOffset = new Date(testDate.toLocaleString('en-US')).getTime() - testDate.getTime();
  const diffMs = localOffset - ctOffset;

  // Apply the offset difference to get local time
  const resultDate = new Date(date);
  resultDate.setHours(hour, minute, 0, 0);
  resultDate.setTime(resultDate.getTime() + diffMs);

  return resultDate;
};

// Format time for display in user's local timezone
const formatLocalTime = (hour: number, minute: number, date: Date): string => {
  const localDate = convertCTToLocal(hour, minute, date);
  return localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// Get user's timezone abbreviation
const getUserTimezoneAbbr = (): string => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date();
  const tzAbbr = date.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop() || '';
  return tzAbbr;
};

// Format time in Central Time for submission
const formatCTTime = (hour: number, minute: number): string => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const displayMinute = String(minute).padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period} CT`;
};

const subjectOptions = [
  "Social Media Marketing",
  "Lead Generation",
  "SEO & Local Search",
  "Content Creation",
  "Video Production",
  "AI Automation",
  "Full Marketing Package",
  "General Inquiry",
  "Other",
];

const interestOptions = [
  "Social Media Marketing",
  "Lead Generation",
  "SEO & Local Search",
  "Content Creation",
  "Video Production",
  "AI Automation",
  "Full Marketing Package",
  "Other",
];

export default function ContactPage() {
  // Calendar booking state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ hour: number; minute: number } | null>(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Calendar, 2: Time, 3: Form
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    interest: "",
    question: "",
    consentSMS: false,
    consentMarketing: false,
    agreeTerms: false,
  });

  // Contact form state (right column)
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    consentSMS: false,
    consentMarketing: false,
    agreeTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days: (Date | null)[] = [];

    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
      setBookingStep(2);
    }
  };

  const handleTimeSelect = (slot: { hour: number; minute: number }) => {
    setSelectedTimeSlot(slot);
    setBookingStep(3);
  };

  // Get display time in Central Time
  const getDisplayTime = (slot: { hour: number; minute: number } | null): string => {
    if (!slot) return "";
    return formatCTTime(slot.hour, slot.minute);
  };

  // Get time in CT for submission
  const getCTTime = (slot: { hour: number; minute: number } | null): string => {
    if (!slot) return "";
    return formatCTTime(slot.hour, slot.minute);
  };

  const handleBookingFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setBookingForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setBookingForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) return;

    setIsBookingSubmitting(true);
    setBookingError("");

    const localTimeDisplay = getDisplayTime(selectedTimeSlot);
    const ctTimeDisplay = getCTTime(selectedTimeSlot);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${bookingForm.firstName} ${bookingForm.lastName}`,
          email: bookingForm.email,
          phone: bookingForm.phone,
          company: bookingForm.interest,
          message: `Discovery Call Booking\n\nDate: ${formatDate(selectedDate)}\nTime: ${ctTimeDisplay} (Client's local time: ${localTimeDisplay})\nClient Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n\nInterest: ${bookingForm.interest}\n\nQuestion: ${bookingForm.question || "No question provided"}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to schedule call");
      }

      setBookingComplete(true);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Failed to schedule call. Please try again.");
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormState((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          phone: formState.phone,
          company: formState.subject,
          message: formState.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormState({
        firstName: "", lastName: "", phone: "", email: "",
        subject: "", message: "", consentSMS: false, consentMarketing: false, agreeTerms: false
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${days[date.getDay()]}, ${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const resetBooking = () => {
    setBookingComplete(false);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setBookingStep(1);
    setBookingForm({
      firstName: "", lastName: "", phone: "", email: "",
      interest: "", question: "", consentSMS: false, consentMarketing: false, agreeTerms: false
    });
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#161616]">
      <ScrollProgress />
      <NavbarDemo />

      <main className="relative pt-32 pb-20 px-4 overflow-hidden">
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

          {/* Center glow */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-[#d5b367]/5 blur-[150px]" />

          {/* Bottom-right ambient blob */}
          <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full bg-emerald-500/3 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>Get In Touch</Badge>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Let&apos;s Connect
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-white/60 text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Complete the form and our team will connect with you
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Calendar Booking */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {bookingComplete && selectedDate && selectedTimeSlot ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <IconCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Call Scheduled!</h2>
                  <p className="text-white/60 mb-6">We&apos;ve sent a confirmation email to {bookingForm.email}</p>
                  <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[#d5b367]/10 border border-[#d5b367]/20">
                    <IconCalendarEvent className="w-6 h-6 text-[#d5b367]" />
                    <div className="text-left">
                      <p className="text-white font-medium">{formatDate(selectedDate)}</p>
                      <p className="text-white/60 text-sm">{getDisplayTime(selectedTimeSlot)} (15 minutes)</p>
                    </div>
                  </div>
                  <button
                    onClick={resetBooking}
                    className="mt-6 text-[#d5b367] hover:underline text-sm block mx-auto"
                  >
                    Schedule another call
                  </button>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  {/* Meeting Info Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[#d5b367]/20 flex items-center justify-center">
                      <span className="text-[#d5b367] font-bold text-sm">{siteConfig.name.charAt(0)}</span>
                    </div>
                    <span className="text-white/60 text-sm">{siteConfig.name.toLowerCase()}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-4">
                    {siteConfig.name} Discovery Call (15-minutes)
                  </h2>

                  {/* Meeting Details */}
                  <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 text-sm">
                      <IconClock className="w-4 h-4 text-white/40" />
                      <span className="text-white/70">15 Mins</span>
                    </div>
                    {selectedDate && (
                      <div className="flex items-center gap-3 text-sm">
                        <IconCalendar className="w-4 h-4 text-white/40" />
                        <span className="text-white/70">{formatDate(selectedDate)}</span>
                      </div>
                    )}
                    {selectedTimeSlot && selectedDate && (
                      <div className="flex items-center gap-3 text-sm">
                        <IconClock className="w-4 h-4 text-white/40" />
                        <span className="text-white/70">{getDisplayTime(selectedTimeSlot)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <IconWorld className="w-4 h-4 text-white/40" />
                      <span className="text-white/70">Central Time (CT) - US</span>
                    </div>
                    <p className="text-white/50 text-sm pt-2 border-t border-white/10">
                      Discover How Leveraging AI Can Significantly Boost Your Presence & Drive Results...
                    </p>
                  </div>

                  {/* Step Indicator */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            bookingStep >= step
                              ? "bg-[#d5b367] text-[#161616]"
                              : "bg-white/10 text-white/40"
                          }`}
                        >
                          {bookingStep > step ? <IconCheck className="w-4 h-4" /> : step}
                        </div>
                        {step < 3 && (
                          <div className={`w-8 h-0.5 ${bookingStep > step ? "bg-[#d5b367]" : "bg-white/10"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step Labels */}
                  <div className="flex items-center justify-center gap-6 mb-6 text-xs">
                    <div className={`flex items-center gap-1 ${bookingStep >= 1 ? "text-white" : "text-white/40"}`}>
                      <IconCalendar className="w-3 h-3" />
                      <span>Date</span>
                    </div>
                    <div className={`flex items-center gap-1 ${bookingStep >= 2 ? "text-white" : "text-white/40"}`}>
                      <IconClock className="w-3 h-3" />
                      <span>Time</span>
                    </div>
                    <div className={`flex items-center gap-1 ${bookingStep >= 3 ? "text-white" : "text-white/40"}`}>
                      <IconUser className="w-3 h-3" />
                      <span>Details</span>
                    </div>
                  </div>

                  {/* Step 1: Calendar */}
                  {bookingStep === 1 && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={handlePrevMonth}
                          className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                          <IconChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-white font-medium">
                          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h3>
                        <button
                          onClick={handleNextMonth}
                          className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                          <IconChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-white/40 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date, idx) => (
                          <div key={idx} className="aspect-square">
                            {date ? (
                              <button
                                onClick={() => handleDateSelect(date)}
                                disabled={isDateDisabled(date)}
                                className={`w-full h-full rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                                  isDateDisabled(date)
                                    ? "text-white/20 cursor-not-allowed"
                                    : selectedDate?.toDateString() === date.toDateString()
                                    ? "bg-white text-black"
                                    : "text-white hover:bg-white/10"
                                }`}
                              >
                                {date.getDate()}
                              </button>
                            ) : (
                              <div />
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="text-xs text-white/40 mb-2">Time zone</p>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <IconWorld className="w-4 h-4" />
                          <span>Central Time (CT) - US</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: Time Selection */}
                  {bookingStep === 2 && selectedDate && (
                    <div>
                      <button
                        onClick={() => setBookingStep(1)}
                        className="text-[#d5b367] text-sm hover:underline mb-4 flex items-center gap-1"
                      >
                        <IconChevronLeft className="w-4 h-4" />
                        Back to calendar
                      </button>
                      <h3 className="text-white font-medium mb-2">Select a time</h3>
                      <p className="text-white/50 text-xs mb-4">
                        Times shown in Central Time (CT)
                      </p>
                      <div className="grid grid-cols-3 gap-2 max-h-[280px] overflow-y-auto pr-2">
                        {businessHoursCT.map((slot, idx) => {
                          const isSelected = selectedTimeSlot?.hour === slot.hour && selectedTimeSlot?.minute === slot.minute;
                          const displayTime = formatCTTime(slot.hour, slot.minute);
                          return (
                            <button
                              key={idx}
                              onClick={() => handleTimeSelect(slot)}
                              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-[#d5b367] text-[#161616]"
                                  : "bg-white/5 border border-white/10 text-white hover:border-[#d5b367]/50 hover:bg-[#d5b367]/10"
                              }`}
                            >
                              {displayTime}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Booking Form */}
                  {bookingStep === 3 && selectedDate && selectedTimeSlot && (
                    <div>
                      <button
                        onClick={() => setBookingStep(2)}
                        className="text-[#d5b367] text-sm hover:underline mb-4 flex items-center gap-1"
                      >
                        <IconChevronLeft className="w-4 h-4" />
                        Back to time selection
                      </button>

                      {bookingError && (
                        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                          <p className="text-red-400 text-sm">{bookingError}</p>
                        </div>
                      )}

                      <form onSubmit={handleBookingSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={bookingForm.firstName}
                            onChange={handleBookingFormChange}
                            placeholder="First Name*"
                            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#d5b367] transition-colors"
                          />
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={bookingForm.lastName}
                            onChange={handleBookingFormChange}
                            placeholder="Last Name*"
                            className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#d5b367] transition-colors"
                          />
                        </div>

                        <input
                          type="tel"
                          name="phone"
                          required
                          value={bookingForm.phone}
                          onChange={handleBookingFormChange}
                          placeholder="Phone*"
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#d5b367] transition-colors"
                        />

                        <input
                          type="email"
                          name="email"
                          required
                          value={bookingForm.email}
                          onChange={handleBookingFormChange}
                          placeholder="Email*"
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#d5b367] transition-colors"
                        />

                        <select
                          name="interest"
                          required
                          value={bookingForm.interest}
                          onChange={handleBookingFormChange}
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d5b367] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#161616]">I am interested in...*</option>
                          {interestOptions.map((option) => (
                            <option key={option} value={option} className="bg-[#161616]">
                              {option}
                            </option>
                          ))}
                        </select>

                        <textarea
                          name="question"
                          rows={2}
                          value={bookingForm.question}
                          onChange={handleBookingFormChange}
                          placeholder="Question for the team (optional)"
                          className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#d5b367] transition-colors resize-none"
                        />

                        {/* Consent Checkboxes */}
                        <div className="space-y-2 pt-1">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <div className="relative flex-shrink-0 mt-0.5">
                              <input
                                type="checkbox"
                                name="consentSMS"
                                checked={bookingForm.consentSMS}
                                onChange={handleBookingFormChange}
                                className="sr-only peer"
                              />
                              <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                                {bookingForm.consentSMS && <IconCheck className="w-2.5 h-2.5 text-[#161616]" />}
                              </div>
                            </div>
                            <span className="text-[10px] text-white/50 leading-relaxed">
                              I Consent to Receive SMS Notifications from {siteConfig.name}. Message & data rates may apply.
                            </span>
                          </label>

                          <label className="flex items-start gap-2 cursor-pointer">
                            <div className="relative flex-shrink-0 mt-0.5">
                              <input
                                type="checkbox"
                                name="consentMarketing"
                                checked={bookingForm.consentMarketing}
                                onChange={handleBookingFormChange}
                                className="sr-only peer"
                              />
                              <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                                {bookingForm.consentMarketing && <IconCheck className="w-2.5 h-2.5 text-[#161616]" />}
                              </div>
                            </div>
                            <span className="text-[10px] text-white/50 leading-relaxed">
                              I agree to receive marketing messages from {siteConfig.name}.
                            </span>
                          </label>

                          <label className="flex items-start gap-2 cursor-pointer">
                            <div className="relative flex-shrink-0 mt-0.5">
                              <input
                                type="checkbox"
                                name="agreeTerms"
                                required
                                checked={bookingForm.agreeTerms}
                                onChange={handleBookingFormChange}
                                className="sr-only peer"
                              />
                              <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                                {bookingForm.agreeTerms && <IconCheck className="w-2.5 h-2.5 text-[#161616]" />}
                              </div>
                            </div>
                            <span className="text-[10px] text-white/50 leading-relaxed">
                              I agree to the <Link href="/terms" className="text-[#d5b367] hover:underline">Terms and Conditions</Link>, <Link href="/refund" className="text-[#d5b367] hover:underline">Refund Policy</Link>, and <Link href="/privacy" className="text-[#d5b367] hover:underline">Privacy Policy</Link>.*
                            </span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={isBookingSubmitting || !bookingForm.agreeTerms}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#d5b367] text-[#161616] font-semibold hover:bg-[#c9a555] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {isBookingSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-[#161616]/30 border-t-[#161616] rounded-full animate-spin" />
                              Scheduling...
                            </>
                          ) : (
                            <>
                              <IconCalendarEvent className="w-4 h-4" />
                              Schedule Call
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Prefer written introduction text */}
              <div className="mb-6 text-center">
                <p className="text-white/70 text-lg font-medium">Prefer a written introduction first?</p>
              </div>

              {error && (
                <motion.div
                  className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              {isSubmitted ? (
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <IconCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formState.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name*"
                      className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                    />
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formState.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name*"
                      className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="Phone*"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                  />

                  <select
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#161616]">Subject*</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option} className="bg-[#161616]">
                        {option}
                      </option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Message"
                    className="w-full px-4 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors resize-none"
                  />

                  {/* Consent Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          name="consentSMS"
                          checked={formState.consentSMS}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                          {formState.consentSMS && <IconCheck className="w-3 h-3 text-[#161616]" />}
                        </div>
                      </div>
                      <span className="text-xs text-white/50 leading-relaxed">
                        I Consent to Receive SMS Notifications, Alerts from {siteConfig.name}. Message frequency varies. Message & data rates may apply. You can reply STOP to unsubscribe at any time.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          name="consentMarketing"
                          checked={formState.consentMarketing}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                          {formState.consentMarketing && <IconCheck className="w-3 h-3 text-[#161616]" />}
                        </div>
                      </div>
                      <span className="text-xs text-white/50 leading-relaxed">
                        By checking this box I agree to receive occasional marketing messages from {siteConfig.name}.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          required
                          checked={formState.agreeTerms}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                          {formState.agreeTerms && <IconCheck className="w-3 h-3 text-[#161616]" />}
                        </div>
                      </div>
                      <span className="text-xs text-white/50 leading-relaxed">
                        I agree to the <Link href="/terms" className="text-[#d5b367] hover:underline">Terms and Conditions</Link>, <Link href="/refund" className="text-[#d5b367] hover:underline">Refund Policy</Link>, and <Link href="/privacy" className="text-[#d5b367] hover:underline">Privacy Policy</Link>.*
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formState.agreeTerms}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[#d5b367] text-[#161616] font-semibold hover:bg-[#c9a555] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wide"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#161616]/30 border-t-[#161616] rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <IconSend className="w-5 h-5" />
                        Submit
                      </>
                    )}
                  </button>

                  {/* Privacy & Terms Links */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <Link href="/privacy" className="text-[#d5b367] text-sm hover:underline">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-[#d5b367] text-sm hover:underline">
                      Terms of Service
                    </Link>
                  </div>

                  {/* Direct Contact Options */}
                  <div className="pt-4 border-t border-white/10 mt-4">
                    <p className="text-white/40 text-sm mb-4 text-center">Or contact us directly</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={`tel:${siteConfig.phone?.replace(/[^+\d]/g, '')}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-[#d5b367] hover:bg-white/10 hover:border-[#d5b367]/30 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">{siteConfig.phone}</span>
                      </a>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-[#d5b367] hover:bg-white/10 hover:border-[#d5b367]/30 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{siteConfig.email}</span>
                      </a>
                    </div>

                    {/* Address - Commented out
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/50">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        {siteConfig.address?.street}, {siteConfig.address?.city}, {siteConfig.address?.state} {siteConfig.address?.zip}
                      </span>
                    </div>
                    */}
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
