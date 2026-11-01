"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { aboutHighlights, personal, stats } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setHasStarted(true);
    let frameId: number;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeOut * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="inline-block font-display text-3xl font-semibold text-android-dark dark:text-android"
    >
      {hasStarted ? count : value}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-cyan-500/15 blur-2xl pointer-events-none" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-cyan-600/25 bg-[#050A14] shadow-[0_12px_40px_rgba(8,145,178,0.12)] dark:border-cyan-400/35 dark:shadow-[0_0_40px_rgba(0,242,254,0.15)]">
            <Image
              src="/programming-artwork.svg"
              alt="Glowing code editor and 3D cube illustration"
              fill
              sizes="(max-width: 1024px) 80vw, 384px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow">About me</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Building Android, web and backend products people rely on
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70 dark:text-paper/70">
            {personal.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {aboutHighlights.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
