import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "./common";

export const CTA = () => {
  return (
    <Section className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Siap Kendalikan Pemahaman Kontrak Anda?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Jangan biarkan bahasa hukum yang rumit menghalangi Anda. Coba
          Kontrakku sekarang dan rasakan bedanya.
        </p>
        <Link href="/login">
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Daftar & Analisis Gratis Sekarang
          </Button>
        </Link>
      </div>
    </Section>
  );
};
