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
          className="relative overflow-hidden rounded-[2rem] border border-android/30 bg-gradient-to-br from-ink-slate to-ink px-8 py-16 text-center sm:px-16"
        >
          <div className="bg-glow-radial absolute left-1/2 top-0 h-full w-full -translate-x-1/2" />
          <div className="relative">
            <Rocket className="mx-auto text-android" size={32} />
            <h2 className="mt-4 font-display text-3xl font-semibold text-paper sm:text-4xl">
              Let&apos;s build amazing Android apps together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/70">
              Whether it&apos;s a new product, a Compose migration, or scaling
              an existing app &mdash; I&apos;m ready when you are.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact">
                <Button size="lg">Hire me</Button>
              </a>
              <a href="#contact">
                <Button variant="outline" size="lg" className="border-paper/20 text-paper hover:border-android hover:text-android">
                  <Calendar size={16} /> Schedule meeting
                </Button>
              </a>
              <a href={`mailto:${personal.email}`}>
                <Button variant="ghost" size="lg" className="text-paper hover:text-android">
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
