"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / w, y: e.clientY / h };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    const orbs = [
      { cx: 0.12, cy: 0.15, r: 0.45, color: [212, 168, 83], alpha: 0.12, speed: 0.4, phase: 0, scrollShift: -0.25 },
      { cx: 0.85, cy: 0.3, r: 0.5, color: [45, 157, 138], alpha: 0.08, speed: 0.25, phase: 2, scrollShift: -0.4 },
      { cx: 0.5, cy: 0.6, r: 0.55, color: [212, 168, 83], alpha: 0.07, speed: 0.18, phase: 4, scrollShift: -0.15 },
      { cx: 0.2, cy: 0.8, r: 0.4, color: [45, 157, 138], alpha: 0.1, speed: 0.3, phase: 1, scrollShift: -0.35 },
      { cx: 0.75, cy: 0.9, r: 0.48, color: [212, 168, 83], alpha: 0.06, speed: 0.22, phase: 3, scrollShift: -0.2 },
      { cx: 0.4, cy: 0.05, r: 0.35, color: [100, 120, 160], alpha: 0.05, speed: 0.15, phase: 5, scrollShift: -0.3 },
    ];

    const drawGrid = (time: number) => {
      const spacing = 80;
      const scroll = scrollRef.current;
      const offset = (scroll * 400 + time * 8) % spacing;

      ctx.strokeStyle = "rgba(212, 168, 83, 0.025)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = -spacing + offset; x < w + spacing; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = -spacing + offset; y < h + spacing; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const time = performance.now() * 0.001;
      const scroll = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      drawGrid(time);

      orbs.forEach((orb) => {
        const driftX = Math.sin(time * orb.speed + orb.phase) * w * 0.04;
        const driftY = Math.cos(time * orb.speed * 0.7 + orb.phase) * h * 0.03;
        const scrollY = scroll * h * orb.scrollShift;
        const mouseInfluenceX = (mx - 0.5) * w * 0.05;
        const mouseInfluenceY = (my - 0.5) * h * 0.05;

        const cx = orb.cx * w + driftX + mouseInfluenceX;
        const cy = orb.cy * h + driftY + scrollY + mouseInfluenceY;
        const r = orb.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [cr, cg, cb] = orb.color;
        grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, ${orb.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      const vignetteGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
      vignetteGrad.addColorStop(0, "rgba(0,0,0,0)");
      vignetteGrad.addColorStop(1, "rgba(0,0,0,0.3)");
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      const time = 0;
      ctx.clearRect(0, 0, w, h);
      drawGrid(time);
      orbs.forEach((orb) => {
        const cx = orb.cx * w;
        const cy = orb.cy * h;
        const r = orb.r * Math.max(w, h);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const [cr, cg, cb] = orb.color;
        grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, ${orb.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
