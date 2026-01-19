import NavbarDemo from "@/components/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import StatsCounter from "@/components/sections/StatsCounter";
import HowItWorks from "@/components/sections/Stats";
import Benefits from "@/components/sections/Benefits";
import Services from "@/components/sections/Services";
// import Testimonials from "@/components/sections/Testimonials";
import CRM from "@/components/sections/CRM";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
      <ScrollProgress />
      <NavbarDemo />
      <Hero />
      <AboutUs />
      <StatsCounter />
      <HowItWorks />
      <Benefits />
      <Services />
      {/* <Testimonials /> */}
      <CRM />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
