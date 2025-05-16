import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ChatRoomPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Empty Document Banner */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Belum ada dokumen</span>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">K</span>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Selamat datang di Analisis Kontrak
              </h2>
              <p className="text-gray-700 mb-6">
                Untuk memulai, silakan unggah dokumen kontrak kerja Anda dalam
                format PDF. Saya akan membantu menganalisis dan menjelaskan
                poin-poin penting dalam kontrak tersebut.
              </p>

              <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center bg-white">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-900 font-medium mb-2">
                  Tarik dan lepas file PDF di sini
                </p>
                <p className="text-gray-500 text-sm mb-4">atau</p>
                <Button className="mx-auto">Pilih File</Button>
                <p className="text-xs text-gray-500 mt-4">
                  Maksimal ukuran file: 10MB
                </p>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p className="font-medium mb-2">Pastikan dokumen Anda:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Dalam format PDF yang dapat dibaca</li>
                  <li>Berisi teks yang jelas dan tidak terpotong</li>
                  <li>Merupakan versi final dari kontrak</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input (Disabled) */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Unggah dokumen untuk mulai bertanya..."
              className="w-full px-4 py-2 pr-24 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              disabled
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Button size="sm" disabled>
                Kirim
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Anda dapat mengajukan pertanyaan setelah mengunggah dokumen
          </p>
        </div>
      </div>
    </div>
  );
}
