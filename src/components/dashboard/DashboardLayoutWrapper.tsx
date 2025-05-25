"use client";

import { useState, useEffect } from "react";
import { LogOut, Plus, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LogoutModal } from "@/components/modals/LogoutModal";
import UploadModal from "./UploadModal";
import SidebarContractsList from "./SidebarContractsList";
import ChatInterface from "./ChatInterface";
import { Contract } from "@/lib/types";
import { fetchContracts } from "@/lib/api";

interface DashboardLayoutWrapperProps {
  children?: React.ReactNode;
  initialContractId?: string;
}

export default function DashboardLayoutWrapper({
  children,
  initialContractId,
}: DashboardLayoutWrapperProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();

  // Load contract based on URL parameter
  useEffect(() => {
    const loadContracts = async () => {
      try {
        const contractsList = await fetchContracts();

        // If we have an initialContractId, find and select that contract
        if (initialContractId) {
          const contract = contractsList.find(
            (c) => c.contract_id === initialContractId
          );
          if (contract) {
            setSelectedContract(contract);
          } else {
            // Contract not found, redirect to dashboard
            setSelectedContract(null);
            router.push("/dashboard");
          }
        } else {
          // No contract ID in URL, clear selection
          setSelectedContract(null);
        }
      } catch (error) {
        console.error("Failed to load contracts:", error);
      }
    };

    loadContracts();
  }, [initialContractId, router]);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    // Close modal
    setShowLogoutModal(false);

    // Redirect to login
    router.push("/login");
  };

  const handleContractSelect = (contract: Contract) => {
    setSelectedContract(contract);
    // Navigate to the chat URL
    router.push(`/dashboard/chat/${contract.contract_id}`);
  };

  const handleUploadSuccess = (contractId?: string) => {
    // Refresh the contracts list by updating the key
    setRefreshKey((prev) => prev + 1);

    // If we have a contractId, redirect to that chat room
    if (contractId) {
      router.push(`/dashboard/chat/${contractId}`);
    }
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleBackToDashboard = () => {
    setSelectedContract(null);
    router.push("/dashboard");
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
            onClick={openUploadModal}
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
            <SidebarContractsList
              key={refreshKey}
              onContractSelect={handleContractSelect}
              selectedContractId={selectedContract?.contract_id}
            />
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
                {typeof window !== "undefined"
                  ? localStorage.getItem("userEmail") || "Admin"
                  : "Admin"}
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
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {selectedContract && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBackToDashboard}
                  className="mr-3 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <Link href="/dashboard" className="flex items-center">
                <span className="text-2xl font-bold">
                  <span className="text-blue-600">Kontrak</span>
                  <span className="text-gray-900">ku</span>
                </span>
              </Link>
            </div>
            {selectedContract && (
              <div className="text-sm text-gray-600">
                {selectedContract.file_name}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {selectedContract ? (
            <ChatInterface contract={selectedContract} />
          ) : (
            children || (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Selamat datang di Kontrakku
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Pilih kontrak dari sidebar untuk mulai menganalisis atau
                    unggah kontrak baru
                  </p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={openUploadModal}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Unggah Kontrak Baru
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
