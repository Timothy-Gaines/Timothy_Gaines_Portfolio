"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BrowserMockup from "../BrowserMockup";

interface FeaturedProject {
  title: string;
  subtitle: string;
  challenge: string;
  solution: string;
  impact: string[];
  techStack: string[];
  ctaButtons: { label: string; primary: boolean; href?: string }[];
  textPosition: "left" | "right";
  images: string[];
  mockupTitle?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Reimbursement Hub",
    subtitle: "Full-Stack Web Application | Jul 2025 to Present",
    challenge:
      "Treasurers and project leads needed a consistent process to review receipts, automatically and quickly flag compliance issues, keep expenses organized, and reduce delays in the reimbursement process.",
    solution:
      "I built a full-stack reimbursement platform to streamline expense submissions, approvals, and tracking. The system supports defined roles and workflows, uses receipt extraction and compliance checks, and provides dashboards for budgeting and expenditure insights.",
    impact: [
      "Improves oversight across 150+ members by reducing manual errors",
      "Delivers real-time dashboards for financial visibility",
      "Reduces delays in the reimbursement process by 35%",
    ],
    techStack: [
      "React",
      "FastAPI",
      "Supabase Auth",
      "Cursor",
      "Vercel",
      "Docker",
      "Cloud Run",
      "AI Receipt Extraction",
    ],
    ctaButtons: [
      { label: "View Site", primary: true, href: "https://www.reimbursement-hub.com/" },
    ],
    textPosition: "left",
    images: ["/images/reimbursement-hub-landing.png", "/images/reimbursement-hub-budget.png"],
    mockupTitle: "reimbursement-hub.com",
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
    ctaButtons: [],
    textPosition: "right",
    images: ["/images/expense-tracker.png"],
    mockupTitle: "Expense Tracker.xlsm",
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
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardContent className="p-8 md:p-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-heading text-2xl md:text-3xl font-normal text-card-foreground mb-2"
            >
              {project.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="font-mono text-sm text-muted-foreground mb-6"
            >
              {project.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-5"
            >
              <h4 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Challenge
              </h4>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mb-5"
            >
              <h4 className="font-heading text-sm font-semibold text-chart-2 uppercase tracking-wider mb-2">
                Solution
              </h4>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mb-6"
            >
              <h4 className="font-heading text-sm font-semibold text-card-foreground uppercase tracking-wider mb-2">
                Impact
              </h4>
              <ul className="space-y-2">
                {project.impact.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.35 }}
                    className="font-body text-base text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <Separator className="mb-6" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap gap-1.5 mb-8"
            >
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="font-mono text-xs text-muted-foreground">
                  {tech}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {project.ctaButtons.map((btn) =>
                btn.href ? (
                  <Button
                    key={btn.label}
                    variant={btn.primary ? "default" : "outline"}
                    size="lg"
                    className="font-body text-base px-5 py-2.5"
                    render={
                      <a href={btn.href} target="_blank" rel="noopener noreferrer" />
                    }
                  >
                    {btn.primary ? (
                      <ExternalLink className="w-4 h-4 mr-2" />
                    ) : (
                      <Code2 className="w-4 h-4 mr-2" />
                    )}
                    {btn.label}
                  </Button>
                ) : (
                  <Button
                    key={btn.label}
                    variant={btn.primary ? "default" : "outline"}
                    size="lg"
                    className="font-body text-base px-5 py-2.5"
                  >
                    {btn.primary ? (
                      <ExternalLink className="w-4 h-4 mr-2" />
                    ) : (
                      <Code2 className="w-4 h-4 mr-2" />
                    )}
                    {btn.label}
                  </Button>
                )
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Side - Browser Mockup */}
      <div
        className={`${visualOrder} lg:${visualOrder} flex items-center justify-center min-h-[400px] px-4 lg:px-0`}
      >
        <BrowserMockup
          images={project.images}
          title={project.mockupTitle}
          stacked={project.images.length > 1}
        />
      </div>
    </motion.div>
  );
}

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  return <div ref={ref} className={`animated-divider ${isInView ? "visible" : ""}`} />;
}

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-30px" });

  return (
    <section id="featured" ref={sectionRef} className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionDivider />
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-10"
        >
          <span className="section-label">
            FEATURED WORK
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-normal text-primary-text mt-2">
            Key Projects
          </h2>
          <span className={`section-heading-line ${headingInView ? "visible" : ""}`} />
        </motion.div>

        {/* Featured Chapters */}
        {featuredProjects.map((project, index) => (
          <FeaturedChapter key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
