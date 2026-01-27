"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Treasurer / Operations Specialist",
    company: "Bronco Space",
    location: "Pomona, CA",
    period: "Dec 2022 to Present",
    bullets: [
      "Responsible for fiscal management and operational integrity",
      "Coordinate with five project teams containing 150+ members on financial status and procurement",
      "Built internal tools for reimbursements, expense tracking, and visibility",
    ],
  },
  {
    id: 2,
    title: "Student Services Assistant",
    company: "Cal Poly Pomona Bookstore",
    location: "Pomona, CA",
    period: "Aug 2022 to Present",
    bullets: [
      "Support high-volume operations and customer service",
      "Improved internal tracking through organized workflows and Excel tooling",
    ],
  },
  {
    id: 3,
    title: "Project Management Intern",
    company: "Southern California Edison (SCE)",
    location: "Hybrid",
    period: "May 2024 to Aug 2024",
    bullets: [
      "Assisted in coordinating multiple projects simultaneously",
      "Supported tracking, timelines, and deliverable completion with safety standards in mind",
      "Contributed to dashboards and reporting for performance visibility",
    ],
  },
];

function TimelineNode({
  experience,
  index,
  isActive,
  onClick,
}: {
  experience: Experience;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onClick={onClick}
      className={`relative pl-8 pb-8 cursor-pointer group ${
        index < experiences.length - 1 ? "border-l-2 border-border" : ""
      }`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px] transition-all duration-300 ${
          isActive
            ? "bg-signal-orange scale-110 shadow-lg shadow-signal-orange/30"
            : "bg-border group-hover:bg-secondary-text"
        }`}
      />

      {/* Content preview */}
      <div
        className={`glass-panel-subtle p-4 transition-all duration-300 ${
          isActive
            ? "border-signal-orange/50 shadow-md"
            : "group-hover:border-secondary-text/30"
        }`}
      >
        <h3
          className={`font-heading text-lg font-semibold transition-colors ${
            isActive ? "text-signal-orange" : "text-primary-text group-hover:text-signal-orange"
          }`}
        >
          {experience.title}
        </h3>
        <p className="font-body text-sm text-secondary-text">
          {experience.company}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Calendar className="w-3 h-3 text-secondary-text" />
          <span className="font-mono text-xs text-secondary-text">
            {experience.period}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceDetail({ experience }: { experience: Experience }) {
  return (
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel p-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-semibold text-primary-text mb-2">
          {experience.title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-secondary-text">
          <span className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span className="font-body">{experience.company}</span>
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="font-body">{experience.location}</span>
          </span>
        </div>
        <p className="font-mono text-sm text-secondary-text mt-2">
          {experience.period}
        </p>
      </div>

      {/* Bullets */}
      <ul className="space-y-3">
        {experience.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex items-start gap-3 font-body text-secondary-text"
          >
            <span className="w-1.5 h-1.5 bg-signal-orange rounded-full mt-2 flex-shrink-0" />
            {bullet}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [activeExperience, setActiveExperience] = useState<Experience>(
    experiences[0]
  );

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-signal-orange tracking-wider">
            BACKGROUND
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary-text mt-2">
            Experience
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Timeline */}
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <TimelineNode
                key={exp.id}
                experience={exp}
                index={index}
                isActive={activeExperience.id === exp.id}
                onClick={() => setActiveExperience(exp)}
              />
            ))}
          </div>

          {/* Detail Panel */}
          <div className="lg:sticky lg:top-32 h-fit">
            <ExperienceDetail experience={activeExperience} />
          </div>
        </div>
      </div>
    </section>
  );
}
