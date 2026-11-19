import { About } from "@/components/about/about";
import { Architecture } from "@/components/architecture/architecture";
import { Certifications } from "@/components/certifications/certifications";
import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Hero } from "@/components/hero/hero";
import { Highlights } from "@/components/highlights/highlights";
import { Projects } from "@/components/projects/projects";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Highlights />
      <About />
      <Experience />
      <Projects />
      <Architecture />
      <Certifications />
      <Contact />
    </main>
  );
}
