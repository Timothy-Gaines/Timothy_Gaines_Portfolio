"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ProjectThumbnailProps {
  src: string;
  alt: string;
  index: number;
}

export default function ProjectThumbnail({ src, alt, index }: ProjectThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] overflow-hidden rounded-t-lg bg-slate-800/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clip-path reveal animation */}
      <motion.div
        initial={
          prefersReducedMotion
            ? { opacity: 0 }
            : { clipPath: "inset(100% 0 0 0)" }
        }
        animate={
          isInView
            ? prefersReducedMotion
              ? { opacity: 1 }
              : { clipPath: "inset(0% 0 0 0)" }
            : {}
        }
        transition={{
          delay: index * 0.1,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="relative w-full h-full"
      >
        {/* Image with hover scale */}
        <motion.div
          animate={{
            scale: isHovered && !prefersReducedMotion ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
            className="object-cover object-top"
          />
        </motion.div>

        {/* Gradient overlay that fades on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
        />

        {/* Hover shine effect */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />
      </motion.div>

      {/* Loading skeleton placeholder */}
      <div className="absolute inset-0 bg-slate-800/50 -z-10 animate-pulse" />
    </div>
  );
}
