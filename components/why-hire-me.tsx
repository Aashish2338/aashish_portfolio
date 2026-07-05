"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { whyHireMe } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function WhyHireMe() {
  return (
    <section className="relative py-28">
      <div className="container">
        <div className="glass-card overflow-hidden p-10 sm:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="section-eyebrow">Why hire me</p>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                A senior engineer who ships and stays maintainable
              </h2>
              <p className="mt-4 text-ink/70 dark:text-paper/70">
                Five years of production Android work, distilled into a
                straightforward promise: clean architecture, real scale, and
                code your next engineer will thank you for.
              </p>
              <a href="#contact" className="mt-8 inline-block">
                <Button size="lg">Hire me</Button>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {whyHireMe.map((reason, i) => (
                <motion.div
                  key={reason}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-2.5 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 dark:border-white/10 dark:bg-white/5"
                >
                  <Check size={16} className="shrink-0 text-android-dark dark:text-android" />
                  <span className="text-sm font-medium">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
