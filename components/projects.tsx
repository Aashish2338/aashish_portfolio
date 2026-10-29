"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Smartphone, Sparkles } from "lucide-react";
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
                  ? "border-cyan-600 bg-cyan-600 text-white shadow-[0_2px_10px_rgba(8,145,178,0.25)] dark:border-cyan-400 dark:bg-cyan-400 dark:text-[#030712] dark:shadow-[0_0_15px_rgba(0,242,254,0.4)]"
                  : "border-slate-300 text-slate-600 hover:border-cyan-500 hover:text-cyan-700 dark:border-white/10 dark:text-paper/60 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-card mx-auto mt-12 flex max-w-md flex-col items-center justify-center p-10 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-android/15 text-android-dark dark:text-android">
              <Sparkles size={24} />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">
              No projects found in {filter}
            </h3>
            <p className="mt-2 text-sm text-ink/65 dark:text-paper/65">
              Projects in this category are currently in active development or under NDA. Check back soon for new case studies!
            </p>
            <button
              onClick={() => setFilter("All")}
              className="focus-ring mt-5 rounded-full border border-cyan-600 bg-cyan-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-cyan-700 dark:border-android dark:bg-android dark:text-ink dark:hover:bg-android/90"
            >
              View all projects
            </button>
          </motion.div>
        ) : (
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
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-slate-100 via-cyan-50 to-teal-50 dark:from-ink-slate dark:to-ink">
                  {project.iconUrl ? (
                    <a
                      href={project.playStoreUrl ?? "#"}
                      onClick={(e) => !project.playStoreUrl && e.preventDefault()}
                      target={project.playStoreUrl ? "_blank" : undefined}
                      rel={project.playStoreUrl ? "noopener noreferrer" : undefined}
                      aria-label={`${project.name} app icon`}
                      title={project.playStoreUrl ? "Open in Google Play" : project.name}
                      className={cn(
                        "transition-transform duration-300",
                        project.playStoreUrl ? "hover:scale-110" : "cursor-default"
                      )}
                    >
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg sm:h-24 sm:w-24">
                        <img
                          src={project.iconUrl}
                          alt={`${project.name} app icon`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </a>
                  ) : (
                    <Smartphone
                      className="text-android/70 transition-transform duration-300 group-hover:scale-110"
                      size={40}
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {project.status && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                          {project.status}
                        </span>
                      )}
                      <Badge className="shrink-0">{project.category}</Badge>
                    </div>
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

                  <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      {project.playStoreUrl ? (
                        <a
                          href={project.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name} on Google Play`}
                          title="Open in Google Play"
                          className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:border-android hover:text-android-dark dark:border-white/10 dark:text-paper/60"
                        >
                          <Smartphone size={14} />
                        </a>
                      ) : (
                        <span
                          title="Under active development"
                          className="focus-ring flex h-8 w-8 cursor-default items-center justify-center rounded-full border border-dashed border-ink/15 text-ink/40 dark:border-white/15 dark:text-paper/40"
                        >
                          <Smartphone size={14} />
                        </span>
                      )}
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
                    {project.status && (
                      <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                        In development
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
