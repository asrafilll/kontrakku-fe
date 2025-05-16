import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ChatLoadingPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Document Banner */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">
              Kontrak-Kerja-2024.pdf
            </span>
          </div>
          <Button variant="outline" size="sm" disabled>
            Lihat PDF
          </Button>
        </div>
      </div>

      {/* Upload Status */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">K</span>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <p className="text-gray-900 font-medium">
                  Sedang menganalisis kontrak Anda...
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-2 bg-blue-100 rounded-full w-3/4 animate-pulse"></div>
                  <div className="h-2 bg-blue-100 rounded-full w-1/2 animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    <div className="h-2 bg-blue-100 rounded-full w-2/3 animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    <div className="h-2 bg-blue-100 rounded-full w-1/2 animate-pulse"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
                    <div className="h-2 bg-blue-100 rounded-full w-3/4 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-2 bg-blue-100 rounded-full w-2/3 animate-pulse"></div>
                  <div className="h-2 bg-blue-100 rounded-full w-1/2 animate-pulse"></div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Proses ini mungkin memakan waktu beberapa detik...
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
              placeholder="Tunggu hingga analisis selesai..."
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
            Anda dapat mengajukan pertanyaan setelah analisis selesai
          </p>
        </div>
      </div>
    </div>
  );
}
