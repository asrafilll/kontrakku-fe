export interface Contract {
  contract_id: string;
  file_name: string;
  processing_status: "DONE" | "PROCESSING" | "FAILED" | "PENDING";
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

export interface ContractClause {
  clauseTopic: string;
  clauseContent: string;
  clauseSummary: string;
  vague: boolean;
  redFlag: boolean;
  issueReason: string;
  questions: string[];
}

export interface ContractSummary {
  fileName: string;
  contractSummary: string;
  coveredTopic: string[];
  uncoveredTopic: string[];
  clauses: ContractClause[];
}

export interface ContractStatus {
  contract_id: string;
  file_name: string;
  status: "PENDING" | "PROCESSING" | "DONE" | "ERROR";
  created_at: string;
  updated_at: string;
  summary?: ContractSummary;
}
