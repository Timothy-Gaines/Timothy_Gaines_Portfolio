"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  return <div ref={ref} className={`animated-divider ${isInView ? "visible" : ""}`} />;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-30px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 py-32"
      style={{
        background: "linear-gradient(to bottom, var(--background), #14171c)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionDivider />
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-primary-text mb-2 mt-10"
        >
          Say Hello
        </motion.h2>
        <span className={`section-heading-line ${headingInView ? "visible" : ""}`} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-body text-xl md:text-2xl text-secondary-text mb-10 mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          If you want someone who can build clean systems, communicate clearly, and ship practical tools, let&apos;s connect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="font-body text-base px-8 h-11 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200 shrink-0"
            render={<a href="mailto:Timgaines03@gmail.com" />}
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Timothy
          </Button>
        </motion.div>

        <Separator className="my-10 max-w-xs mx-auto" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href="https://www.linkedin.com/in/timothy-gaines-329b23257/"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Button variant="outline" size="icon-lg" className="rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-black/15 hover:border-primary/50 transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>LinkedIn</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  href="https://github.com/Timothy-Gaines"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Button variant="outline" size="icon-lg" className="rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-black/15 hover:border-primary/50 transition-all duration-200">
                <Github className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-mono text-sm text-secondary-text mt-16"
        >
          &copy; {new Date().getFullYear()} Timothy Gaines.
        </motion.p>
      </div>
    </section>
  );
}
