"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, ZoomIn, ZoomOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const linkedInProjectsUrl =
    "https://www.linkedin.com/in/timothy-gaines-329b23257/details/projects/";

  useEffect(() => {
    if (!project) setIsImageExpanded(false);
  }, [project]);

  return (
    <>
      <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          className="w-full max-w-2xl max-h-[85vh] !flex !flex-col gap-0 overflow-hidden bg-card border-border p-0 sm:max-w-2xl"
          showCloseButton={true}
        >
          {project && (
            <>
              {/* Image - fixed at top */}
              {project.image && (
                <div
                  className="relative w-full aspect-[16/10] flex-shrink-0 overflow-hidden rounded-t-xl bg-muted cursor-pointer group"
                  onClick={() => setIsImageExpanded(true)}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 600px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-foreground/90 backdrop-blur-sm rounded-full p-3">
                        <ZoomIn className="w-5 h-5 text-background" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scrollable content area */}
              <div
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain focus:outline-none"
                tabIndex={0}
              >
                <div className="p-6 pt-4 pb-8">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl md:text-3xl font-normal text-card-foreground pr-10">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Details about {project.title}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-5" />

                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  {project.fullDescription || project.description}
                </p>

                {project.challenge && (
                  <div className="space-y-4 mb-6">
                    <Card className="bg-muted/30 border-primary/20">
                      <CardContent className="p-5">
                        <h3 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Challenge
                        </h3>
                        <p className="font-body text-muted-foreground text-sm">
                          {project.challenge}
                        </p>
                      </CardContent>
                    </Card>

                    {project.solution && (
                      <Card className="bg-muted/30 border-chart-2/20">
                        <CardContent className="p-5">
                          <h3 className="font-heading text-sm font-semibold text-chart-2 uppercase tracking-wider mb-2">
                            Solution
                          </h3>
                          <p className="font-body text-muted-foreground text-sm">
                            {project.solution}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {project.impact && (
                      <Card className="bg-muted/30 border-border">
                        <CardContent className="p-5">
                          <h3 className="font-heading text-sm font-semibold text-card-foreground uppercase tracking-wider mb-2">
                            Impact
                          </h3>
                          <p className="font-body text-muted-foreground text-sm">
                            {project.impact}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {project.githubUrl ? (
                    <Button
                      variant="default"
                      className="font-body"
                      render={
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="font-body"
                      render={
                        <a
                          href={linkedInProjectsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  )}
                </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AnimatePresence>
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
                className="absolute top-4 right-4 p-3 bg-foreground/90 backdrop-blur-sm rounded-full text-background hover:bg-foreground transition-colors"
                aria-label="Close expanded image"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
