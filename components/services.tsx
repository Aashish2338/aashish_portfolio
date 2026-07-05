"use client";

import { motion } from "framer-motion";
import {
  Code2,
  GitPullRequestArrow,
  Layers,
  Rocket,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { services } from "@/lib/data";

const icons = [Rocket, Layers, Sparkles, Wrench, GitPullRequestArrow, Zap, Code2, Users];

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mx-auto">Services</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            How I can help
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-android/15 text-android-dark dark:text-android">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-ink/65 dark:text-paper/65">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
