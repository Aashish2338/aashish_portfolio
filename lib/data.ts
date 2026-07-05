export const personal = {
  name: "Aashish Vishavkarma",
  role: "Senior Android Developer",
  taglineRoles: [
    "Android Developer",
    "Jetpack Compose Expert",
    "Kotlin Multiplatform Developer",
    "Mobile Architect",
    "Compose UI Specialist",
  ],
  // TODO: replace with real contact details before deploying
  email: "aashish2338@gmail.com",
  phone: "+91 98385 69932",
  location: "Noida U.P., India",
  github: "https://github.com/Aashish2338",
  linkedin: "https://www.linkedin.com/in/aashish-vishavkarma-128650177/",
  resumeUrl: "/resume.pdf",
  summary:
    "Senior Android Developer with 5+ years building production-grade mobile experiences using Kotlin, Java, and Jetpack Compose. Specializes in Kotlin Multiplatform, clean MVVM architecture, and scalable apps consumed by hundreds of thousands of users, backed by strong CI/CD and testing practices.",
};

export const stats = [
  { label: "Years experience", value: 5, suffix: "+" },
  { label: "Projects shipped", value: 10, suffix: "+" },
  { label: "Downloads", value: 100, suffix: "K+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

export const aboutHighlights = [
  "Kotlin & Java",
  "Jetpack Compose",
  "Kotlin Multiplatform (KMP)",
  "MVVM & Clean Architecture",
  "Coroutines & Flow",
  "Ktor & Retrofit",
  "Room Database",
  "Firebase",
  "CI/CD pipelines",
  "Material Design",
  "Google Maps SDK",
  "Payment gateway integration",
  "REST API integration",
];

export type SkillCategory = {
  title: string;
  level: number;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  { title: "Programming", level: 95, items: ["Kotlin", "Java", "Spring-Boot", "Hibernate", "JPA"] },
  {
    title: "Android",
    level: 96,
    items: ["Jetpack Compose", "XML", "Android SDK", "Material Design 3"],
  },
  {
    title: "Architecture",
    level: 92,
    items: ["MVVM", "Clean Architecture", "MVP", "MVC"],
  },
  {
    title: "Libraries",
    level: 90,
    items: ["Coroutines", "Flow", "Retrofit", "Ktor", "Room", "Navigation", "Paging"],
  },
  {
    title: "Dependency Injection",
    level: 85,
    items: ["Hilt", "Dagger", "Koin"],
  },
  {
    title: "Firebase",
    level: 88,
    items: ["Analytics", "Crashlytics", "Push Notification"],
  },
  {
    title: "Tools",
    level: 90,
    items: ["Git", "GitHub", "Bitbucket", "Jira", "CI/CD"],
  },
  {
    title: "Databases",
    level: 87,
    items: ["SQLite", "Room", "MySQL"],
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "Sri Aurobindo Society",
    role: "Senior Android Developer",
    period: "Sept 2024 – Present",
    current: true,
  },
  {
    company: "Aforeserve Technologies",
    role: "Senior Android Developer",
    period: "April 2021 – Sept 2024",
  },
  {
    company: "Sagar Informatics",
    role: "Android Developer",
    period: "Sept 2020 – March 2021",
  },
  {
    company: "Xcrino Business Solutions",
    role: "Android Developer",
    period: "June 2019 – Aug 2020",
  },
];

export type ProjectCategory = "Education" | "Logistics" | "Enterprise" | "Finance";

export type Project = {
  name: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: "AuroScholar",
    category: "Education",
    description:
      "A learning companion app built for structured, scalable access to educational content with a focus on smooth navigation and offline-friendly design.",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "Room", "Firebase"],
  },
  {
    name: "Project Inclusion",
    category: "Education",
    description:
      "An accessibility-first Android application designed to widen access to learning resources for diverse user groups.",
    tech: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Retrofit"],
  },
  {
    name: "SNC Rider",
    category: "Logistics",
    description:
      "Rider-facing logistics app handling real-time delivery assignments, route tracking, and status updates at scale.",
    tech: ["Kotlin", "Google Maps SDK", "Coroutines", "Firebase"],
  },
  {
    name: "SNC Partner",
    category: "Logistics",
    description:
      "Partner-facing counterpart to SNC Rider, built for fleet and delivery-partner management with live tracking.",
    tech: ["Kotlin", "MVVM", "Retrofit", "Room"],
  },
  {
    name: "Courier Mitra",
    category: "Logistics",
    description:
      "A courier management application streamlining pickup, delivery, and dispatch workflows for logistics teams.",
    tech: ["Kotlin", "Ktor", "Hilt", "Navigation"],
  },
  {
    name: "AUM Express",
    category: "Enterprise",
    description:
      "An enterprise-grade express delivery platform built for reliability and scale across a large user base.",
    tech: ["Kotlin", "Jetpack Compose", "CI/CD", "Payment Gateway"],
  },
];

export const projectFilters: ("All" | ProjectCategory)[] = [
  "All",
  "Education",
  "Logistics",
  "Enterprise",
  "Finance",
];

export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Android app development",
    description:
      "End-to-end native Android apps built on Kotlin and modern Android SDK best practices.",
  },
  {
    title: "Jetpack Compose migration",
    description:
      "Migrating legacy XML-based UI codebases to declarative, maintainable Jetpack Compose.",
  },
  {
    title: "Kotlin Multiplatform",
    description:
      "Sharing business logic across Android and iOS with KMP without compromising native feel.",
  },
  {
    title: "Android architecture",
    description:
      "Designing clean, scalable MVVM and Clean Architecture foundations built to last.",
  },
  {
    title: "Code review",
    description:
      "Thorough, constructive code reviews focused on maintainability, performance, and standards.",
  },
  {
    title: "Performance optimization",
    description:
      "Profiling and optimizing app startup time, memory usage, and rendering performance.",
  },
  {
    title: "Consultation",
    description:
      "Technical consulting for teams planning or scaling an Android product.",
  },
  {
    title: "Mentorship",
    description:
      "1:1 and team mentorship for developers growing into Android architecture and Compose.",
  },
];

export const whyHireMe = [
  "5+ years experience",
  "Clean architecture",
  "Production apps",
  "Compose expert",
  "Kotlin Multiplatform",
  "Scalable apps",
  "API integration",
  "Enterprise experience",
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  group: "Client" | "Manager" | "Team";
};

// TODO: replace with real, permissioned testimonials before deploying
export const testimonials: Testimonial[] = [
  {
    quote:
      "Delivered a complex Compose migration ahead of schedule without a single regression in production.",
    name: "Placeholder reviewer",
    title: "Product manager",
    group: "Manager",
  },
  {
    quote:
      "One of the most reliable Android engineers I've worked with — architecture decisions always held up as the app scaled.",
    name: "Placeholder reviewer",
    title: "Engineering lead",
    group: "Team",
  },
  {
    quote:
      "Understood our business needs quickly and translated them into a clean, performant mobile experience.",
    name: "Placeholder reviewer",
    title: "Client",
    group: "Client",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
