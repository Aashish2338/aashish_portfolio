"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { aboutHighlights, personal, stats } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-3xl font-semibold text-android-dark dark:text-android">
      {count}
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
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-android/10 blur-2xl" />
          <div className="glass-card flex aspect-[4/5] items-center justify-center rounded-[2rem] border-2 border-android/30 bg-gradient-to-br from-ink-slate to-ink">
            <span className="font-display text-5xl font-semibold text-android">
              AV
            </span>
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
            Building Android products people rely on
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
