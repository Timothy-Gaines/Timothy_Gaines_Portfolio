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
  flickerPhase: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const createParticles = useCallback((w: number, h: number): Particle[] => {
    const particles: Particle[] = [];
    const count = Math.min(Math.floor((w * h) / 8000), 200);

    for (let i = 0; i < count; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 1 + depth * 2.5,
        speedX: (Math.random() - 0.5) * 0.3 * (0.3 + depth * 0.7),
        speedY: (Math.random() - 0.5) * 0.2 * (0.3 + depth * 0.7),
        opacity: 0.15 + depth * 0.45,
        depth,
        flickerPhase: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      particlesRef.current = createParticles(w, h);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 83, ${p.opacity * 0.5})`;
        ctx.fill();
      });
      return;
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const time = performance.now() * 0.001;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactRadius = 160;
        if (dist < interactRadius && p.depth > 0.3) {
          const force = ((interactRadius - dist) / interactRadius) * 0.03;
          p.x -= dx * force;
          p.y -= dy * force;
        }

        const flicker = 0.7 + 0.3 * Math.sin(time * 1.5 + p.flickerPhase);
        const alpha = p.opacity * flicker;

        const isGold = p.depth > 0.35;
        if (isGold) {
          ctx.fillStyle = `rgba(212, 168, 83, ${alpha * 0.65})`;
        } else {
          ctx.fillStyle = `rgba(180, 190, 205, ${alpha * 0.4})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.depth > 0.7 && p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = isGold
            ? `rgba(212, 168, 83, ${alpha * 0.08})`
            : `rgba(180, 190, 205, ${alpha * 0.05})`;
          ctx.fill();
        }
      });

      ctx.strokeStyle = "rgba(212, 168, 83, 0.03)";
      ctx.lineWidth = 0.5;
      const linkDist = 120;
      for (let i = 0; i < particlesRef.current.length; i++) {
        const a = particlesRef.current[i];
        if (a.depth < 0.5) continue;
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const b = particlesRef.current[j];
          if (b.depth < 0.5) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.06;
            ctx.strokeStyle = `rgba(212, 168, 83, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}
