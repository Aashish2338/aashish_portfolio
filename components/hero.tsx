"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/lib/data";
import { Button } from "@/components/ui/button";

const floatingChips = [
  { label: "Android", className: "left-[6%] top-[22%]", delay: 0 },
  { label: "Kotlin", className: "right-[8%] top-[18%]", delay: 0.6 },
  { label: "Jetpack Compose", className: "left-[10%] bottom-[26%]", delay: 1.2 },
  { label: "Firebase", className: "right-[6%] bottom-[30%]", delay: 1.8 },
  { label: "KMP", className: "left-[22%] top-[8%]", delay: 2.4 },
  { label: "Material Icons", className: "right-[20%] bottom-[10%]", delay: 3 },
];

function useTypingEffect(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTypingEffect(personal.taglineRoles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <div className="bg-glow-radial absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" />

      {floatingChips.map((chip) => (
        <motion.span
          key={chip.label}
          className={`glass-card absolute hidden select-none px-3 py-1.5 text-xs font-medium text-ink/70 dark:text-paper/70 md:block ${chip.className}`}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: chip.delay,
            ease: "easeInOut",
          }}
        >
          {chip.label}
        </motion.span>
      ))}

      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-eyebrow"
          >
            Available for hire
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m
            <br />
            <span className="text-gradient">{personal.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-ink/70 dark:text-paper/70"
          >
            {personal.role}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-3 h-8 font-mono text-base text-android-dark dark:text-android"
          >
            {typed}
            <span className="animate-pulse">|</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#contact">
              <Button size="lg">Hire me</Button>
            </a>
            <a href={personal.resumeUrl} download>
              <Button variant="outline" size="lg">
                <Download size={16} /> Download resume
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex items-center gap-4"
          >
            {[
              { icon: Github, href: personal.github, label: "GitHub" },
              { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-android hover:text-android-dark dark:border-white/10 dark:text-paper/70 dark:hover:text-android"
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          <div className="absolute inset-0 animate-glow rounded-full bg-android/20 blur-3xl" />
          <div className="glass-card relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-android/40">
            <div className="flex h-[92%] w-[92%] items-center justify-center rounded-full bg-gradient-to-br from-ink-slate to-ink text-6xl font-display font-semibold text-android">
              AV
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
