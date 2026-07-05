import { Github, Linkedin, Mail } from "lucide-react";
import { navLinks, personal } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-ink/10 py-12 dark:border-white/10">
      <div className="container flex flex-col items-center gap-6 text-center">
        <a href="#home" className="font-display text-lg font-semibold">
          AV<span className="text-android">.</span>
        </a>

        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/60 hover:text-android-dark dark:text-paper/60 dark:hover:text-android"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/60 hover:border-android hover:text-android-dark dark:border-white/10 dark:text-paper/60"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <p className="text-xs text-ink/50 dark:text-paper/50">
          &copy; {new Date().getFullYear()} {personal.name}. Made with{" "}
          <span className="text-android">&hearts;</span> using Next.js.
        </p>
      </div>
    </footer>
  );
}
