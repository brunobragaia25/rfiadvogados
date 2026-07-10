import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import PracticeAreas from "@/components/PracticeAreas";
import Differentials from "@/components/Differentials";
import Team from "@/components/Team";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <WhyUsSection />
        <PracticeAreas />
        <Differentials />
        <Team />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
