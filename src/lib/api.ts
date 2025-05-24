import {
  Contract,
  ContractsResponse,
  ChatMessage,
  ChatHistoryResponse,
} from "./types";

const API_BASE_URL = "http://194.233.68.50:8000/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface UploadResponse {
  success: boolean;
  contract_id: string;
  status: string;
}

export async function fetchContracts(): Promise<Contract[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/contracts`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `Failed to fetch contracts: ${response.statusText}`
      );
    }

    const data: ContractsResponse = await response.json();
    return data.contracts;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Network error occurred while fetching contracts");
  }
}

export async function uploadContract(file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/contracts/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `Failed to upload contract: ${response.statusText}`
      );
    }

    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Network error occurred while uploading contract");
  }
}

export async function fetchChatHistory(
  contractId: string
): Promise<ChatMessage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/chats/${contractId}/`);

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `Failed to fetch chat history: ${response.statusText}`
      );
    }

    const data: ChatHistoryResponse = await response.json();
    return data.chats;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error("Network error occurred while fetching chat history");
  }
}
