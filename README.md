# Aashish Vishavkarma — portfolio

Animated personal portfolio built with Next.js 15, React 19, TypeScript,
Tailwind CSS, and Framer Motion. The project is configured for a static export
so it can be deployed to Hostinger shared hosting.

## Before deploying

1. Verify the email, phone number, location, and social links in `lib/data.ts`.
2. Replace `public/resume.pdf` if the published CV needs updating.
3. Add only real testimonials that you have permission to publish to
   `lib/data.ts`. The testimonials section stays hidden until at least one is
   provided.
4. Add project `githubUrl` and `demoUrl` values in `lib/data.ts` when those
   destinations are public. Missing destinations are not shown as dead links.
5. The configured domain is `aashishvishavkarma.com`, matching `CNAME`.
   Update `lib/site.ts` and `CNAME` together if the domain changes.
6. Configure EmailJS as described below. Its public key and `NEXT_PUBLIC_*`
   settings are included in browser code by design; never put private service
   credentials in these variables.

## Contact form (EmailJS)

1. Create an EmailJS service and template with `name`, `email`, `subject`, and
   `message` variables.
2. Copy `.env.example` to `.env.local` and set the service ID, template ID, and
   public key.
3. Restrict allowed origins and enable the provider's available abuse
   protections. This static site validates submissions in the browser; it has
   no server-side API or server-side validation.

When EmailJS is not configured or a send fails, the form displays an error and
provides a direct email address instead of reporting a false success.

## Local development and checks

```bash
npm ci
npm run dev
```

Run the checks and build before deploying:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run start` serves the generated `out/` directory locally and therefore
requires a successful build first. It is a static preview server, not the
Next.js server runtime.

## Hostinger static deployment

1. Run the checks and `npm run build`.
2. Upload the **contents** of `out/` to the domain's document root (commonly
   `public_html`).
3. Keep the existing `CNAME` record aligned with the domain configured in
   `lib/site.ts`.
4. Set the three EmailJS public environment variables in `.env.local` before
   building if the contact form should send messages. Static output contains
   these public values, so do not use secrets.

The Google fonts are fetched by `next/font/google` during the build and emitted
as local assets; visitors do not need to fetch fonts from Google's CDN.

## Implemented features

The repository includes portfolio sections, project filtering, a theme
switcher, resume download, contact form, and cursor/scroll animations. It does
not currently include an AI chatbot, CV builder integration, or backend API.
The blog was not implemented.
