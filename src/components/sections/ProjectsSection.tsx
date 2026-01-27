"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ProjectModal from "../ProjectModal";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Inventory Tracker",
    description:
      "A location-based lab inventory system for Bronco Space. Built around item locations today, with a planned camera-based workflow to detect items and return them to the correct station.",
    tags: ["Excel", "Operations", "Process Design"],
    fullDescription:
      "This inventory system was designed to solve the problem of misplaced equipment in a busy lab environment. The system tracks items by their designated locations and provides clear workflows for check-in and check-out processes.",
    challenge:
      "Lab equipment was frequently misplaced, causing delays and frustration when team members couldn't find tools they needed for their projects.",
    solution:
      "Created an Excel-based tracking system with location assignments, check-out logs, and visual dashboards showing current item locations and availability.",
    impact:
      "Reduced time spent searching for equipment by establishing clear location protocols and accountability tracking.",
  },
  {
    id: 2,
    title: "Custom Spotify Keychains and Online Store",
    description:
      "Managed the full product lifecycle: automated STL personalization with Python, 3D-printed keychains in PLA, and built a Shopify storefront with Blender-rendered product images and SEO.",
    tags: ["Python", "3D Printing", "Shopify", "Blender"],
    fullDescription:
      "A complete e-commerce venture from product design to customer fulfillment, combining technical automation with creative design and business operations.",
    challenge:
      "Creating personalized products at scale required automating the customization process while maintaining quality and managing an online storefront.",
    solution:
      "Built Python scripts to automate STL file personalization, established 3D printing workflows for consistent quality, and created a professional Shopify store with Blender-rendered product imagery.",
    impact:
      "Successfully launched and operated an e-commerce business with automated production pipelines and professional presentation.",
  },
  {
    id: 3,
    title: "Predicting Academic Success and Student Dropouts",
    description:
      "Analyzed 4,424 student records and built regression and KNN models. Improved KNN accuracy from 70% to 73% and presented results with clear evaluation metrics.",
    tags: ["Python", "Pandas", "scikit-learn", "Data Visualization"],
    fullDescription:
      "A data science project focused on predicting student outcomes using machine learning techniques applied to educational data.",
    challenge:
      "Educational institutions need early warning systems to identify students at risk of dropping out so they can provide timely interventions.",
    solution:
      "Analyzed a large dataset of student records using Python and scikit-learn, building and comparing regression and KNN models to predict academic outcomes.",
    impact:
      "Achieved 73% accuracy with KNN model after optimization, providing actionable insights for student success initiatives.",
  },
  {
    id: 4,
    title: "Power BI Dashboard",
    description:
      "Developed Power BI dashboards during my internship at Southern California Edison to track performance and goals with real-time visibility for decision-making.",
    tags: ["Power BI", "Reporting", "Stakeholders"],
    fullDescription:
      "Enterprise-level business intelligence dashboards created during a professional internship to support organizational decision-making.",
    challenge:
      "Teams needed real-time visibility into performance metrics and goal progress to make informed decisions and stay aligned on priorities.",
    solution:
      "Designed and implemented Power BI dashboards that consolidated data from multiple sources into clear, actionable visualizations for stakeholders.",
    impact:
      "Improved performance visibility and enabled data-driven decision-making across project teams.",
  },
  {
    id: 5,
    title: "EV Charging Station Analysis",
    description:
      "SQL-based analysis of large datasets to identify infrastructure trends and produce clear, visual insights.",
    tags: ["SQL", "Analytics", "Dashboarding"],
    fullDescription:
      "A data analysis project examining electric vehicle charging infrastructure using SQL queries and data visualization techniques.",
    challenge:
      "Understanding EV charging infrastructure trends requires analyzing large datasets to identify patterns and opportunities.",
    solution:
      "Used SQL to query and analyze charging station data, creating visualizations that highlight geographic distribution, usage patterns, and growth trends.",
    impact:
      "Produced clear insights about EV infrastructure that could inform planning and investment decisions.",
  },
  {
    id: 6,
    title: "Receipt Pipeline UI Concepts",
    description:
      "Design and UI experiments focused on improving how users submit receipts, validate details, and track reimbursement status with clarity and speed.",
    tags: ["UX", "UI", "Workflow"],
    fullDescription:
      "User experience design explorations for receipt submission and reimbursement tracking interfaces.",
    challenge:
      "Receipt submission and reimbursement tracking often involves confusing interfaces that slow down users and lead to errors.",
    solution:
      "Created UI concepts that prioritize clarity, speed, and error prevention in the receipt submission workflow, with clear status indicators and intuitive navigation.",
    impact:
      "Design concepts that inform the development of user-friendly reimbursement tools.",
  },
];

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className="glass-panel p-6 cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-signal-orange"
    >
      {/* Title */}
      <h3 className="font-heading text-xl font-semibold text-primary-text mb-3 group-hover:text-signal-orange transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-body text-secondary-text text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="tech-tag text-xs group-hover:border-signal-orange/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-sm text-signal-orange tracking-wider">
              MORE WORK
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary-text mt-2">
              Projects
            </h2>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
