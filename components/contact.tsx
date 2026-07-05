"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { personal } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const infoItems = [
  { icon: Mail, label: personal.email, href: `mailto:${personal.email}` },
  { icon: Phone, label: personal.phone, href: `tel:${personal.phone}` },
  { icon: MapPin, label: personal.location, href: undefined },
  { icon: Github, label: "GitHub", href: personal.github },
  { icon: Linkedin, label: "LinkedIn", href: personal.linkedin },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      // Replace with your EmailJS service ID, template ID, and public key.
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, { ...data }, publicKey);
      }

      setSent(true);
      reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Contact</p>
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Let&apos;s talk about your app
          </h2>
          <p className="mt-4 text-ink/70 dark:text-paper/70">
            Have a project, a role, or just a question? Reach out directly or
            use the form.
          </p>

          <div className="mt-8 space-y-3">
            {infoItems.map(({ icon: Icon, label, href }) => {
              const content = (
                <div className="glass-card flex items-center gap-3 px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-android/15 text-android-dark dark:text-android">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm font-medium text-ink/80 dark:text-paper/80">
                    {label}
                  </span>
                </div>
              );
              return href ? (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-card relative overflow-hidden p-8"
        >
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-paper/95 dark:bg-ink/95"
              >
                <motion.div
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <CheckCircle2 size={48} className="text-android" />
                </motion.div>
                <p className="font-display text-lg font-semibold">
                  Message sent
                </p>
                <p className="text-sm text-ink/60 dark:text-paper/60">
                  Thanks for reaching out &mdash; back to you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input
                  placeholder="Your name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">Enter your name.</p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">Enter a valid email.</p>
                )}
              </div>
            </div>

            <div>
              <Input
                placeholder="Subject"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-500">Add a subject.</p>
              )}
            </div>

            <div>
              <Textarea
                rows={5}
                placeholder="Tell me about your project"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">Write a message.</p>
              )}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              <Send size={16} /> {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
