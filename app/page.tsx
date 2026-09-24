import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { ShowreelSection } from "@/components/sections/showreel-section";
import { WorksSection } from "@/components/sections/works-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-ember selection:text-obsidian">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <StatsSection />
        <ShowreelSection />
        <WorksSection />
        <AboutSection />
        <ServicesSection />
      </main>
      <ContactSection />
    </div>
  );
}
