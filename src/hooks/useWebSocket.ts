import { useEffect, useRef, useState, useCallback } from "react";
import { ChatWebSocket } from "@/lib/websocket";
import { ChatMessage } from "@/lib/types";

interface UseWebSocketReturn {
  sendMessage: (message: string) => void;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  clearError: () => void;
}

export function useWebSocket(
  contractId: string,
  onNewMessage: (message: ChatMessage) => void
): UseWebSocketReturn {
  const wsRef = useRef<ChatWebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onNewMessageRef = useRef(onNewMessage);
  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update the ref when onNewMessage changes
  useEffect(() => {
    onNewMessageRef.current = onNewMessage;
  }, [onNewMessage]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current && wsRef.current.isConnected()) {
      try {
        wsRef.current.sendMessage(message);
      } catch (err) {
        console.error("Error sending message:", err);
        const errorMsg =
          err instanceof Error ? err.message : "Failed to send message";
        setError(`Send failed: ${errorMsg}`);
      }
    } else {
      const errorMsg = wsRef.current
        ? "WebSocket not connected"
        : "WebSocket not initialized";
      console.error(errorMsg);
      setError(errorMsg);
    }
  }, []);

  useEffect(() => {
    console.log(`[Hook] Setting up WebSocket for contract: ${contractId}`);

    // Clear any existing connection timeout
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
    }

    // Set connecting state
    setIsConnecting(true);
    setIsConnected(false);
    setError(null);

    // Create WebSocket connection
    wsRef.current = new ChatWebSocket(contractId);

    // Set up event handlers
    wsRef.current.onMessage = (message: ChatMessage) => {
      console.log("[Hook] Received message:", message);
      onNewMessageRef.current(message);
      setError(null); // Clear error on successful message
    };

    wsRef.current.onError = (errorMessage: string) => {
      console.error("[Hook] WebSocket error:", errorMessage);

      // Categorize errors for better UX
      let userFriendlyError = errorMessage;

      if (errorMessage.includes("timeout")) {
        userFriendlyError = "Connection timeout - server might be busy";
      } else if (errorMessage.includes("server may be unavailable")) {
        userFriendlyError = "Chat service temporarily unavailable";
      } else if (errorMessage.includes("Failed to connect")) {
        userFriendlyError = "Unable to connect to chat service";
      } else if (
        errorMessage.includes("Connection failed after multiple attempts")
      ) {
        userFriendlyError = "Chat service is currently offline";
      } else if (errorMessage.includes("protocol error")) {
        userFriendlyError = "Communication error with server";
      }

      setError(userFriendlyError);
      setIsConnecting(false);
    };

    wsRef.current.onConnectionChange = (connected: boolean) => {
      console.log(`[Hook] Connection status changed: ${connected}`);
      setIsConnected(connected);
      setIsConnecting(false); // Stop connecting state when connection status changes

      if (connected) {
        setError(null); // Clear error on successful connection
        // Clear connection timeout on successful connection
        if (connectionTimeoutRef.current) {
          clearTimeout(connectionTimeoutRef.current);
          connectionTimeoutRef.current = null;
        }
      }
    };

    // Set a broader timeout for the entire connection process
    connectionTimeoutRef.current = setTimeout(() => {
      if (!wsRef.current?.isConnected()) {
        console.log("[Hook] Overall connection timeout");
        setIsConnecting(false);
        setError("Connection is taking too long - please try again");
      }
    }, 15000); // 15 seconds

    // Connect
    try {
      wsRef.current.connect();
    } catch (err) {
      console.error("[Hook] Error during connection setup:", err);
      setError("Failed to initialize connection");
      setIsConnecting(false);
    }

    // Cleanup on unmount or contractId change
    return () => {
      console.log("[Hook] Cleaning up WebSocket connection");

      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
        connectionTimeoutRef.current = null;
      }

      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }

      setIsConnected(false);
      setIsConnecting(false);
      setError(null);
    };
  }, [contractId]);

  return {
    sendMessage,
    isConnected,
    isConnecting,
    error,
    clearError,
  };
}
