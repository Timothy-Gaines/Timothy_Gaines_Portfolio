"use client";

import { motion } from "framer-motion";
import { ChevronDown, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel p-8 md:p-10 relative z-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="section-label text-secondary-text"
            >
              PROJECT MANAGER & DEVELOPER
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-primary-text mt-4 mb-6"
            >
              Timothy Gaines
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-body text-xl text-secondary-text mb-6 max-w-lg leading-relaxed"
            >
              Project Management, Operations, Business Development, and Analytics. I build systems that make spending clearer, faster, and easier to manage.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <span className="w-2.5 h-2.5 bg-teal rounded-full animate-glow-pulse" />
              <span className="font-mono text-base text-secondary-text">
                Seeking roles in: Project Management | Product Management | Operations | Business Development | Data Analytics
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 max-w-xl"
            >
              {impactMetrics.map((metric, index) => (
                <motion.div
                  key={metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="min-w-0"
                >
                  <Badge
                    variant="outline"
                    className="w-full text-base font-body text-primary-text border-border-focus bg-surface-overlay px-4 py-2 h-auto rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  >
                    {metric}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <Separator className="mb-8 bg-glass-border" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="default"
                size="lg"
                className="font-body text-base h-12 min-w-[180px] px-7 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200"
                render={
                  <a
                    href="/Timothy%20Gaines%20Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-body text-base h-12 min-w-[180px] px-7 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/15 transition-all duration-200"
                onClick={handleScrollToContact}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </motion.div>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center">
            <FloatingProfileCard
              imageSrc="/images/headshot.jpg"
              alt="Timothy Gaines - Project Manager and Developer"
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-sm text-secondary-text tracking-wider">
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
