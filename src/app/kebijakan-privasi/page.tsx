import { Footer, Navigation } from "@/components/landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Kontrakku",
  description:
    "Kebijakan privasi dan penanganan data pengguna di platform Kontrakku.",
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Navigation />
      <main className="py-64 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Kebijakan Privasi
          </h1>

          <div className="prose prose-blue max-w-none space-y-8">
            <p className="text-gray-600">
              Terakhir diperbarui:{" "}
              {new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Pendahuluan
              </h2>
              <p className="text-gray-700">
                Kontrakku berkomitmen untuk melindungi privasi Anda. Kebijakan
                privasi ini menjelaskan bagaimana kami mengumpulkan,
                menggunakan, dan melindungi informasi pribadi Anda saat
                menggunakan platform kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-gray-700 mb-4">
                Kami mengumpulkan informasi berikut saat Anda menggunakan
                Kontrakku:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Informasi akun (nama, email, nomor telepon)</li>
                <li>Dokumen kontrak yang Anda unggah</li>
                <li>Data penggunaan platform</li>
                <li>Informasi perangkat dan browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Penggunaan Informasi
              </h2>
              <p className="text-gray-700 mb-4">
                Kami menggunakan informasi yang dikumpulkan untuk:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Menyediakan layanan analisis kontrak</li>
                <li>Meningkatkan platform dan layanan kami</li>
                <li>Berkomunikasi dengan Anda tentang layanan kami</li>
                <li>Mengirim pembaruan dan informasi penting</li>
                <li>Menjaga keamanan platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Keamanan Data
              </h2>
              <p className="text-gray-700">
                Kami menerapkan langkah-langkah keamanan yang ketat untuk
                melindungi informasi Anda, termasuk enkripsi data, akses
                terbatas, dan pemantauan keamanan berkelanjutan. Dokumen kontrak
                yang Anda unggah disimpan dengan enkripsi end-to-end.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Berbagi Informasi
              </h2>
              <p className="text-gray-700">
                Kami tidak akan menjual, menyewakan, atau membagikan informasi
                pribadi Anda kepada pihak ketiga tanpa izin Anda, kecuali jika
                diwajibkan oleh hukum atau diperlukan untuk menyediakan layanan
                kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Hak Pengguna
              </h2>
              <p className="text-gray-700 mb-4">Anda memiliki hak untuk:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Mengakses informasi pribadi Anda</li>
                <li>Memperbarui atau mengoreksi informasi Anda</li>
                <li>Meminta penghapusan data Anda</li>
                <li>Menolak penggunaan data untuk tujuan tertentu</li>
                <li>
                  Menerima salinan data Anda dalam format yang dapat dibaca
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Perubahan Kebijakan
              </h2>
              <p className="text-gray-700">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke
                waktu. Perubahan signifikan akan diberitahukan melalui email
                atau pemberitahuan di platform kami. Penggunaan berkelanjutan
                atas layanan kami setelah perubahan tersebut merupakan
                persetujuan Anda terhadap kebijakan yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Hubungi Kami
              </h2>
              <p className="text-gray-700">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau
                penanganan data Anda, silakan hubungi kami melalui email di{" "}
                <a
                  href="mailto:privacy@kontrakku.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  privacy@kontrakku.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
