import { Button } from "@/components/ui/Button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Konfirmasi Keluar
        </h2>
        <p className="text-gray-600 mb-6">
          Apakah Anda yakin ingin keluar dari akun Anda?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-slate-800 hover:text-white"
          >
            Batal
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            Keluar
          </Button>
        </div>
      </div>
    </div>
  );
}
