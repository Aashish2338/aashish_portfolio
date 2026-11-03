"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  time: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function CometCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isDarkMode = document.documentElement.classList.contains("dark");

    // Watch for theme toggle changes dynamically
    const observer = new MutationObserver(() => {
      isDarkMode = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const updateCanvasSize = () => {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const points: Point[] = [];
    const particles: Particle[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let isHoveringInteractive = false;
    let lastSpawnTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      points.unshift({
        x: mouseX,
        y: mouseY,
        time: performance.now(),
      });

      // Spawn sparkle particles along the trail
      const now = performance.now();
      if (now - lastSpawnTime > 30 && points.length > 2) {
        lastSpawnTime = now;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.8;
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 400 + Math.random() * 300,
          size: 1 + Math.random() * 1.5,
        });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "a, button, input, textarea, select, [role='button'], [tabindex='0']"
        )
      ) {
        isHoveringInteractive = true;
      } else {
        isHoveringInteractive = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    const maxAge = 280; // ms trail duration
    const headRadius = 6; // px width at comet head

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const now = performance.now();

      // Prune expired trail points
      while (points.length > 0 && now - points[points.length - 1].time > maxAge) {
        points.pop();
      }

      // Update and draw sparkle particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 16; // ~60fps
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // slight gravity

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI) * (isDarkMode ? 0.7 : 0.5);
        const size = p.size * (1 - progress * 0.5);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = isDarkMode ? 6 : 4;
        ctx.shadowColor = isDarkMode
          ? "rgba(0, 242, 254, 0.8)"
          : "rgba(99, 102, 241, 0.6)";
        ctx.fillStyle = isDarkMode ? "#67E8F9" : "#818CF8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (points.length > 1) {
        const head = points[0];
        const tail = points[points.length - 1];

        // Draw the tapered ribbon trail
        ctx.save();
        ctx.shadowBlur = isDarkMode ? 14 : 10;
        ctx.shadowColor = isDarkMode
          ? "rgba(0, 242, 254, 0.6)"
          : "rgba(99, 102, 241, 0.45)";

        const leftPoints: { x: number; y: number }[] = [];
        const rightPoints: { x: number; y: number }[] = [];

        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          const progress = i / (points.length - 1); // 0 at head, 1 at tail
          const r = Math.max(0.4, headRadius * Math.pow(1 - progress, 1.4));

          let dx: number;
          let dy: number;
          if (i === 0) {
            dx = points[0].x - points[1].x;
            dy = points[0].y - points[1].y;
          } else if (i === points.length - 1) {
            dx = points[i - 1].x - points[i].x;
            dy = points[i - 1].y - points[i].y;
          } else {
            dx = points[i - 1].x - points[i + 1].x;
            dy = points[i - 1].y - points[i + 1].y;
          }

          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;

          leftPoints.push({ x: pt.x + nx * r, y: pt.y + ny * r });
          rightPoints.push({ x: pt.x - nx * r, y: pt.y - ny * r });
        }

        // Adaptive gradient: White/cyan for dark mode, Indigo-to-Cyan for light mode
        const grad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
        if (isDarkMode) {
          grad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
          grad.addColorStop(0.2, "rgba(240, 253, 255, 0.9)");
          grad.addColorStop(0.5, "rgba(103, 232, 249, 0.5)");
          grad.addColorStop(0.8, "rgba(6, 182, 212, 0.18)");
          grad.addColorStop(1, "rgba(0, 242, 254, 0)");
        } else {
          // Vibrant indigo → cyan gradient for light mode (high contrast on white)
          grad.addColorStop(0, "rgba(79, 70, 229, 0.92)");
          grad.addColorStop(0.2, "rgba(99, 102, 241, 0.78)");
          grad.addColorStop(0.45, "rgba(6, 182, 212, 0.55)");
          grad.addColorStop(0.7, "rgba(56, 189, 248, 0.3)");
          grad.addColorStop(1, "rgba(99, 102, 241, 0)");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(leftPoints[0].x, leftPoints[0].y);

        // Smooth quadratic curves down the left edge
        for (let i = 1; i < leftPoints.length - 1; i++) {
          const xc = (leftPoints[i].x + leftPoints[i + 1].x) / 2;
          const yc = (leftPoints[i].y + leftPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(leftPoints[i].x, leftPoints[i].y, xc, yc);
        }
        ctx.lineTo(tail.x, tail.y);

        // Smooth quadratic curves back up the right edge
        for (let i = rightPoints.length - 1; i > 0; i--) {
          const xc = (rightPoints[i].x + rightPoints[i - 1].x) / 2;
          const yc = (rightPoints[i].y + rightPoints[i - 1].y) / 2;
          ctx.quadraticCurveTo(rightPoints[i].x, rightPoints[i].y, xc, yc);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Atmospheric aura stroke
        ctx.save();
        ctx.shadowBlur = isDarkMode ? 22 : 14;
        ctx.shadowColor = isDarkMode
          ? "rgba(0, 242, 254, 0.8)"
          : "rgba(79, 70, 229, 0.4)";
        ctx.strokeStyle = isDarkMode
          ? "rgba(255, 255, 255, 0.35)"
          : "rgba(79, 70, 229, 0.2)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();

        // Radiant comet nucleus dot at mouse position
        ctx.save();
        const nucleusGlow = isHoveringInteractive ? 22 : 14;
        ctx.shadowBlur = nucleusGlow;
        ctx.shadowColor = isHoveringInteractive
          ? isDarkMode
            ? "rgba(0, 242, 254, 1)"
            : "rgba(79, 70, 229, 0.9)"
          : isDarkMode
          ? "rgba(255, 255, 255, 1)"
          : "rgba(79, 70, 229, 0.6)";

        // Nucleus fill with radial gradient for depth
        const nucleusSize = isHoveringInteractive ? 5 : 3.5;
        const nucleusGrad = ctx.createRadialGradient(
          head.x, head.y, 0,
          head.x, head.y, nucleusSize
        );
        if (isDarkMode) {
          nucleusGrad.addColorStop(0, "#FFFFFF");
          nucleusGrad.addColorStop(0.6, "rgba(224, 242, 254, 0.95)");
          nucleusGrad.addColorStop(1, "rgba(103, 232, 249, 0.7)");
        } else {
          nucleusGrad.addColorStop(0, "#4F46E5");
          nucleusGrad.addColorStop(0.5, "#6366F1");
          nucleusGrad.addColorStop(1, "rgba(99, 102, 241, 0.6)");
        }
        ctx.fillStyle = nucleusGrad;
        ctx.beginPath();
        ctx.arc(head.x, head.y, nucleusSize, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing outer aura ring
        const pulsePhase = Math.sin(now * 0.004) * 0.3 + 0.7;
        const ringRadius = isHoveringInteractive ? 8 : 6;
        ctx.strokeStyle = isDarkMode
          ? `rgba(0, 242, 254, ${0.7 * pulsePhase})`
          : `rgba(79, 70, 229, ${0.55 * pulsePhase})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(head.x, head.y, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Second faint outer ring for interactive hover
        if (isHoveringInteractive) {
          ctx.strokeStyle = isDarkMode
            ? `rgba(0, 242, 254, ${0.3 * pulsePhase})`
            : `rgba(99, 102, 241, ${0.25 * pulsePhase})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      } else if (mouseX > 0 && mouseY > 0) {
        // Stationary resting comet star
        ctx.save();
        const pulsePhase = Math.sin(now * 0.003) * 0.25 + 0.75;
        ctx.shadowBlur = isDarkMode ? 16 : 10;
        ctx.shadowColor = isDarkMode
          ? "rgba(0, 242, 254, 0.9)"
          : "rgba(79, 70, 229, 0.5)";
        ctx.fillStyle = isDarkMode ? "#FFFFFF" : "#4F46E5";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = isDarkMode
          ? `rgba(0, 242, 254, ${0.65 * pulsePhase})`
          : `rgba(79, 70, 229, ${0.5 * pulsePhase})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full select-none"
      aria-hidden="true"
    />
  );
}
