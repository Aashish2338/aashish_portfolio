"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, personal } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getResumeDownloadName } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [downloadName, setDownloadName] = useState("Aashish_Vishavkarma.pdf");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDownloadName(getResumeDownloadName());
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`container flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled ? "glass-card" : "bg-transparent"
        }`}
      >
        <a href="#home" className="font-display text-lg font-semibold">
          AV<span className="text-cyan-700 dark:text-android">.</span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-android-dark dark:text-paper/70 dark:hover:text-android"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href={personal.resumeUrl}
            download={downloadName}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Download size={14} /> CV
          </a>
          <a href="#contact" className={buttonVariants({ size: "sm" })}>
            Hire me
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 dark:border-white/10"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="container mt-2"
        >
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="glass-card flex flex-col gap-1 p-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-android/10 hover:text-android-dark dark:text-paper/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={buttonVariants({ className: "mt-2 w-full" })}
            >
              Hire me
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
