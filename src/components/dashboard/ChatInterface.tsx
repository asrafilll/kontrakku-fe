"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Loader2,
  AlertCircle,
  FileText,
  Send,
  Wifi,
  WifiOff,
} from "lucide-react";
import { ChatMessage, Contract } from "@/lib/types";
import { fetchChatHistory, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useWebSocket } from "@/hooks/useWebSocket";
import TypingEffect from "@/components/ui/TypingEffect";

interface ChatInterfaceProps {
  contract: Contract;
}

export default function ChatInterface({ contract }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);
  const [messageRefreshKey, setMessageRefreshKey] = useState(0);

  // WebSocket hook
  const handleNewMessage = useCallback((message: ChatMessage) => {
    console.log("[ChatInterface] Received raw message:", message);
    console.log("[ChatInterface] Message content:", message.message);
    console.log("[ChatInterface] Message type:", typeof message.message);

    setMessages((prev) => {
      const newMessages = [...prev, message];
      // Set typing effect for the last assistant message
      if (message.role === "assistant") {
        setTypingMessageId(newMessages.length - 1);
        // Force component refresh to ensure proper formatting
        setMessageRefreshKey((prevKey) => prevKey + 1);
      }
      return newMessages;
    });
    setSending(false);
  }, []);

  const {
    sendMessage,
    isConnected,
    isConnecting,
    error: wsError,
    clearError,
  } = useWebSocket(contract.contract_id, handleNewMessage);

  // Check if WebSocket connection failed
  const isWebSocketUnavailable =
    wsError?.includes("404") ||
    wsError?.includes("Connection failed after multiple attempts");

  const loadChatHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const chatData = await fetchChatHistory(contract.contract_id);
      setMessages(chatData);
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
  }, [contract.contract_id]);

  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  // Format message text to handle various formatting issues
  const formatMessageText = (text: string): string => {
    console.log("[ChatInterface] Original text:", text);
    console.log("[ChatInterface] Text type:", typeof text);

    if (typeof text !== "string") {
      return JSON.stringify(text);
    }

    // More comprehensive text cleaning and formatting
    let formattedText = text
      .replace(/\\n/g, "\n") // Convert literal \n to actual line breaks
      .replace(/\\"([^"]*?)\\"/g, '"$1"') // Convert escaped quotes
      .replace(/\\'/g, "'") // Convert escaped single quotes
      .replace(/\\\\/g, "\\") // Convert escaped backslashes
      .replace(/\\t/g, "\t") // Convert literal \t to tabs
      .replace(/\\r/g, "\r") // Convert literal \r to carriage returns
      // Handle any remaining escaped characters
      .replace(/\\(.)/g, "$1") // Remove backslash from any remaining escaped chars
      .trim();

    // Additional cleanup for common formatting issues
    formattedText = formattedText
      .replace(/\s*\n\s*/g, "\n") // Clean up spacing around line breaks
      .replace(/\n{3,}/g, "\n\n") // Limit consecutive line breaks to 2
      .replace(/^\n+|\n+$/g, ""); // Remove leading/trailing line breaks

    console.log("[ChatInterface] Formatted text:", formattedText);
    return formattedText;
  };

  const handleSendMessage = async () => {
    if (
      !newMessage.trim() ||
      sending ||
      !isConnected ||
      isConnecting ||
      isWebSocketUnavailable
    )
      return;

    const messageText = newMessage.trim();
    setNewMessage("");
    setSending(true);

    // Add user message immediately
    const userMessage: ChatMessage = {
      role: "user",
      message: messageText,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Send via WebSocket
      sendMessage(messageText);
    } catch (error) {
      console.error("Failed to send message:", error);
      setSending(false);
      // Remove the optimistically added message on error
      setMessages((prev) => prev.slice(0, -1));
      setNewMessage(messageText); // Restore the message
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (
        newMessage.trim() &&
        isConnected &&
        !sending &&
        !isConnecting &&
        !isWebSocketUnavailable
      ) {
        handleSendMessage();
      }
    }
  };

  const handleTypingComplete = useCallback(() => {
    setTypingMessageId(null);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {contract.file_name}
              </h2>
              <p className="text-sm text-gray-500">Memuat riwayat chat...</p>
            </div>
          </div>
        </div>

        {/* Loading */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Memuat riwayat chat...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {contract.file_name}
              </h2>
              <p className="text-sm text-red-500">Gagal memuat riwayat chat</p>
            </div>
          </div>
        </div>

        {/* Error */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Gagal Memuat Chat
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              variant="outline"
              onClick={loadChatHistory}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {contract.file_name}
              </h2>
              <p className="text-sm text-gray-500">
                {messages.length} pesan • Diupload{" "}
                {formatDate(contract.created_at)}
              </p>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            {isWebSocketUnavailable ? (
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">Chat Unavailable</span>
              </div>
            ) : isConnecting ? (
              <div className="flex items-center text-blue-600">
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                <span className="text-xs">Menghubungkan...</span>
              </div>
            ) : isConnected ? (
              <div className="flex items-center text-green-600">
                <Wifi className="w-4 h-4 mr-1" />
                <span className="text-xs">Terhubung</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500">
                <WifiOff className="w-4 h-4 mr-1" />
                <span className="text-xs">Terputus</span>
              </div>
            )}
          </div>
        </div>

        {/* WebSocket Error Alert */}
        {wsError && (
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">{wsError}</span>
              </div>
              <button
                onClick={clearError}
                className="text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Belum ada percakapan untuk kontrak ini
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Mulai dengan menanyakan sesuatu tentang kontrak
            </p>
          </div>
        ) : (
          <div className="space-y-4" key={messageRefreshKey}>
            {messages.map((message, index) => (
              <div
                key={`${index}-${messageRefreshKey}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === "assistant"
                      ? "bg-blue-50 border border-blue-100"
                      : "bg-gray-100 border border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "assistant"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {message.role === "assistant" ? "K" : "U"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {message.role === "assistant" ? "Kontrakku" : "Anda"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.created_at)}
                        </span>
                      </div>
                      {message.role === "assistant" &&
                      typingMessageId === index ? (
                        <TypingEffect
                          text={formatMessageText(message.message)}
                          speed={20}
                          onComplete={() => handleTypingComplete()}
                        />
                      ) : (
                        <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                          {formatMessageText(message.message)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Sending indicator */}
            {sending && (
              <div className="flex justify-start">
                <div className="max-w-[70%] rounded-lg p-4 bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-600 text-white">
                      <span className="text-sm font-medium">K</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">
                        Kontrakku
                      </span>
                      <div className="flex items-center mt-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600 mr-2" />
                        <span className="text-sm text-gray-600">
                          Mengetik...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        {isWebSocketUnavailable && (
          <div className="mb-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                Real-time chat is currently unavailable. You can still view chat
                history.
              </span>
            </div>
          </div>
        )}

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isWebSocketUnavailable
                  ? "Real-time chat unavailable"
                  : isConnecting
                    ? "Menghubungkan..."
                    : isConnected
                      ? "Tanya sesuatu tentang kontrak ini..."
                      : "Koneksi terputus"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              rows={2}
              disabled={
                !isConnected ||
                sending ||
                isWebSocketUnavailable ||
                isConnecting
              }
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={
              !newMessage.trim() ||
              !isConnected ||
              sending ||
              isWebSocketUnavailable ||
              isConnecting
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed px-4 py-3 h-auto"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {isWebSocketUnavailable
            ? "Real-time messaging is currently unavailable"
            : isConnecting
              ? "Menghubungkan ke server..."
              : isConnected
                ? "Tekan Enter untuk kirim, Shift+Enter untuk baris baru"
                : "Koneksi terputus, mencoba menghubungkan kembali..."}
        </p>
      </div>
    </div>
  );
}
