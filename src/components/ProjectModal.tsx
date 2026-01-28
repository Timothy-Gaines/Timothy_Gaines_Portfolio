"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X, Github, Linkedin, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

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
  image?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const linkedInProjectsUrl =
    "https://www.linkedin.com/in/timothy-gaines-329b23257/details/projects/";

  // Handle escape key and reset expanded state
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isImageExpanded) {
          setIsImageExpanded(false);
        } else {
          onClose();
        }
      }
    };

    if (project) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      // Reset expanded state when modal closes
      setIsImageExpanded(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [project, onClose, isImageExpanded]);

  // Focus trap
  useEffect(() => {
    if (project && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-primary-text/20 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-2xl max-h-[85vh] overflow-y-auto relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-secondary-text hover:text-signal-orange transition-colors rounded-lg hover:bg-white/50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project Image */}
            {project.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="relative w-full aspect-[16/10] overflow-hidden rounded-t-xl bg-slate-800/50 cursor-pointer group"
                onClick={() => setIsImageExpanded(true)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 600px"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <ZoomIn className="w-5 h-5 text-primary-text" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <h2
                id="modal-title"
                className="font-heading text-2xl md:text-3xl font-semibold text-primary-text mb-2 pr-10"
              >
                {project.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="font-body text-secondary-text leading-relaxed mb-8">
                {project.fullDescription || project.description}
              </p>

              {/* Challenge / Solution / Impact */}
              {project.challenge && (
                <div className="space-y-6 mb-8">
                  <div className="glass-panel-subtle p-5">
                    <h3 className="font-heading text-sm font-semibold text-signal-orange uppercase tracking-wider mb-2">
                      Challenge
                    </h3>
                    <p className="font-body text-secondary-text">
                      {project.challenge}
                    </p>
                  </div>

                  {project.solution && (
                    <div className="glass-panel-subtle p-5">
                      <h3 className="font-heading text-sm font-semibold text-teal uppercase tracking-wider mb-2">
                        Solution
                      </h3>
                      <p className="font-body text-secondary-text">
                        {project.solution}
                      </p>
                    </div>
                  )}

                  {project.impact && (
                    <div className="glass-panel-subtle p-5">
                      <h3 className="font-heading text-sm font-semibold text-primary-text uppercase tracking-wider mb-2">
                        Impact
                      </h3>
                      <p className="font-body text-secondary-text">
                        {project.impact}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary font-body text-sm flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                ) : (
                  <a
                    href={linkedInProjectsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary font-body text-sm flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox for expanded image */}
      {project?.image && isImageExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90"
          onClick={() => setIsImageExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={750}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setIsImageExpanded(false)}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-primary-text hover:bg-white transition-colors"
              aria-label="Close expanded image"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
