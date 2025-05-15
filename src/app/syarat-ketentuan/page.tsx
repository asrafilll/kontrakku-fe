import { Footer, Navigation } from "@/components/landing-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat dan Ketentuan | Kontrakku",
  description:
    "Syarat dan ketentuan penggunaan platform Kontrakku untuk analisis kontrak kerja.",
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <Navigation />
      <main className="py-64 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Syarat dan Ketentuan
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
                Penerimaan Syarat dan Ketentuan
              </h2>
              <p className="text-gray-700">
                Dengan mengakses dan menggunakan platform Kontrakku, Anda
                menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika
                Anda tidak setuju dengan bagian apapun dari syarat ini, Anda
                tidak diperkenankan menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Definisi
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Platform:</strong> Merujuk pada website dan layanan
                  Kontrakku
                </li>
                <li>
                  <strong>Pengguna:</strong> Individu atau entitas yang
                  menggunakan platform
                </li>
                <li>
                  <strong>Layanan:</strong> Fitur analisis kontrak dan layanan
                  terkait
                </li>
                <li>
                  <strong>Konten:</strong> Materi yang diunggah atau dibagikan
                  di platform
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Penggunaan Layanan
              </h2>
              <p className="text-gray-700 mb-4">Anda setuju untuk:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Memberikan informasi yang akurat dan lengkap saat mendaftar
                </li>
                <li>Menjaga kerahasiaan kredensial akun Anda</li>
                <li>Tidak menyalahgunakan atau memanipulasi platform</li>
                <li>Tidak melanggar hak kekayaan intelektual pihak lain</li>
                <li>Menggunakan layanan sesuai dengan hukum yang berlaku</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Batasan Penggunaan
              </h2>
              <p className="text-gray-700">Anda tidak diperkenankan untuk:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Menggunakan platform untuk tujuan ilegal</li>
                <li>
                  Mengunggah konten yang melanggar hukum atau tidak pantas
                </li>
                <li>Mencoba mengakses area terlarang dari platform</li>
                <li>Menyebarkan malware atau kode berbahaya</li>
                <li>Melakukan tindakan yang dapat membahayakan platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Hak Kekayaan Intelektual
              </h2>
              <p className="text-gray-700">
                Seluruh konten, fitur, dan fungsionalitas platform Kontrakku
                dilindungi oleh hak cipta, merek dagang, dan hukum kekayaan
                intelektual lainnya. Pengguna tidak diperkenankan menyalin,
                memodifikasi, atau mendistribusikan konten platform tanpa izin
                tertulis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Pembatasan Tanggung Jawab
              </h2>
              <p className="text-gray-700">
                Kontrakku menyediakan platform &ldquo;sebagaimana adanya&rdquo;
                tanpa jaminan apapun. Kami tidak bertanggung jawab atas kerugian
                langsung, tidak langsung, atau konsekuensial yang timbul dari
                penggunaan platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Penghentian Layanan
              </h2>
              <p className="text-gray-700">
                Kami berhak untuk menghentikan atau menangguhkan akses Anda ke
                platform, dengan atau tanpa pemberitahuan, untuk pelanggaran
                syarat dan ketentuan ini atau alasan lain yang kami anggap
                perlu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Perubahan Syarat dan Ketentuan
              </h2>
              <p className="text-gray-700">
                Kami dapat mengubah syarat dan ketentuan ini sewaktu-waktu.
                Perubahan akan efektif setelah diposting di platform. Penggunaan
                berkelanjutan atas layanan kami setelah perubahan tersebut
                merupakan persetujuan Anda terhadap syarat yang diperbarui.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Hukum yang Berlaku
              </h2>
              <p className="text-gray-700">
                Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia.
                Setiap perselisihan yang timbul akan diselesaikan melalui forum
                yang berwenang di Indonesia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Hubungi Kami
              </h2>
              <p className="text-gray-700">
                Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini,
                silakan hubungi kami melalui email di{" "}
                <a
                  href="mailto:legal@kontrakku.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  legal@kontrakku.com
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
