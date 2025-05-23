import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "./common";

export const Hero = () => {
  return (
    <Section className="pt-24 md:pt-32 pb-16 md:pb-24 text-center bg-white">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold !leading-tight text-gray-900 mb-6">
        Pahami Kontrak <span className="text-blue-600">Kerja & Freelance</span>
        <br />
        Anda Tanpa Ribet.
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
        Kontrakku menerjemahkan bahasa hukum yang rumit menjadi ringkasan yang
        jelas, mengidentifikasi risiko, dan membantu Anda bertanya dengan tepat.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/register">
          <Button
            size="lg"
            className="w-full sm:w-auto group bg-blue-600 text-white hover:bg-blue-700"
          >
            Mulai Analisis Gratis{" "}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href="#cara-kerja">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600"
          >
            Lihat Cara Kerja
          </Button>
        </Link>
      </div>
      {/* Optional: Placeholder for a subtle background graphic or a product screenshot teaser */}
      <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
        <div className="aspect-video bg-gray-100 rounded-xl shadow-2xl flex items-center justify-center">
          <FileText size={64} className="text-blue-400" />
          <p className="ml-4 text-blue-600">
            Visualisasi Proses Analisis Kontrak
          </p>
        </div>
      </div>
    </Section>
  );
};
