"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone } from "lucide-react";
import { projectFilters, projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mx-auto">Projects</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Selected work
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                filter === f
                  ? "border-android bg-android text-ink"
                  : "border-ink/10 text-ink/60 hover:border-android/50 hover:text-android-dark dark:border-white/10 dark:text-paper/60"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -8 }}
              className="glass-card group flex flex-col overflow-hidden"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-ink-slate to-ink">
                <Smartphone
                  className="text-android/70 transition-transform duration-300 group-hover:scale-110"
                  size={40}
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">
                    {project.name}
                  </h3>
                  <Badge className="shrink-0">{project.category}</Badge>
                </div>

                <p className="mt-2 flex-1 text-sm text-ink/65 dark:text-paper/65">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-ink/5 px-2 py-0.5 text-[11px] text-ink/60 dark:bg-white/5 dark:text-paper/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-4 dark:border-white/10">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label={`${project.name} on Google Play`}
                    className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:border-android hover:text-android-dark dark:border-white/10 dark:text-paper/60"
                  >
                    <Smartphone size={14} />
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label={`${project.name} on GitHub`}
                    className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:border-android hover:text-android-dark dark:border-white/10 dark:text-paper/60"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label={`${project.name} live demo`}
                    className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:border-android hover:text-android-dark dark:border-white/10 dark:text-paper/60"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
