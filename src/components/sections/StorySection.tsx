"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const storyBullets = [
  {
    label: "INPUT",
    text: "Receipts arrive in a shared system and must be linked to the right project and spending context.",
  },
  {
    label: "PROCESS",
    text: "Data becomes structured, validated, and reviewable with clear status and audit-ready records.",
  },
  {
    label: "OUTPUT",
    text: "Dashboards and summaries make decisions faster and keep teams aligned on budgets.",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 relative z-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel p-8 md:p-12"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading text-3xl md:text-4xl font-semibold text-primary-text mb-6"
          >
            From receipt upload to reimbursement approval
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-lg text-secondary-text mb-10 leading-relaxed"
          >
            I have built and improved real systems that connect receipts, structured data, approvals, and reporting. This site is a cinematic walkthrough of that workflow, inspired by the tools I built for Bronco Space and my internship experience supporting project coordination and performance visibility.
          </motion.p>

          {/* Bullet Points */}
          <div className="space-y-6">
            {storyBullets.map((bullet, index) => (
              <motion.div
                key={bullet.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                className="flex gap-4 items-start"
              >
                <span className="font-mono text-sm font-medium text-signal-orange bg-signal-orange/10 px-3 py-1 rounded-md whitespace-nowrap">
                  {bullet.label}
                </span>
                <p className="font-body text-secondary-text leading-relaxed pt-0.5">
                  {bullet.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
