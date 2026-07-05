import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { WhyHireMe } from "@/components/why-hire-me";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { HireMeCta } from "@/components/hire-me-cta";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { LoadingScreen } from "@/components/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <WhyHireMe />
        <Testimonials />
        <Contact />
        <HireMeCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
