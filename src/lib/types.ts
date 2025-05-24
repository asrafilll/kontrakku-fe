export interface Contract {
  contract_id: string;
  file_name: string;
  processing_status: "DONE" | "PROCESSING" | "FAILED";
  created_at: string;
}

export interface ContractsResponse {
  contracts: Contract[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  message: string;
  created_at: string;
}

export interface ChatHistoryResponse {
  chats: ChatMessage[];
}
