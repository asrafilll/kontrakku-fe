import { Footer, Navigation } from "@/components/landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami | Kontrakku",
  description:
    "Pelajari lebih lanjut tentang misi dan visi Kontrakku dalam membantu pekerja Indonesia memahami kontrak kerja mereka.",
};

export default function TentangKamiPage() {
  return (
    <>
      <Navigation />
      <main className="py-64 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tentang Kontrakku
          </h1>

          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Kontrakku adalah platform analisis kontrak kerja yang dirancang
              khusus untuk pekerja Indonesia. Kami berkomitmen untuk membantu
              pekerja memahami hak-hak mereka dan memastikan kontrak kerja yang
              adil dan transparan.
            </p>

            <p className="text-lg text-gray-700 mb-6">
              Misi kami adalah menyederhanakan proses pemahaman kontrak kerja
              dengan menggunakan teknologi terkini. Kami percaya bahwa setiap
              pekerja berhak memahami sepenuhnya ketentuan kontrak mereka
              sebelum menandatanganinya.
            </p>

            <p className="text-lg text-gray-700">
              Dengan kombinasi teknologi AI dan pengetahuan hukum
              ketenagakerjaan Indonesia, kami menyediakan alat yang memudahkan
              pekerja untuk menganalisis, memahami, dan membuat keputusan yang
              tepat tentang kontrak kerja mereka.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
