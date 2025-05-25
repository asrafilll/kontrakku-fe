import { ChatMessage } from "./types";

export interface WebSocketMessage {
  message: string;
}

export interface WebSocketResponse {
  type?: string;
  message?:
    | string
    | {
        assistant_message?: string;
        references_numbers?: number[] | string[];
      };
  assistant_message?: string;
  references_numbers?: number[] | null;
  data?: ChatMessage;
}

export class ChatWebSocket {
  private ws: WebSocket | null = null;
  private contractId: string;
  private baseUrl: string = "ws://194.233.68.50:8000";
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 3000;
  private connectionTimeout: NodeJS.Timeout | null = null;
  private isIntentionalClose: boolean = false;
  private pingInterval: NodeJS.Timeout | null = null;

  // Event callbacks
  public onMessage: ((message: ChatMessage) => void) | null = null;
  public onError: ((error: string) => void) | null = null;
  public onConnectionChange: ((connected: boolean) => void) | null = null;

  constructor(contractId: string) {
    this.contractId = contractId;
  }

  connect(): void {
    try {
      // Clear any existing timeout
      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
      }

      const wsUrl = `${this.baseUrl}/ws/chat/${this.contractId}/`;
      console.log(`[WebSocket] Attempting to connect to: ${wsUrl}`);
      console.log(
        `[WebSocket] Attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts + 1}`
      );

      this.ws = new WebSocket(wsUrl);
      this.isIntentionalClose = false;

      // Set connection timeout
      this.connectionTimeout = setTimeout(() => {
        if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
          console.log("[WebSocket] Connection timeout after 10 seconds");
          this.ws.close();
          this.handleConnectionError(
            "Connection timeout - server may be unavailable"
          );
        }
      }, 10000);

      this.ws.onopen = () => {
        console.log("[WebSocket] Successfully connected");
        this.reconnectAttempts = 0;
        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }

        // Start ping interval to keep connection alive
        this.startPingInterval();

        this.onConnectionChange?.(true);
      };

      this.ws.onmessage = (event) => {
        try {
          console.log("[WebSocket] Received message:", event.data);

          let messageData = event.data;

          // Handle case where data might be double-encoded JSON
          if (typeof messageData === "string" && messageData.startsWith('"{')) {
            try {
              messageData = JSON.parse(messageData);
            } catch {
              console.warn("[WebSocket] Failed to parse double-encoded JSON");
            }
          }

          // Parse the main JSON
          const parsedData: WebSocketResponse = JSON.parse(messageData);
          console.log("[WebSocket] Parsed data:", parsedData);

          // Handle ping/pong responses
          if (parsedData.type === "pong") {
            console.log("[WebSocket] Received pong");
            return;
          }

          // Handle the actual server response format
          if (parsedData.assistant_message) {
            const chatMessage: ChatMessage = {
              role: "assistant",
              message: parsedData.assistant_message,
              created_at: new Date().toISOString(),
            };
            console.log("[WebSocket] Sending assistant message:", chatMessage);
            this.onMessage?.(chatMessage);
          } else if (
            typeof parsedData.message === "object" &&
            parsedData.message !== null &&
            "assistant_message" in parsedData.message
          ) {
            // Handle nested structure: {message: {assistant_message: "..."}}
            const nestedMessage = parsedData.message as {
              assistant_message: string;
            };
            const chatMessage: ChatMessage = {
              role: "assistant",
              message: nestedMessage.assistant_message,
              created_at: new Date().toISOString(),
            };
            console.log(
              "[WebSocket] Sending nested assistant message:",
              chatMessage
            );
            this.onMessage?.(chatMessage);
          } else if (parsedData.data) {
            console.log("[WebSocket] Sending data message:", parsedData.data);
            this.onMessage?.(parsedData.data);
          } else if (
            parsedData.message &&
            typeof parsedData.message === "string"
          ) {
            const chatMessage: ChatMessage = {
              role: "assistant",
              message: parsedData.message,
              created_at: new Date().toISOString(),
            };
            console.log("[WebSocket] Sending regular message:", chatMessage);
            this.onMessage?.(chatMessage);
          } else {
            console.warn("[WebSocket] Unhandled message format:", parsedData);
            // Fallback: send the raw data as message if no recognized format
            const chatMessage: ChatMessage = {
              role: "assistant",
              message: JSON.stringify(parsedData),
              created_at: new Date().toISOString(),
            };
            console.log("[WebSocket] Sending fallback message:", chatMessage);
            this.onMessage?.(chatMessage);
          }
        } catch (error) {
          console.error("[WebSocket] Error parsing message:", error);
          console.error("[WebSocket] Raw data:", event.data);
          this.onError?.("Failed to parse message from server");
        }
      };

      this.ws.onclose = (event) => {
        console.log(
          `[WebSocket] Connection closed - Code: ${event.code}, Reason: ${event.reason || "No reason provided"}`
        );

        // Stop ping interval
        this.stopPingInterval();

        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }

        this.onConnectionChange?.(false);

        // Handle different close codes
        if (this.isIntentionalClose) {
          console.log("[WebSocket] Intentional disconnect, not reconnecting");
          return;
        }

        // Check for specific error codes
        if (event.code === 1006) {
          // Abnormal closure - connection lost
          this.handleConnectionError("Connection lost unexpectedly");
        } else if (event.code === 1002) {
          // Protocol error
          this.handleConnectionError("WebSocket protocol error");
        } else if (event.code === 1003) {
          // Unsupported data
          this.handleConnectionError("Server received unsupported data");
        } else if (event.code === 1011) {
          // Server error
          this.handleConnectionError("Server encountered an error");
        } else if (event.code !== 1000 && event.code !== 1001) {
          // Unexpected closure, attempt reconnect
          this.attemptReconnect(
            `Connection closed unexpectedly (Code: ${event.code})`
          );
        }
      };

      this.ws.onerror = (error) => {
        console.error("[WebSocket] Error event:", error);

        if (this.connectionTimeout) {
          clearTimeout(this.connectionTimeout);
          this.connectionTimeout = null;
        }

        // Provide more specific error based on readyState
        if (this.ws) {
          switch (this.ws.readyState) {
            case WebSocket.CONNECTING:
              this.handleConnectionError(
                "Failed to connect - server may be unavailable"
              );
              break;
            case WebSocket.OPEN:
              this.handleConnectionError("Connection error occurred");
              break;
            case WebSocket.CLOSING:
              console.log("[WebSocket] Error during closing");
              break;
            case WebSocket.CLOSED:
              this.handleConnectionError(
                "Connection was closed due to an error"
              );
              break;
            default:
              this.handleConnectionError("Unknown WebSocket error");
          }
        } else {
          this.handleConnectionError("WebSocket instance not available");
        }
      };
    } catch (error) {
      console.error("[WebSocket] Failed to create connection:", error);
      this.handleConnectionError(
        `Failed to establish connection: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  private handleConnectionError(errorMessage: string): void {
    console.log(`[WebSocket] Handling error: ${errorMessage}`);

    // For certain errors, don't attempt reconnection
    if (
      errorMessage.includes("server may be unavailable") ||
      errorMessage.includes("timeout")
    ) {
      this.onError?.(errorMessage);
      return;
    }

    this.attemptReconnect(errorMessage);
  }

  private attemptReconnect(reason: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts); // Exponential backoff
      console.log(`[WebSocket] Reconnecting in ${delay}ms... (${reason})`);
      console.log(
        `[WebSocket] Attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts}`
      );

      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, delay);
    } else {
      console.log("[WebSocket] Max reconnection attempts reached");
      this.onError?.(
        "Connection failed after multiple attempts - WebSocket service may be unavailable"
      );
    }
  }

  sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const payload: WebSocketMessage = { message };
      console.log("[WebSocket] Sending message:", payload);
      this.ws.send(JSON.stringify(payload));
    } else {
      const state = this.ws?.readyState;
      const stateNames = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
      const stateName = state !== undefined ? stateNames[state] : "UNKNOWN";

      console.error(
        `[WebSocket] Cannot send message - State: ${stateName} (${state})`
      );
      this.onError?.(`WebSocket is not connected (State: ${stateName})`);
    }
  }

  disconnect(): void {
    console.log("[WebSocket] Intentional disconnect");
    this.isIntentionalClose = true;

    this.stopPingInterval();

    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    if (this.ws) {
      this.ws.close(1000, "Component unmounting");
      this.ws = null;
    }
  }

  private startPingInterval(): void {
    // Clear any existing ping interval
    this.stopPingInterval();

    // Send ping every 30 seconds to keep connection alive
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        try {
          this.ws.send(JSON.stringify({ type: "ping" }));
          console.log("[WebSocket] Sent ping");
        } catch (error) {
          console.error("[WebSocket] Error sending ping:", error);
        }
      }
    }, 30000);
  }

  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
