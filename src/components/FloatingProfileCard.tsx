"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface FloatingProfileCardProps {
  imageSrc: string;
  alt: string;
}

export default function FloatingProfileCard({ imageSrc, alt }: FloatingProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse position relative to card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse tracking
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position to rotation values (subtle effect)
  const rotateX = useTransform(smoothMouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-150, 150], [-8, 8]);

  // Subtle shadow shift based on rotation
  const shadowX = useTransform(smoothMouseX, [-150, 150], [15, -15]);
  const shadowY = useTransform(smoothMouseY, [-150, 150], [15, -15]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-md mx-auto"
      style={{ perspective: 1000 }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 3D Card */}
        <motion.div
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {/* Glow effect behind card */}
          <motion.div
            style={{
              x: prefersReducedMotion ? 0 : shadowX,
              y: prefersReducedMotion ? 0 : shadowY,
            }}
            className="absolute inset-0 bg-gradient-to-br from-teal/30 via-signal-orange/20 to-teal/30 rounded-3xl blur-2xl opacity-60 -z-10 scale-105"
          />

          {/* Main card container */}
          <div className="relative overflow-hidden rounded-3xl glass-panel p-3">
            {/* Image container with gradient overlay */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={imageSrc}
                alt={alt}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover object-top"
                priority
              />

              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                style={{
                  x: useTransform(smoothMouseX, [-150, 150], [-100, 100]),
                }}
              />
            </div>

            {/* Name badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-6 left-6 right-6"
            >
              <div className="glass-panel-subtle px-4 py-3 backdrop-blur-md">
                <p className="font-heading text-lg font-semibold text-primary-text">
                  Timothy Gaines
                </p>
                <p className="font-mono text-xs text-secondary-text">
                  Project Manager & Developer
                </p>
              </div>
            </motion.div>
          </div>

          {/* Decorative elements with depth */}
          <motion.div
            style={{ translateZ: 30 }}
            className="absolute -top-3 -right-3 w-16 h-16 bg-signal-orange/20 rounded-full blur-xl"
          />
          <motion.div
            style={{ translateZ: 20 }}
            className="absolute -bottom-4 -left-4 w-20 h-20 bg-teal/20 rounded-full blur-xl"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
