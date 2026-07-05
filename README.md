# Aashish Vishavkarma — portfolio

Premium, animated personal portfolio built with Next.js 15, React 19,
TypeScript, Tailwind CSS, Framer Motion, and shadcn-style components.

## Before you deploy

A few things are intentionally left as placeholders — fill these in first:

1. **Contact details** — `lib/data.ts` → `personal` object (email, phone,
   location, GitHub, LinkedIn). Search for `TODO`.
2. **Profile photo** — replace the `AV` monogram blocks in
   `components/hero.tsx` and `components/about.tsx` with an actual
   `next/image` of you.
3. **Resume PDF** — replace `public/resume.pdf` (currently a placeholder
   text file) with your real CV.
4. **Testimonials** — `lib/data.ts` → `testimonials` array is placeholder
   copy. Only use real quotes you have permission to publish.
5. **Project links** — Google Play / GitHub / live demo links in
   `components/projects.tsx` are `#` placeholders; wire up real URLs.
6. **Domain** — `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`
   use `https://aashishvishavkarma.dev` as a placeholder domain.

## EmailJS setup (contact form)

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Create an email service and a template with `name`, `email`, `subject`,
   `message` variables.
3. Copy `.env.example` to `.env.local` and fill in your service ID,
   template ID, and public key.

Without these env vars set, the form will still show the success
animation locally but won't actually send mail.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploy

This project is Vercel-ready — push to a Git repo and import it at
[vercel.com/new](https://vercel.com/new). Add the same `NEXT_PUBLIC_EMAILJS_*`
env vars in the Vercel project settings.

## Fonts

Google Fonts (Inter, Poppins) are loaded via `<link>` tags in
`app/layout.tsx` rather than `next/font/google`, so no build-time network
access to Google's font CDN is required in restricted environments. This
works identically once deployed.

## Notes

- Dark mode is the default theme; toggle via the navbar button.
- Respects `prefers-reduced-motion`.
- Blog section was scoped as a placeholder per the brief — not built out
  as a full CMS-backed blog.
