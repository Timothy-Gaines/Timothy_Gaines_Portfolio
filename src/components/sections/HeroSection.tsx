"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingProfileCard from "../FloatingProfileCard";

const impactMetrics = [
  "Managed $45K+ annual budget",
  "Supported 150+ members",
  "Built reimbursement platform",
  "Reduced processing time by 35%",
];

export default function HeroSection() {
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="story" className="min-h-screen relative flex items-center">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Glass Intro Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel p-8 md:p-10 relative z-20"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono text-sm text-secondary-text tracking-wider"
            >
              PROJECT MANAGER & DEVELOPER
            </motion.span>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-text mt-4 mb-6"
            >
              Timothy Gaines
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-body text-lg text-secondary-text mb-6 max-w-lg"
            >
              Project Management, Operations, Business Development, and Analytics. I build systems that make spending clearer, faster, and easier to manage.
            </motion.p>

            {/* Availability Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              <span className="font-mono text-sm text-secondary-text">
                Seeking roles in: Project Management | Operations | Business Development | Data Analytics
              </span>
            </motion.div>

            {/* Impact Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {impactMetrics.map((metric, index) => (
                <motion.span
                  key={metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="glass-pill text-sm font-body text-primary-text"
                >
                  {metric}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/Timothy%20Gaines%20Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary font-body text-base"
              >
                View Resume
              </a>
              <button
                onClick={handleScrollToContact}
                className="btn-secondary font-body text-base"
              >
                Contact
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Floating Profile Card */}
          <div className="hidden lg:flex items-center justify-center">
            <FloatingProfileCard
              imageSrc="/images/profile.png"
              alt="Timothy Gaines - Project Manager and Developer"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-xs text-secondary-text">
          Scroll to Enter
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-secondary-text" />
        </motion.div>
      </motion.div>
    </section>
  );
}
