import { Footer, Navigation } from "@/components/landing-page";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak | Kontrakku",
  description:
    "Hubungi tim Kontrakku untuk pertanyaan, dukungan, atau kerjasama.",
};

export default function KontakPage() {
  return (
    <>
      <Navigation />
      <main className="py-64 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Hubungi Kami
          </h1>

          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Kami siap membantu Anda dengan pertanyaan seputar Kontrakku.
              <br />
              Silakan hubungi kami melalui salah satu kontak di bawah ini.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:info@kontrakku.com"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    belumadaemail@kontrakku.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Telepon</p>
                  <a
                    href="tel:+6281234567890"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Negara +62
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Alamat</p>
                  <p className="text-gray-600">
                    mau tau aja apa mau tau banget dot com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
