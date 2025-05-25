import { Metadata } from "next";

interface ChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Chat - ${id} | Kontrakku`,
    description: "Analisis kontrak dengan AI",
  };
}

export default function ChatPage() {
  // The layout wrapper handles all the UI rendering
  // This page only exists for routing purposes
  return null;
}
