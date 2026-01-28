"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface BrowserMockupProps {
  images: string[];
  title?: string;
  stacked?: boolean;
}

export default function BrowserMockup({ images, title = "Preview", stacked = false }: BrowserMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse position for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for mouse tracking
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform to rotation (subtle effect)
  const rotateX = useTransform(smoothMouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-5, 5]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
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

  const renderBrowserChrome = () => (
    <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 rounded-t-xl border-b border-slate-700/50">
      {/* Traffic lights */}
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>

      {/* URL bar */}
      <div className="flex-1 mx-4">
        <div className="bg-slate-700/50 rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono truncate">
          {title}
        </div>
      </div>
    </div>
  );

  const handleSwap = () => {
    setActiveIndex((prev) => (prev === 0 ? 1 : 0));
  };

  if (stacked && images.length > 1) {
    const titles = ["Landing Page", "Budget Dashboard"];
    
    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full pb-12"
        style={{ perspective: 1200 }}
      >
        {/* Stacked cards container */}
        <motion.div
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative h-[320px] md:h-[380px] cursor-pointer"
          onClick={handleSwap}
        >
          {/* Card 1 (Landing Page) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={
              isInView
                ? {
                    opacity: activeIndex === 0 ? 1 : 0.6,
                    y: activeIndex === 0 ? 0 : 24,
                    x: activeIndex === 0 ? 0 : 30,
                    scale: activeIndex === 0 ? 1 : 0.92,
                    rotateZ: activeIndex === 0 ? 0 : 2,
                    zIndex: activeIndex === 0 ? 20 : 10,
                  }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
            className="absolute inset-0 w-full"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700/30 bg-slate-900">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 rounded-t-xl border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700/50 rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono truncate">
                    {title} — {titles[0]}
                  </div>
                </div>
              </div>
              <div className="relative aspect-[16/10] bg-slate-900">
                <Image
                  src={images[0]}
                  alt={`${title} - ${titles[0]}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 500px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Card 2 (Budget Page) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={
              isInView
                ? {
                    opacity: activeIndex === 1 ? 1 : 0.6,
                    y: activeIndex === 1 ? 0 : 24,
                    x: activeIndex === 1 ? 0 : 30,
                    scale: activeIndex === 1 ? 1 : 0.92,
                    rotateZ: activeIndex === 1 ? 0 : 2,
                    zIndex: activeIndex === 1 ? 20 : 10,
                  }
                : {}
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
            className="absolute inset-0 w-full"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700/30 bg-slate-900">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 rounded-t-xl border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700/50 rounded-md px-3 py-1.5 text-xs text-slate-400 font-mono truncate">
                    {title} — {titles[1]}
                  </div>
                </div>
              </div>
              <div className="relative aspect-[16/10] bg-slate-900">
                <Image
                  src={images[1]}
                  alt={`${title} - ${titles[1]}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 500px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Hover hint overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white text-sm font-medium">Click to swap</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Indicator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2"
        >
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-signal-orange w-6"
                  : "bg-slate-500 hover:bg-slate-400"
              }`}
              aria-label={`View ${titles[idx]}`}
            />
          ))}
        </motion.div>

        {/* Current view label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -bottom-10 left-0 right-0 text-center font-mono text-xs text-secondary-text"
        >
          {activeIndex === 0 ? titles[0] : titles[1]}
        </motion.p>
      </motion.div>
    );
  }

  // Single image mockup
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
      style={{ perspective: 1200 }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -8, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          style={{
            rotateX: prefersReducedMotion ? 0 : rotateX,
            rotateY: prefersReducedMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal/20 via-signal-orange/10 to-teal/20 rounded-xl blur-xl opacity-50 -z-10 scale-105" />

          {/* Browser window */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700/30 bg-slate-900">
            {renderBrowserChrome()}
            <div className="relative aspect-[16/10] bg-slate-900">
              <Image
                src={images[0]}
                alt={title}
                fill
                sizes="(max-width: 768px) 90vw, 500px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
