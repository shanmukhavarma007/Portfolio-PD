import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StatusStrip } from "@/components/StatusStrip";
import { EngineeringProfile } from "@/components/EngineeringProfile";
import { PDFlow } from "@/components/PDFlow";
import { TechnicalMatrix } from "@/components/TechnicalMatrix";
import { Projects } from "@/components/Projects";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { LearningJourney } from "@/components/LearningJourney";
import { LinkedInFeed } from "@/components/LinkedInFeed";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatusStrip />
        <EngineeringProfile />
        <PDFlow />
        <TechnicalMatrix />
        <Projects />
        <CurrentlyBuilding />
        <LearningJourney />
        <LinkedInFeed />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}