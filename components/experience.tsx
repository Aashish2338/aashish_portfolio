"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mx-auto">Experience</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Where I&apos;ve built
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-android via-ink/15 to-transparent dark:via-white/15" />

          <div className="space-y-12">
            {experience.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-10"
              >
                <span
                  className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 ${
                    item.current
                      ? "border-android bg-android/40"
                      : "border-android/50 bg-paper dark:bg-ink"
                  }`}
                />
                <div className="glass-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="rounded-full bg-android/15 px-3 py-1 text-xs font-medium text-android-dark dark:text-android">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-android-dark dark:text-android">
                    {item.company}
                  </p>
                  <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
                    {item.period}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
