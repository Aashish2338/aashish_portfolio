"use client";

import { motion } from "framer-motion";
import { Calendar, Mail, Rocket } from "lucide-react";
import { personal } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function HireMeCta() {
  return (
    <section className="relative py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border px-8 py-16 text-center sm:px-16 border-cyan-600/25 bg-gradient-to-br from-cyan-50 via-teal-50/60 to-white shadow-[0_16px_50px_rgba(8,145,178,0.1)] dark:border-cyan-400/35 dark:bg-gradient-to-br dark:from-[#0B1528] dark:via-[#050A14] dark:to-[#020408] dark:shadow-[0_0_50px_rgba(0,242,254,0.18)]"
        >
          <div className="bg-glow-radial absolute left-1/2 top-0 h-full w-full -translate-x-1/2 opacity-30 dark:opacity-100" />
          <div className="relative">
            <Rocket className="mx-auto text-cyan-700 dark:text-cyan-400 drop-shadow-none dark:drop-shadow-[0_0_12px_rgba(0,242,254,0.6)]" size={32} />
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl text-slate-900 dark:text-paper">
              Let&apos;s build amazing Android apps together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-paper/70">
              Whether it&apos;s a new product, a Compose migration, or scaling
              an existing app &mdash; I&apos;m ready when you are.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact">
                <Button size="lg">Hire me</Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="border-slate-300 text-slate-800 hover:border-cyan-600 hover:text-cyan-700 dark:border-paper/20 dark:text-paper dark:hover:border-android dark:hover:text-android">
                  <Calendar size={16} /> Schedule meeting
                </Button>
              </a>
              <a href={`mailto:${personal.email}`}>
                <Button variant="ghost" size="lg" className="text-slate-700 hover:text-cyan-700 dark:text-paper dark:hover:text-android">
                  <Mail size={16} /> Email me
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
