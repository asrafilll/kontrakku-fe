import {
  Navigation,
  Hero,
  Features,
  HowItWorks,
  CTA,
  Footer,
} from "@/components/landing-page";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
