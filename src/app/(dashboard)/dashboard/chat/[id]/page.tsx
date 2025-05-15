import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ChatRoomPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Active Document Banner */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">
              Kontrak-Kerja-PT-ABC-2024.pdf
            </span>
          </div>
          <Button variant="outline" size="sm">
            Lihat PDF
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Initial Analysis */}
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">K</span>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6">
              <p className="text-gray-900 mb-4">
                Saya telah menganalisis kontrak kerja Anda. Berikut adalah
                poin-poin penting yang perlu diperhatikan:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-gray-700 mb-4">
                <li>
                  Durasi kontrak: 1 tahun (1 Januari 2024 - 31 Desember 2024)
                </li>
                <li>Gaji pokok: Rp 5.000.000 per bulan</li>
                <li>Tunjangan: Transport (Rp 500.000) dan Kesehatan (BPJS)</li>
                <li>Jam kerja: 40 jam per minggu, Senin-Jumat</li>
                <li>Masa percobaan: 3 bulan</li>
              </ul>
              <p className="text-gray-900 mb-2">
                Terdapat beberapa klausul yang perlu mendapat perhatian khusus:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-gray-700">
                <li>
                  Klausul non-kompetisi selama 6 bulan setelah berakhirnya
                  kontrak
                </li>
                <li>
                  Kewajiban lembur tanpa kompensasi tambahan dalam kondisi
                  tertentu
                </li>
                <li>Tidak ada ketentuan mengenai bonus tahunan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Question */}
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 items-start justify-end">
            <div className="flex-1 bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900">
                Bisa tolong jelaskan lebih detail tentang klausul non-kompetisi?
                Apa saja yang tidak boleh saya lakukan selama 6 bulan setelah
                kontrak berakhir?
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>

        {/* System Response */}
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">K</span>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6">
              <p className="text-gray-900 mb-4">
                Berdasarkan Pasal 8 kontrak kerja, klausul non-kompetisi
                mencakup:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-gray-700 mb-4">
                <li>
                  Tidak boleh bekerja pada perusahaan kompetitor dalam industri
                  yang sama
                </li>
                <li>
                  Tidak boleh mendirikan usaha yang bersaing langsung dengan
                  perusahaan
                </li>
                <li>
                  Tidak boleh menggunakan atau membagikan informasi rahasia
                  perusahaan
                </li>
              </ul>
              <p className="text-gray-900 mb-4">
                Area geografis yang dicakup meliputi seluruh Indonesia.
                Pelanggaran terhadap ketentuan ini dapat mengakibatkan:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-gray-700">
                <li>Tuntutan hukum perdata</li>
                <li>Denda sebesar Rp 100.000.000</li>
                <li>Kewajiban ganti rugi atas kerugian yang timbul</li>
              </ul>
            </div>
          </div>
        </div>

        {/* User Follow-up */}
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 items-start justify-end">
            <div className="flex-1 bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900">
                Apakah klausul non-kompetisi seperti ini umum di Indonesia? Dan
                apakah bisa dinegosiasikan?
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Ketik pertanyaan Anda..."
              className="w-full px-4 py-2 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button size="sm">Kirim</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
