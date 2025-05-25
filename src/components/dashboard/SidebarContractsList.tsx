"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2, AlertCircle } from "lucide-react";
import { Contract } from "@/lib/types";
import { fetchContracts, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/utils";

interface SidebarContractsListProps {
  onContractSelect: (contract: Contract) => void;
  selectedContractId?: string;
}

export default function SidebarContractsList({
  onContractSelect,
  selectedContractId,
}: SidebarContractsListProps) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContracts();
  }, []);

  const loadContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      const contractsData = await fetchContracts();
      setContracts(contractsData);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(`Error ${err.status}: ${err.message}`);
      } else {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <AlertCircle className="w-5 h-5 text-red-400 mx-auto mb-2" />
        <p className="text-xs text-red-400">Gagal memuat kontrak</p>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-xs text-gray-500">Belum ada kontrak</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {contracts.map((contract) => (
        <button
          key={contract.contract_id}
          onClick={() => onContractSelect(contract)}
          className={`w-full text-left p-3 rounded-lg transition-colors group ${
            selectedContractId === contract.contract_id
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-800 text-gray-300"
          }`}
        >
          <div className="flex items-start space-x-3">
            <FileText
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                selectedContractId === contract.contract_id
                  ? "text-white"
                  : "text-gray-400 group-hover:text-gray-300"
              }`}
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  selectedContractId === contract.contract_id
                    ? "text-white"
                    : "text-gray-200"
                }`}
              >
                {contract.file_name}
              </p>
              <p
                className={`text-xs truncate ${
                  selectedContractId === contract.contract_id
                    ? "text-blue-100"
                    : "text-gray-500"
                }`}
              >
                {formatDate(contract.created_at)}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
