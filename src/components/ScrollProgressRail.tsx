"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "story", label: "Story" },
  { id: "featured", label: "Featured" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgressRail() {
  const [activeSection, setActiveSection] = useState<string>("story");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {/* Progress line background */}
      <div className="absolute right-[7px] top-0 bottom-0 w-[2px] bg-border/50 rounded-full" />
      
      {/* Active progress indicator */}
      <motion.div
        className="absolute right-[7px] top-0 w-[2px] bg-signal-orange rounded-full origin-top"
        style={{ height: `${scrollProgress * 100}%` }}
      />

      {sections.map((section) => {
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className="relative flex items-center gap-3 group py-2"
            aria-label={`Go to ${section.label}`}
          >
            {/* Label - shows on active or hover */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="font-mono text-xs text-signal-orange font-medium"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Hover label (when not active) */}
            {!isActive && (
              <span className="font-mono text-xs text-secondary-text opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {section.label}
              </span>
            )}

            {/* Dot/Bar indicator */}
            <div className="relative z-10">
              {isActive ? (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-4 h-4 bg-signal-orange rounded-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ) : (
                <div className="w-2 h-2 bg-border group-hover:bg-secondary-text rounded-full transition-all duration-200" />
              )}
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}
