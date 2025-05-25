"use client";

import { usePathname } from "next/navigation";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import AuthGuard from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Extract contract ID from chat routes like /dashboard/chat/[id] or /chat/[id]
  const contractId = pathname.match(/\/chat\/([^\/]+)$/)?.[1];

  return (
    <AuthGuard>
      <DashboardLayoutWrapper initialContractId={contractId}>
        {children}
      </DashboardLayoutWrapper>
    </AuthGuard>
  );
}
