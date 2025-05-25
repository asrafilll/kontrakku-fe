"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Navigation,
  Hero,
  Features,
  HowItWorks,
  CTA,
  Footer,
} from "@/components/landing-page";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");

    if (isLoggedIn === "true" && userEmail === "admin@mail.com") {
      router.push("/dashboard");
    }
  }, [router]);

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
