"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mx-auto">Skills</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            A full-stack Android toolkit
          </h2>
          <p className="mt-4 text-ink/70 dark:text-paper/70">
            From language fundamentals to architecture, tooling, and cloud
            services &mdash; the stack behind every shipped release.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card group p-6 transition-shadow hover:shadow-[0_0_32px_rgba(61,220,132,0.18)]"
            >
              <h3 className="font-display text-base font-semibold">
                {cat.title}
              </h3>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cat.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-android to-android-light"
                />
              </div>

              <ul className="mt-4 space-y-1.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-ink/65 dark:text-paper/65"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
