"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  return <div ref={ref} className={`animated-divider ${isInView ? "visible" : ""}`} />;
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-30px" });

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionDivider />
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-10"
        >
          <span className="section-label">CAPABILITIES</span>
          <h2 className="font-heading text-4xl md:text-5xl font-normal text-primary-text mt-2">
            Skills and Tools
          </h2>
          <span className={`section-heading-line ${headingInView ? "visible" : ""}`} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-border h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/15 hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-card-foreground">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                          duration: 0.3,
                        }}
                      >
                        <Badge
                          variant="outline"
                          className="font-mono text-sm text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center font-mono text-base text-secondary-text mt-12 max-w-2xl mx-auto"
        >
          I focus on clean UX, reliable workflows, and measurable operational impact.
        </motion.p>
      </div>
    </section>
  );
}
