"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mx-auto">Testimonials</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            What people say
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-2xl">
          <div className="glass-card min-h-[220px] p-10 text-center">
            <Quote className="mx-auto text-android/50" size={28} />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <p className="text-lg leading-relaxed text-ink/80 dark:text-paper/80">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <p className="mt-5 font-display text-sm font-semibold">
                  {current.name}
                </p>
                <p className="text-xs text-ink/55 dark:text-paper/55">
                  {current.title} &middot; {current.group} review
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            aria-label="Previous testimonial"
            onClick={() =>
              setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
            }
            className="focus-ring absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink/60 dark:border-white/10 dark:bg-ink dark:text-paper/60"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="focus-ring absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink/60 dark:border-white/10 dark:bg-ink dark:text-paper/60"
          >
            <ChevronRight size={16} />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-android" : "w-1.5 bg-ink/20 dark:bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
