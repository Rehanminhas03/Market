"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
}

// Arrow Icon - diagonal pointing top-right
const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-4 h-4", className)}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  href,
  onClick,
}) => {
  const baseStyles =
    "group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-300 border border-white/10 overflow-hidden";

  const variants = {
    primary:
      "bg-[#d5b367] text-[#161616] hover:bg-[#c9a555] shadow-[0_0.7px_0.7px_-0.625px_rgba(0,0,0,0.15),0_1.8px_1.8px_-1.25px_rgba(0,0,0,0.14),0_3.6px_3.6px_-1.875px_rgba(0,0,0,0.14),0_6.9px_6.9px_-2.5px_rgba(0,0,0,0.13),0_13.6px_13.6px_-3.125px_rgba(0,0,0,0.1),0_30px_30px_-3.75px_rgba(0,0,0,0.05)]",
    secondary:
      "bg-white/[0.06] text-white hover:bg-white/10 shadow-[0_0.7px_0.7px_-0.625px_rgba(0,0,0,0.15),0_1.8px_1.8px_-1.25px_rgba(0,0,0,0.14),0_3.6px_3.6px_-1.875px_rgba(0,0,0,0.14),0_6.9px_6.9px_-2.5px_rgba(0,0,0,0.13),0_13.6px_13.6px_-3.125px_rgba(0,0,0,0.1),0_30px_30px_-3.75px_rgba(0,0,0,0.05)]",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };

  const content = (
    <span className="relative block overflow-hidden h-[1.2em]">
      {/* Original text - rolls up on hover */}
      <span className="flex items-center gap-2 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {children}
        {variant === "primary" && <ArrowUpRight />}
      </span>
      {/* Duplicate text - rolls in from below */}
      <span className="absolute left-0 top-0 flex items-center gap-2 translate-y-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        {children}
        {variant === "primary" && <ArrowUpRight />}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {content}
    </button>
  );
};
