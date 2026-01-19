"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { IconPlayerPlayFilled, IconQuote, IconX } from "@tabler/icons-react";
import Image from "next/image";

// Mix of text testimonials and video testimonials
const testimonials = [
  {
    type: "text",
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechStart Inc",
    content:
      "Marketlyn transformed our business. We went from struggling with visibility to having a consistent pipeline of qualified prospects.",
    bgColor: "#d5b367", // Gold
    textColor: "#161616",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    type: "video",
    name: "Michael Chen",
    role: "CEO",
    company: "GrowthLab",
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    type: "text",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "Bloom Agency",
    content:
      "They deliver real results, not just vanity metrics. My business has grown 40% since working with them.",
    bgColor: "#ffffff", // White
    textColor: "#161616",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    type: "video",
    name: "David Thompson",
    role: "VP of Marketing",
    company: "Nexus Solutions",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/7579554/7579554-uhd_2732_1440_25fps.mp4",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    type: "text",
    name: "Jessica Williams",
    role: "Business Owner",
    company: "Elite Services",
    content:
      "The quality of campaigns they run is exceptional. We've seen a 3x return on our investment.",
    bgColor: "#e8d5a3", // Light gold
    textColor: "#161616",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    type: "video",
    name: "Robert Martinez",
    role: "Managing Director",
    company: "Prime Consulting",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
    videoUrl: "https://videos.pexels.com/video-files/8350984/8350984-uhd_2560_1440_25fps.mp4",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    type: "text",
    name: "Amanda Foster",
    role: "E-commerce Owner",
    company: "StyleBox",
    content:
      "Our conversion rate has increased by 60%. Their marketing strategies are on another level.",
    bgColor: "#ffffff",
    textColor: "#161616",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    type: "video",
    name: "Kevin Park",
    role: "Operations Director",
    company: "Swift Logistics",
    thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/6774496/6774496-uhd_2732_1440_25fps.mp4",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  },
];

// Video Modal Component
function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  name: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>

            {/* Video player */}
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            >
              <track kind="captions" label={`${name} testimonial`} />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Text testimonial card component
function TextCard({
  testimonial,
}: {
  testimonial: {
    name: string;
    role: string;
    company: string;
    content?: string;
    bgColor?: string;
    textColor?: string;
    avatar: string;
  };
}) {
  return (
    <div
      className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[320px] md:h-[360px] rounded-2xl p-5 md:p-6 flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: testimonial.bgColor }}
    >
      {/* Quote icon */}
      <div>
        <IconQuote
          className="w-8 h-8 md:w-10 md:h-10 mb-4"
          style={{ color: testimonial.textColor, opacity: 0.15 }}
        />
        <p
          className="text-sm md:text-base font-medium leading-relaxed line-clamp-5"
          style={{ color: testimonial.textColor }}
        >
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3 mt-4">
        <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4
            className="text-sm md:text-base font-semibold"
            style={{ color: testimonial.textColor }}
          >
            {testimonial.name}
          </h4>
          <p
            className="text-xs md:text-sm opacity-70"
            style={{ color: testimonial.textColor }}
          >
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// Video testimonial card component
function VideoCard({
  testimonial,
  onPlay,
}: {
  testimonial: {
    name: string;
    role: string;
    company: string;
    thumbnail?: string;
    videoUrl?: string;
    avatar: string;
  };
  onPlay: () => void;
}) {
  return (
    <div
      className="relative flex-shrink-0 w-[220px] md:w-[260px] h-[320px] md:h-[360px] rounded-2xl overflow-hidden group cursor-pointer"
      onClick={onPlay}
    >
      {/* Thumbnail image */}
      <Image
        src={testimonial.thumbnail || ""}
        alt={testimonial.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Play button */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconPlayerPlayFilled className="w-6 h-6 md:w-7 md:h-7 text-white ml-0.5" />
      </motion.div>

      {/* Video indicator */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Video
      </div>

      {/* Author info at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white/30">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-white text-sm md:text-base font-semibold">
              {testimonial.name}
            </h4>
            <p className="text-white/70 text-xs md:text-sm">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    name: string;
  } | null>(null);

  // Triple the testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      <section
        id="testimonials"
        className="relative py-20 md:py-28 overflow-hidden"
        ref={ref}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(213, 179, 103, 0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Badge */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Badge>Testimonials</Badge>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            className="text-base text-white/60 text-center max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join hundreds of satisfied businesses who trust us with their growth
          </motion.p>
        </div>

        {/* Horizontal Scrolling Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Gradient masks for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#161616] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#161616] to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-5"
              animate={{
                x: ["0%", "-33.333%"],
              }}
              transition={{
                x: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                },
              }}
              style={{ width: "fit-content" }}
            >
              {duplicatedTestimonials.map((testimonial, idx) => (
                <div key={idx} className="flex-shrink-0">
                  {testimonial.type === "text" ? (
                    <TextCard
                      testimonial={
                        testimonial as typeof testimonials[0] & {
                          content: string;
                          bgColor: string;
                          textColor: string;
                        }
                      }
                    />
                  ) : (
                    <VideoCard
                      testimonial={
                        testimonial as typeof testimonials[1] & {
                          thumbnail: string;
                          videoUrl: string;
                        }
                      }
                      onPlay={() =>
                        setActiveVideo({
                          url: (testimonial as { videoUrl?: string }).videoUrl || "",
                          name: testimonial.name,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="max-w-7xl mx-auto px-4 mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-white/40 text-sm">
            See yourself here?{" "}
            <a
              href="/contact"
              className="text-[#d5b367] hover:text-[#e8d5a3] transition-colors"
            >
              Let&apos;s talk about your success story.
            </a>
          </p>
        </motion.div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url || ""}
        name={activeVideo?.name || ""}
      />
    </>
  );
}
