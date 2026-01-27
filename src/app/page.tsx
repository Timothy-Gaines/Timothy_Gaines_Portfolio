"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import ScrollProgressRail from "@/components/ScrollProgressRail";
import ParticlesBackground from "@/components/ParticlesBackground";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamically import Three.js component to avoid SSR issues
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Background layers */}
      <ParticlesBackground />
      <ThreeBackground />

      {/* Navigation */}
      <Navigation />
      <ScrollProgressRail />

      {/* Content sections */}
      <div className="relative z-20">
        <HeroSection />
        <StorySection />
        <FeaturedSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  );
}
