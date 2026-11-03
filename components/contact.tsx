"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { personal } from "@/lib/data";
import { getEmailJsConfig } from "@/lib/emailjs-config";
import {
  isValidContactEmail,
  isValidContactMessage,
  isValidContactName,
  isValidContactSubject,
} from "@/lib/contact-validation";
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
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    if (!sent) return;

    const timeout = window.setTimeout(() => setSent(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [sent]);

  const onSubmit = async (data: FormValues) => {
    setSubmissionError(null);
    const config = getEmailJsConfig({
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    });

    if (!config) {
      setSubmissionError(
        `The contact form is not configured. Please email me at ${personal.email}.`,
      );
      return;
    }

    try {
      await emailjs.send(
        config.serviceId,
        config.templateId,
        data,
        config.publicKey,
      );
      setSent(true);
      reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSubmissionError(
        `Your message could not be sent. Please try again or email me at ${personal.email}.`,
      );
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
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
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
                  id="contact-name"
                  placeholder="Your name"
                  maxLength={100}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  {...register("name", {
                    required: "Enter your name.",
                    validate: (value) =>
                      isValidContactName(value) ||
                      "Use a name between 1 and 100 characters.",
                  })}
                />
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="name@company.com"
                  maxLength={254}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  {...register("email", {
                    required: "Enter your email address.",
                    validate: (value) =>
                      isValidContactEmail(value) ||
                      "Enter a valid email address (maximum 254 characters).",
                  })}
                />
                <label htmlFor="contact-email" className="sr-only">
                  Email address
                </label>
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Input
                id="contact-subject"
                placeholder="Subject"
                maxLength={150}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "contact-subject-error" : undefined
                }
                {...register("subject", {
                  required: "Add a subject.",
                  validate: (value) =>
                    isValidContactSubject(value) ||
                    "Use a subject between 1 and 150 characters.",
                })}
              />
              <label htmlFor="contact-subject" className="sr-only">
                Subject
              </label>
              {errors.subject && (
                <p id="contact-subject-error" className="mt-1 text-xs text-red-500">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <Textarea
                id="contact-message"
                rows={5}
                maxLength={5000}
                placeholder="Tell me about your project"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                {...register("message", {
                  required: "Write a message.",
                  validate: (value) =>
                    isValidContactMessage(value) ||
                    "Use a message between 1 and 5,000 characters.",
                })}
              />
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              {errors.message && (
                <p id="contact-message-error" className="mt-1 text-xs text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              <Send size={16} /> {isSubmitting ? "Sending..." : "Send message"}
            </Button>
            {submissionError && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                {submissionError}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
