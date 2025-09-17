import AboutSection from "./_components/AboutSection";
import ContactSection from "./_components/ContactSection";
import FeaturesSection from "./_components/FeaturesSection";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 items-center p-3 pb-8 px-4">
      <AboutSection />
      <ContactSection />
      <FeaturesSection />
    </div>
  );
}
