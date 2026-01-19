"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
  IconClock,
  IconUser,
  IconCheck,
  IconArrowLeft,
} from "@tabler/icons-react";

interface BookingCalendarProps {
  onBookingComplete: (booking: BookingData) => void;
}

export interface BookingData {
  date: Date;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  question: string;
  consentContact: boolean;
  consentTerms: boolean;
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

const interestOptions = [
  "Social Media Marketing",
  "PPC & Google Ads",
  "SEO & Local Search",
  "Content Creation",
  "Video Production",
  "AI Automation",
  "Full Marketing Package",
  "Other",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingCalendar({ onBookingComplete }: BookingCalendarProps) {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    question: "",
    consentContact: false,
    consentTerms: false,
  });

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days: (Date | null)[] = [];

    // Add padding for days before the first of the month
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Disable past dates and weekends
    return date < today || date.getDay() === 0 || date.getDay() === 6;
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
      setStep(2);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onBookingComplete({
      date: selectedDate,
      time: selectedTime,
      ...formData,
    });

    setIsSubmitting(false);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const formatDate = (date: Date) => {
    return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="w-full">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                step >= s
                  ? "bg-[#d5b367] text-[#161616]"
                  : "bg-white/10 text-white/40"
              }`}
            >
              {step > s ? <IconCheck className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-0.5 transition-colors ${
                  step > s ? "bg-[#d5b367]" : "bg-white/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex items-center justify-center gap-8 mb-8 text-sm">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-white" : "text-white/40"}`}>
          <IconCalendar className="w-4 h-4" />
          <span>Select Date</span>
        </div>
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-white" : "text-white/40"}`}>
          <IconClock className="w-4 h-4" />
          <span>Select Time</span>
        </div>
        <div className={`flex items-center gap-2 ${step >= 3 ? "text-white" : "text-white/40"}`}>
          <IconUser className="w-4 h-4" />
          <span>Your Details</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Calendar */}
        {step === 1 && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <IconChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold text-white">
                  {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <IconChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-white/40 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, idx) => (
                  <div key={idx} className="aspect-square">
                    {date ? (
                      <button
                        onClick={() => handleDateSelect(date)}
                        disabled={isDateDisabled(date)}
                        className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          isDateDisabled(date)
                            ? "text-white/20 cursor-not-allowed"
                            : selectedDate?.toDateString() === date.toDateString()
                            ? "bg-[#d5b367] text-[#161616]"
                            : "text-white hover:bg-[#d5b367]/20 hover:text-[#d5b367]"
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
            </div>
          </motion.div>
        )}

        {/* Step 2: Time Selection */}
        {step === 2 && (
          <motion.div
            key="time"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
              >
                <IconArrowLeft className="w-4 h-4" />
                Back to calendar
              </button>

              <div className="mb-6">
                <p className="text-white/60 text-sm">Selected date:</p>
                <p className="text-white text-lg font-medium">
                  {selectedDate && formatDate(selectedDate)}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">
                Select a time slot
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      selectedTime === time
                        ? "bg-[#d5b367] text-[#161616]"
                        : "bg-white/5 border border-white/10 text-white hover:border-[#d5b367]/50 hover:bg-[#d5b367]/10"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Form */}
        {step === 3 && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
              >
                <IconArrowLeft className="w-4 h-4" />
                Back to time selection
              </button>

              <div className="mb-6 p-4 rounded-lg bg-[#d5b367]/10 border border-[#d5b367]/20">
                <p className="text-white/60 text-sm mb-1">Your appointment:</p>
                <p className="text-white font-medium">
                  {selectedDate && formatDate(selectedDate)} at {selectedTime}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    I am interested in... *
                  </label>
                  <select
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#161616]">Select an option</option>
                    {interestOptions.map((option) => (
                      <option key={option} value={option} className="bg-[#161616]">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Question for the team (optional)
                  </label>
                  <textarea
                    name="question"
                    rows={3}
                    value={formData.question}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#d5b367] focus:ring-1 focus:ring-[#d5b367] transition-colors resize-none"
                    placeholder="Any specific questions you'd like us to address?"
                  />
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        name="consentContact"
                        checked={formData.consentContact}
                        onChange={handleInputChange}
                        className="sr-only peer"
                        required
                      />
                      <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                        {formData.consentContact && (
                          <IconCheck className="w-3 h-3 text-[#161616]" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      I consent to being contacted by phone, email, or text for the purpose of discussing services. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        name="consentTerms"
                        checked={formData.consentTerms}
                        onChange={handleInputChange}
                        className="sr-only peer"
                        required
                      />
                      <div className="w-5 h-5 rounded border border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                        {formData.consentTerms && (
                          <IconCheck className="w-3 h-3 text-[#161616]" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      I agree to the{" "}
                      <a href="/terms" className="text-[#d5b367] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-[#d5b367] hover:underline">
                        Privacy Policy
                      </a>
                      . *
                    </span>
                  </label>
                </div>

                {/* reCAPTCHA-like verification */}
                <div className="pt-2">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <label className="flex items-center gap-3 cursor-pointer group flex-1">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          name="notRobot"
                          required
                          className="sr-only peer"
                        />
                        <div className="w-6 h-6 rounded border-2 border-white/20 bg-white/5 peer-checked:bg-[#d5b367] peer-checked:border-[#d5b367] transition-colors flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#161616] opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        I&apos;m not a robot
                      </span>
                    </label>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/40">
                          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <span className="text-[10px] text-white/30 mt-1">Verify</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.consentContact || !formData.consentTerms}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#d5b367] text-[#161616] font-medium hover:bg-[#c9a555] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#161616]/30 border-t-[#161616] rounded-full animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <IconCalendar className="w-5 h-5" />
                      Schedule Discovery Call
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
