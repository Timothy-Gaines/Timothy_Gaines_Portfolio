"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github } from "lucide-react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 py-32"
      style={{
        background: "linear-gradient(to bottom, #E7DACB, #FBF6EE)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-text mb-6"
        >
          Say Hello
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-body text-lg md:text-xl text-secondary-text mb-10 max-w-2xl mx-auto"
        >
          If you want someone who can build clean systems, communicate clearly, and ship practical tools, let&apos;s connect.
        </motion.p>

        {/* Primary CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          href="mailto:YOUR_EMAIL_HERE"
          className="btn-primary font-body text-lg px-8 py-4 inline-flex items-center gap-3"
        >
          <Mail className="w-5 h-5" />
          Email Timothy
        </motion.a>

        {/* Secondary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center gap-4 mt-8"
        >
          <a
            href="YOUR_LINKEDIN_URL_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-4 text-secondary-text hover:text-signal-orange hover:border-signal-orange transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="YOUR_GITHUB_URL_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-4 text-secondary-text hover:text-signal-orange hover:border-signal-orange transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-mono text-xs text-secondary-text mt-16"
        >
          © {new Date().getFullYear()} Timothy Gaines. Built with Next.js and React Three Fiber.
        </motion.p>
      </div>
    </section>
  );
}
