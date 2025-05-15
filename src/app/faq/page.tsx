import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQSection } from "@/components/faq/FAQSection";
import { MessageSquare } from "lucide-react";
import { Navigation } from "@/components/landing-page";

export const metadata = {
  title: "FAQ | Kontrakku",
  description:
    "Temukan jawaban untuk pertanyaan umum tentang Kontrakku, platform analisis kontrak kerja berbasis AI untuk pekerja Indonesia.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Main Content */}
      <main className="py-16 sm:py-48">
        <div className="container mx-auto px-4">
          <FAQSection />

          {/* Contact Section */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              Masih punya pertanyaan?
            </h3>
            <p className="mt-4 text-gray-600">
              Jangan ragu untuk menghubungi tim dukungan kami yang siap membantu
              24/7
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/kontak">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 inline-flex items-center"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Hubungi Kami
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Kontrakku. Semua Hak Cipta
            Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
