import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";

interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  return <DashboardLayoutWrapper initialContractId={id} />;
}
