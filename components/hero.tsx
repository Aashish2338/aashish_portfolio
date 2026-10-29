"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { personal } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { getResumeDownloadName } from "@/lib/utils";

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
  const [text, setText] = useState(words[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[index % words.length] ?? "";

    if (isPaused) {
      const pauseDuration = isDeleting ? 400 : 2000;
      const timer = setTimeout(() => {
        setIsPaused(false);
        if (!isDeleting && text === currentWord) {
          setIsDeleting(true);
        } else if (isDeleting && text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    const typingSpeed = isDeleting ? 30 : 65;
    const timer = setTimeout(() => {
      if (isDeleting) {
        const nextText = currentWord.slice(0, text.length - 1);
        setText(nextText);
        if (nextText === "") {
          setIsPaused(true);
        }
      } else {
        const nextText = currentWord.slice(0, text.length + 1);
        setText(nextText);
        if (nextText === currentWord) {
          setIsPaused(true);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, isPaused, index, words]);

  return text;
}

export function Hero() {
  const typed = useTypingEffect(personal.taglineRoles);
  const [downloadName, setDownloadName] = useState("Aashish_Vishavkarma.pdf");

  useEffect(() => {
    setDownloadName(getResumeDownloadName());
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 h-80 w-80 rounded-full bg-teal-400/10 blur-[110px] pointer-events-none" />

      {floatingChips.map((chip) => (
        <motion.span
          key={chip.label}
          className={`absolute hidden select-none items-center gap-1.5 rounded-2xl px-3.5 py-1.5 text-xs font-mono font-medium backdrop-blur-xl transition-all duration-300 md:flex border border-cyan-600/20 bg-white/90 text-slate-700 shadow-[0_4px_16px_rgba(8,145,178,0.08)] dark:border-cyan-500/25 dark:bg-[#060D1A]/85 dark:text-cyan-200/90 dark:shadow-[0_0_18px_rgba(0,242,254,0.12)] ${chip.className}`}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: chip.delay,
            ease: "easeInOut",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-700 dark:bg-cyan-400 animate-pulse" />
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
            className="mt-3 h-8 font-mono text-base text-cyan-700 dark:text-cyan-300 drop-shadow-none dark:drop-shadow-[0_0_8px_rgba(0,242,254,0.4)]"
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
            <a href={personal.resumeUrl} download={downloadName}>
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
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border transition-all border-slate-300 bg-white/80 text-slate-600 hover:border-cyan-600 hover:text-cyan-700 hover:shadow-[0_4px_16px_rgba(8,145,178,0.15)] dark:border-white/10 dark:bg-[#060D1A]/80 dark:text-paper/70 dark:hover:border-cyan-400 dark:hover:text-cyan-300 dark:hover:shadow-[0_0_15px_rgba(0,242,254,0.3)]"
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
          <div className="absolute inset-0 animate-glow rounded-full bg-cyan-400/15 dark:bg-cyan-400/25 blur-3xl pointer-events-none" />
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 backdrop-blur-xl transition-all duration-300 border-cyan-600/30 bg-gradient-to-br from-white via-cyan-50 to-teal-50 shadow-[0_12px_40px_rgba(8,145,178,0.15)] dark:border-cyan-400/50 dark:bg-gradient-to-br dark:from-[#0B1528] dark:via-[#050A14] dark:to-[#020408] dark:shadow-[0_0_60px_rgba(0,242,254,0.25)]">
            <div className="flex h-[92%] w-[92%] items-center justify-center rounded-full text-6xl font-display font-semibold bg-gradient-to-br from-slate-900 via-cyan-800 to-teal-700 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent">
              AV
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
