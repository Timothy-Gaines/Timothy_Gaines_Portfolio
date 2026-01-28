"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Product and Program Management",
    skills: [
      "Product Requirements and PRDs",
      "Workflow and Process Design",
      "Stakeholder Communication",
      "Cross-Functional Coordination",
      "Roadmapping and Prioritization",
      "User-Centered Design Thinking",
    ],
  },
  {
    name: "Data, Analytics, and Decision Support",
    skills: [
      "Data Analysis and Interpretation",
      "Operational Metrics and KPIs",
      "Dashboard Design",
      "SQL-Based Data Exploration",
      "Excel and Spreadsheet Modeling",
    ],
  },
  {
    name: "Applied AI and Automation",
    skills: [
      "AI-Assisted Workflow Automation",
      "Receipt OCR and Data Extraction",
      "AI Validation and Error Detection",
      "Human-in-the-Loop Review Systems",
      "Prompt Engineering for Business Use Cases",
    ],
  },
  {
    name: "Systems, Platforms, and Tools",
    skills: [
      "Cursor AI",
      "GitHub",
      "Vercel",
      "Docker",
      "Cloud Run",
      "AI Receipt Extraction",
      "PowerBI",
      "Excel",
      "PowerPoint",
      "Word",
      "SQL",
      "Python",
      "CodeX",
      "Claude",
      "OpenAI",
      "Anthropic",
      "Google Cloud",
    ],
  },
];


export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-signal-orange tracking-wider">
            CAPABILITIES
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary-text mt-2">
            Skills and Tools
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="glass-panel p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-primary-text mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                      duration: 0.3,
                    }}
                    className="tech-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center font-mono text-sm text-secondary-text mt-12 max-w-2xl mx-auto"
        >
          I focus on clean UX, reliable workflows, and measurable operational impact.
        </motion.p>
      </div>
    </section>
  );
}
