import { Metadata } from "next";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Dashboard | Kontrakku",
  description: "Kelola dan analisis kontrak kerja Anda",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Welcome Message */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Selamat datang di Kontrakku 👋
            </h1>
            <p className="text-gray-600 mb-6">
              Saya akan membantu Anda menganalisis kontrak kerja. Silakan unggah
              file kontrak dalam format PDF untuk memulai.
            </p>
            <div className="flex items-center gap-4">
              <Button className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Unggah Kontrak
              </Button>
              <p className="text-sm text-gray-500">Maksimal 10MB, format PDF</p>
            </div>
          </div>
        </div>

        {/* Example Analysis (Hidden initially) */}
        <div className="hidden">
          {/* System Message */}
          <div className="max-w-3xl mx-auto bg-blue-50 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">K</span>
              </div>
              <div>
                <p className="text-gray-900 mb-2">
                  Saya telah menganalisis kontrak Anda. Berikut adalah temuan
                  utama:
                </p>
                <ul className="list-disc pl-4 space-y-2 text-gray-700">
                  <li>
                    Durasi kontrak: 1 tahun (1 Januari 2024 - 31 Desember 2024)
                  </li>
                  <li>Gaji pokok: Rp 5.000.000 per bulan</li>
                  <li>Tunjangan: Transport dan Kesehatan</li>
                  <li>Jam kerja: 40 jam per minggu</li>
                </ul>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Lihat Analisis Lengkap
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg p-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">U</span>
              </div>
              <div>
                <p className="text-gray-900">
                  Apakah ada klausul tentang lembur dalam kontrak ini?
                </p>
              </div>
            </div>
          </div>

          {/* System Response */}
          <div className="max-w-3xl mx-auto bg-blue-50 rounded-lg p-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">K</span>
              </div>
              <div>
                <p className="text-gray-900">
                  Ya, kontrak ini memuat ketentuan lembur pada Pasal 5.
                  Disebutkan bahwa:
                </p>
                <blockquote className="border-l-4 border-blue-200 pl-4 mt-2 text-gray-700">
                  &ldquo;Lembur dibayarkan sesuai dengan ketentuan yang berlaku,
                  yaitu: 1.5x upah per jam untuk jam kerja tambahan pertama, 2x
                  upah per jam untuk jam kerja tambahan berikutnya.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Ketik pertanyaan tentang kontrak Anda..."
              className="w-full px-4 py-2 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button size="sm" disabled>
                Kirim
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Unggah kontrak terlebih dahulu untuk mulai bertanya
          </p>
        </div>
      </div>
    </div>
  );
}
