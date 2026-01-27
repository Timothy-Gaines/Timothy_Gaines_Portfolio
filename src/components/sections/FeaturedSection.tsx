"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2 } from "lucide-react";

interface FeaturedProject {
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  impact: string[];
  techStack: string[];
  ctaButtons: { label: string; primary: boolean; href?: string }[];
  textPosition: "left" | "right";
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Reimbursement Hub",
    subtitle: "Full-Stack Web Application | Jul 2025 to Present",
    challenge:
      "Treasurers and project leads needed a clear, consistent way to track expenses, review receipts, reduce manual errors, and maintain real-time visibility into spending across teams.",
    solution:
      "I built a full-stack reimbursement platform to streamline expense submissions, approvals, and tracking. The system supports defined roles and workflows, uses receipt extraction and compliance checks, and provides dashboards for budgeting and expenditure insights.",
    impact: [
      "Rolling out to 15 treasurers and project leads",
      "Improves oversight across 150+ members by reducing manual errors",
      "Delivers real-time dashboards for financial visibility",
    ],
    techStack: [
      "React",
      "FastAPI",
      "Firebase Auth",
      "Firestore",
      "Storage",
      "Docker",
      "Cloud Run",
      "AI Receipt Extraction",
    ],
    ctaButtons: [
      { label: "Open Case Study", primary: true },
      { label: "View Tech Stack", primary: false },
    ],
    textPosition: "left",
  },
  {
    title: "Expense Tracker with Receipt Viewing",
    subtitle: "Excel + VBA + Python Automation | Jan 2022 to Jan 2024",
    challenge:
      "Receipts were submitted into a shared folder, but it was time-consuming to organize them, view them during review, and keep expense logs accurate for analysis and reimbursements.",
    solution:
      "I built an Excel expense tracker with VBA macros and functional buttons for entering data, saving records, and supporting graphical views. I added receipt viewing inside the workbook and wrote a Python script to convert PDFs into JPEGs and automatically move files into the correct locations.",
    impact: [
      "Receipts became viewable alongside logged expenses",
      "Improved organization and repeatability for reimbursement workflows",
      "Reduced time spent on file cleanup and manual sorting",
    ],
    techStack: ["Excel", "VBA", "Python", "File Automation", "Receipt Processing"],
    ctaButtons: [
      { label: "Open Case Study", primary: true },
      { label: "View Details", primary: false },
    ],
    textPosition: "right",
  },
];

function FeaturedChapter({
  project,
  index,
}: {
  project: FeaturedProject;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contentOrder = project.textPosition === "left" ? "order-1" : "order-2";
  const visualOrder = project.textPosition === "left" ? "order-2" : "order-1";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-24 last:mb-0"
    >
      {/* Content Side */}
      <div className={`${contentOrder} lg:${contentOrder}`}>
        <div className="glass-panel p-8 md:p-10">
          {/* Header */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-heading text-2xl md:text-3xl font-semibold text-primary-text mb-2"
          >
            {project.title}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="font-mono text-sm text-secondary-text mb-6"
          >
            {project.subtitle}
          </motion.p>

          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-5"
          >
            <h4 className="font-heading text-sm font-semibold text-signal-orange uppercase tracking-wider mb-2">
              Challenge
            </h4>
            <p className="font-body text-secondary-text leading-relaxed">
              {project.challenge}
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mb-5"
          >
            <h4 className="font-heading text-sm font-semibold text-teal uppercase tracking-wider mb-2">
              Solution
            </h4>
            <p className="font-body text-secondary-text leading-relaxed">
              {project.solution}
            </p>
          </motion.div>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6"
          >
            <h4 className="font-heading text-sm font-semibold text-primary-text uppercase tracking-wider mb-2">
              Impact
            </h4>
            <ul className="space-y-2">
              {project.impact.map((item, i) => (
                <li
                  key={i}
                  className="font-body text-secondary-text flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-signal-orange rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {project.ctaButtons.map((btn) => (
              <button
                key={btn.label}
                className={`${
                  btn.primary ? "btn-primary" : "btn-secondary"
                } font-body text-sm flex items-center gap-2`}
              >
                {btn.primary ? (
                  <ExternalLink className="w-4 h-4" />
                ) : (
                  <Code2 className="w-4 h-4" />
                )}
                {btn.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Visual Side - Space for 3D visualization */}
      <div
        className={`${visualOrder} lg:${visualOrder} hidden lg:flex items-center justify-center min-h-[400px]`}
        aria-hidden="true"
      >
        {/* 3D content renders behind via ThreeBackground */}
        <div className="w-full h-full" />
      </div>
    </motion.div>
  );
}

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section id="featured" ref={sectionRef} className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-signal-orange tracking-wider">
            FEATURED WORK
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary-text mt-2">
            Key Projects
          </h2>
        </motion.div>

        {/* Featured Chapters */}
        {featuredProjects.map((project, index) => (
          <FeaturedChapter key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
