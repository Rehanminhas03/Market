"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, icon }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
        "bg-[#161616] border border-[#d5b367]/20",
        "text-sm text-[#d5b367] font-light",
        className
      )}
    >
      {icon && (
        <div className="w-5 h-5 relative opacity-90">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>
      )}
      {children}
    </div>
  );
};
