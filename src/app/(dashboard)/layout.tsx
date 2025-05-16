"use client";

import { LogOut, Plus, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LogoutModal } from "@/components/modals/LogoutModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    setShowLogoutModal(false);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        {/* New Chat Button */}
        <div className="p-4">
          <Button
            className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Kontrak Baru
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
              Riwayat Kontrak
            </h2>
            <div className="space-y-1">
              {/* Empty State */}
              <div className="text-sm text-gray-400 px-3 py-2">
                Belum ada kontrak yang dianalisis
              </div>

              {/* History Items (hidden initially) */}
              <div className="hidden">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md">
                  Kontrak Kerja PT ABC
                  <div className="text-xs text-gray-500">20 Maret 2024</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-300">
                John Doe
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-400"
              onClick={() => setShowLogoutModal(true)}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Logo Header */}
        <div className="h-16 border-b border-gray-200 flex items-center px-4">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-blue-600">Kontrak</span>
              <span className="text-gray-900">ku</span>
            </span>
          </Link>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
