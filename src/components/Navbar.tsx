"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  ArrowIcon,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "About Us", link: "/#about-us" },
  { name: "Benefits", link: "/#benefits" },
  { name: "Services", link: "/#services" },
  { name: "CRM", link: "/#crm" },
  { name: "SEO Agent Profile", link: "/agent-profile" },
  { name: "FAQ", link: "/#faq" },
];

export default function NavbarDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <NavbarButton variant="primary" href="/pricing">
          Get Started
          <ArrowIcon />
        </NavbarButton>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <NavItems
            items={navItems}
            className="flex-col items-start gap-2"
            onItemClick={() => setMobileMenuOpen(false)}
          />
          <div className="mt-8 pt-6 border-t border-white/10">
            <NavbarButton
              variant="primary"
              href="/pricing"
              className="w-full justify-center"
            >
              Get Started
              <ArrowIcon />
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
