import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { personal } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://aashishvishavkarma.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — Senior Software Developer`,
    template: `%s — ${personal.name}`,
  },
  description: personal.summary,
  keywords: [
    "Aashish Vishavkarma",
    "Android Developer",
    "Kotlin Developer",
    "Jetpack Compose",
    "Kotlin Multiplatform",
    "Mobile Architect",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${personal.name} — Senior Software Developer`,
    description: personal.summary,
    siteName: personal.name,
    images: [
      {
        url: "/social-preview.png",
        alt: `${personal.name} — Senior Software Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Senior Software Developer`,
    description: personal.summary,
    images: ["/social-preview.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.role,
  description: personal.summary,
  url: siteUrl,
  sameAs: [personal.github, personal.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
