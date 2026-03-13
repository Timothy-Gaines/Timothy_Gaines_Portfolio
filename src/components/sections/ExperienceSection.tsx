"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    title: "Treasurer - Analyst Operations",
    company: "Bronco Space Laboratory",
    location: "Pomona, CA",
    period: "Dec 2022 to Present",
    bullets: [
      "Oversaw $45K+ annual budget, procurement, and cost planning for 150+ team members across aerospace design projects.",
      "Built an AI-powered full-stack reimbursement web system (React, FastAPI, Firebase) streamlining financial workflows, boosting transparency and reducing processing time by 35%.",
      "Developed Excel VBA/Macros inventory and cost-tracking systems to improve tracking, visibility, and audit readiness.",
      "Facilitated weekly syncs with engineering and leadership to bridge financial strategies with technical roadmaps.",
      "Presented budget reports and analytics to stakeholders, enabling data-informed decisions.",
    ],
  },
  {
    id: 2,
    title: "Student Service Assistant",
    company: "Cal Poly Pomona Bookstore",
    location: "Pomona, CA",
    period: "Aug 2022 to Present",
    bullets: [
      "Developed automated Excel tools to optimize stock tracking and reduce inventory discrepancies.",
      "Delivered consistent, high-quality customer service during high-volume academic seasons.",
    ],
  },
  {
    id: 3,
    title: "Project Management Intern",
    company: "Southern California Edison (SCE)",
    location: "Hybrid",
    period: "May 2024 to Aug 2024",
    bullets: [
      "Built interactive Power BI dashboards for executive-level performance reviews, enabling faster decision-making with real-time data insights.",
      "Contributed to project charters and financial updates for leadership, aligning deliverables across operations.",
      "Supported multiple projects, tracking milestones and deliverables in Microsoft Project while ensuring compliance with safety and operational standards.",
      "Partnered with engineers and technical teams to convert complex data sets into actionable reports for technical and non-technical stakeholders.",
      "Coordinated tasks across multiple workstreams and communicated progress and risks to stakeholders in clear written and verbal updates.",
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
      <div
        className={`absolute left-0 top-0 w-4 h-4 rounded-full -translate-x-[9px] transition-all duration-300 ${
          isActive
            ? "bg-primary scale-110 shadow-lg shadow-primary/25"
            : "bg-border group-hover:bg-muted-foreground"
        }`}
      />

      <Card
        className={`transition-all duration-300 bg-card/60 backdrop-blur-sm hover:-translate-y-0.5 ${
          isActive
            ? "border-primary/50 shadow-md shadow-primary/10"
            : "border-border group-hover:border-muted-foreground/50 hover:shadow-lg hover:shadow-black/15"
        }`}
      >
        <CardContent className="p-4">
          <h3
            className={`font-heading text-xl font-semibold transition-colors ${
              isActive ? "text-primary" : "text-card-foreground group-hover:text-primary"
            }`}
          >
            {experience.title}
          </h3>
          <p className="font-body text-base text-muted-foreground">
            {experience.company}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-mono text-sm text-muted-foreground">
              {experience.period}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ExperienceDetail({ experience }: { experience: Experience }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={experience.id}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardContent className="p-8">
            <div className="mb-4">
              <h3 className="font-heading text-3xl font-normal text-card-foreground mb-2">
                {experience.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="font-body text-base">{experience.company}</span>
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-body text-base">{experience.location}</span>
                </span>
              </div>
              <p className="font-mono text-sm text-muted-foreground mt-2">
                {experience.period}
              </p>
            </div>

            <Separator className="mb-4" />

            <ul className="space-y-3">
              {experience.bullets.map((bullet, i) => (
                <motion.li
                  key={`${experience.id}-${i}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.35, ease: "easeOut" }}
                  className="flex items-start gap-3 font-body text-base text-muted-foreground leading-relaxed"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 400 }}
                    className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"
                  />
                  {bullet}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  return <div ref={ref} className={`animated-divider ${isInView ? "visible" : ""}`} />;
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-30px" });
  const [activeExperience, setActiveExperience] = useState<Experience>(
    experiences[0]
  );

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionDivider />
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-10"
        >
          <span className="section-label">BACKGROUND</span>
          <h2 className="font-heading text-4xl md:text-5xl font-normal text-primary-text mt-2">
            Experience
          </h2>
          <span className={`section-heading-line ${headingInView ? "visible" : ""}`} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
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

          <div className="lg:sticky lg:top-32 h-fit">
            <ExperienceDetail experience={activeExperience} />
          </div>
        </div>
      </div>
    </section>
  );
}
