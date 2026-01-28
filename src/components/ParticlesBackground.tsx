"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  depth: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createParticles = useCallback((width: number, height: number): Particle[] => {
    const particles: Particle[] = [];
    const count = Math.floor((width * height) / 15000); // Density based on screen size

    for (let i = 0; i < count; i++) {
      const depth = Math.random(); // 0 = far, 1 = close
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + depth * 2,
        speedX: (Math.random() - 0.5) * 0.3 * (0.5 + depth * 0.5),
        speedY: (Math.random() - 0.5) * 0.2 * (0.5 + depth * 0.5),
        opacity: 0.15 + depth * 0.2,
        depth,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = createParticles(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        // Update position with slight parallax based on depth
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Subtle mouse interaction for closer particles
        if (particle.depth > 0.5) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.02;
            particle.x -= dx * force;
            particle.y -= dy * force;
          }
        }

        // Wrap around edges
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90, 90, 90, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!prefersReducedMotion) {
      animate();
    } else {
      // Just draw static particles once
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90, 90, 90, ${particle.opacity})`;
        ctx.fill();
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
