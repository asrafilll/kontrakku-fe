"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Loader2,
  AlertCircle,
  FileText,
  Send,
  Wifi,
  WifiOff,
  BarChart3,
  X,
} from "lucide-react";
import { ChatMessage, Contract, ContractStatus } from "@/lib/types";
import { fetchChatHistory, fetchContractStatus, ApiError } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useWebSocket } from "@/hooks/useWebSocket";
import TypingEffect from "@/components/ui/TypingEffect";
import ContractSummaryComponent from "@/components/ui/ContractSummary";

interface ChatInterfaceProps {
  contract: Contract;
}

export default function ChatInterface({ contract }: ChatInterfaceProps) {
  const [contractStatus, setContractStatus] = useState<ContractStatus | null>(
    null
  );
  const [statusLoading, setStatusLoading] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Modal state for re-checking analysis
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [modalAnalysisLoading, setModalAnalysisLoading] = useState(false);
  const [modalAnalysisError, setModalAnalysisError] = useState<string | null>(
    null
  );
  const [modalContractStatus, setModalContractStatus] =
    useState<ContractStatus | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);

  // Load contract status first
  useEffect(() => {
    const loadContractStatus = async () => {
      try {
        setStatusLoading(true);
        setStatusError(null);

        console.log(
          "[ChatInterface] Fetching contract status for:",
          contract.contract_id
        );
        const status = await fetchContractStatus(contract.contract_id);
        console.log("[ChatInterface] Contract status:", status);

        setContractStatus(status);

        // If status is DONE and has summary, show summary first
        if (status.status === "DONE" && status.summary) {
          setShowSummary(true);
        } else if (status.status === "DONE" && !status.summary) {
          // Status DONE but no summary, go directly to chat
          setShowChat(true);
        }
        // If status is PROCESSING, keep polling
        else if (status.status === "PROCESSING") {
          // Poll every 3 seconds for status update
          const pollInterval = setInterval(async () => {
            try {
              const updatedStatus = await fetchContractStatus(
                contract.contract_id
              );
              setContractStatus(updatedStatus);

              if (updatedStatus.status === "DONE") {
                clearInterval(pollInterval);
                if (updatedStatus.summary) {
                  setShowSummary(true);
                } else {
                  setShowChat(true);
                }
              }
            } catch (error) {
              console.error("Error polling contract status:", error);
            }
          }, 3000);

          // Cleanup interval on unmount
          return () => clearInterval(pollInterval);
        }
      } catch (err) {
        console.error("[ChatInterface] Error fetching contract status:", err);
        if (err instanceof ApiError) {
          setStatusError(`Error ${err.status}: ${err.message}`);
        } else {
          setStatusError(
            err instanceof Error ? err.message : "An unexpected error occurred"
          );
        }
      } finally {
        setStatusLoading(false);
      }
    };

    loadContractStatus();
  }, [contract.contract_id]);

  // WebSocket hook - only initialize when showChat is true
  const handleNewMessage = useCallback((message: ChatMessage) => {
    console.log("[ChatInterface] Received raw message:", message);

    setMessages((prev) => {
      const newMessages = [...prev, message];
      return newMessages;
    });

    // Set typing indicator only for assistant messages, after state update
    if (message.role === "assistant") {
      setMessages((prev) => {
        setTypingMessageId(prev.length - 1);
        return prev;
      });
    }

    setSending(false);
  }, []);

  const {
    sendMessage,
    isConnected,
    isConnecting,
    error: wsError,
    clearError,
  } = useWebSocket(showChat ? contract.contract_id : "", handleNewMessage);

  // Load chat history when chat is enabled
  const loadChatHistory = useCallback(async () => {
    if (!showChat) return;

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
  }, [contract.contract_id, showChat]);

  useEffect(() => {
    if (showChat) {
      loadChatHistory();
    }
  }, [loadChatHistory, showChat]);

  const handleContinueToChat = () => {
    setShowSummary(false);
    setShowChat(true);
  };

  // Function to re-check contract analysis in modal
  const handleRecheckAnalysis = async () => {
    setShowAnalysisModal(true);
    setModalAnalysisLoading(true);
    setModalAnalysisError(null);
    setModalContractStatus(null);

    try {
      console.log(
        "[ChatInterface] Re-checking analysis for:",
        contract.contract_id
      );
      const status = await fetchContractStatus(contract.contract_id);
      console.log("[ChatInterface] Modal analysis status:", status);
      setModalContractStatus(status);
    } catch (err) {
      console.error("[ChatInterface] Error re-checking analysis:", err);
      if (err instanceof ApiError) {
        setModalAnalysisError(`Error ${err.status}: ${err.message}`);
      } else {
        setModalAnalysisError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    } finally {
      setModalAnalysisLoading(false);
    }
  };

  const closeAnalysisModal = () => {
    setShowAnalysisModal(false);
    setModalContractStatus(null);
    setModalAnalysisError(null);
    setModalAnalysisLoading(false);
  };

  // Format message text
  const formatMessageText = (text: string): string => {
    if (typeof text !== "string") {
      return JSON.stringify(text);
    }

    let formattedText = text;

    // Handle if the text is a JSON string (common from WebSocket responses)
    try {
      // Try to parse if it looks like a JSON string
      if (text.startsWith('"') && text.endsWith('"')) {
        formattedText = JSON.parse(text);
      }
    } catch {
      // If parsing fails, continue with original text
    }

    // Clean up escape sequences step by step
    formattedText = formattedText
      .replace(/\\n/g, "\n") // Replace \n with actual newlines
      .replace(/\\t/g, "\t") // Replace \t with actual tabs
      .replace(/\\r/g, "\r") // Replace \r with actual carriage returns
      .replace(/\\\\/g, "\\") // Replace \\ with single \
      .replace(/\\"/g, '"') // Replace \" with actual quotes
      .replace(/\\'/g, "'") // Replace \' with actual apostrophes
      .trim();

    // Clean up multiple newlines and whitespace
    formattedText = formattedText
      .replace(/\n\s*\n\s*\n/g, "\n\n") // Replace 3+ newlines with 2
      .replace(/^\n+|\n+$/g, "") // Remove leading/trailing newlines
      .replace(/\s+$/gm, ""); // Remove trailing spaces from each line

    return formattedText;
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending || !isConnected || isConnecting) return;

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
      sendMessage(messageText);
    } catch (error) {
      console.error("Failed to send message:", error);
      setSending(false);
      setMessages((prev) => prev.slice(0, -1));
      setNewMessage(messageText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() && isConnected && !sending && !isConnecting) {
        handleSendMessage();
      }
    }
  };

  const handleTypingComplete = useCallback(() => {
    console.log("[ChatInterface] Typing effect completed");
    setTypingMessageId(null);
  }, []);

  // Render contract status loading
  if (statusLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {contract.file_name}
              </h2>
              <p className="text-sm text-gray-500">
                Memeriksa status analisis...
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">
              Memeriksa status kontrak...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render status error
  if (statusError) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {contract.file_name}
              </h2>
              <p className="text-sm text-red-500">
                Gagal memuat status kontrak
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Gagal Memuat Status
            </h3>
            <p className="text-red-600 mb-4">{statusError}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render processing status
  if (contractStatus?.status === "PROCESSING") {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {contract.file_name}
              </h2>
              <p className="text-sm text-blue-600">
                Sedang menganalisis kontrak...
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Menganalisis Kontrak
            </h3>
            <p className="text-gray-600 mb-4">
              Sistem sedang menganalisis kontrak Anda secara detail. Proses ini
              biasanya memakan waktu 2-5 menit.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 Kami sedang menganalisis klausul, mencari red flags, dan
                mempersiapkan ringkasan komprehensif untuk Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render contract summary
  if (showSummary && contractStatus?.summary) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="font-semibold text-gray-900">
                {contract.file_name}
              </h2>
              <p className="text-sm text-green-600">✅ Analisis selesai</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ContractSummaryComponent
            summary={contractStatus.summary}
            onContinueToChat={handleContinueToChat}
          />
        </div>
      </div>
    );
  }

  // Render chat interface (existing chat code...)
  if (showChat) {
    const isWebSocketUnavailable =
      wsError?.includes("404") ||
      wsError?.includes("Connection failed after multiple attempts");

    if (loading) {
      return (
        <div className="flex flex-col h-full">
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
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="font-semibold text-gray-900">
                  {contract.file_name}
                </h2>
                <p className="text-sm text-red-500">
                  Gagal memuat riwayat chat
                </p>
              </div>
            </div>
          </div>

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

            {/* Right side - Connection Status and Analysis Button */}
            <div className="flex items-center space-x-3">
              {/* Analysis Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRecheckAnalysis}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Lihat Analisis
              </Button>

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
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.created_at}`}
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
                            {message.role === "assistant"
                              ? "Kontrakku"
                              : "Anda"}
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
                            Sedang menganalisa...
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
                  Real-time chat is currently unavailable. You can still view
                  chat history.
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

        {/* Analysis Modal */}
        {showAnalysisModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Analisis Kontrak - {contract.file_name}
                </h2>
                <button
                  onClick={closeAnalysisModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                {modalAnalysisLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Memuat analisis kontrak...
                      </p>
                    </div>
                  </div>
                ) : modalAnalysisError ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center max-w-md">
                      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-red-800 mb-2">
                        Gagal Memuat Analisis
                      </h3>
                      <p className="text-red-600 mb-4">{modalAnalysisError}</p>
                      <Button
                        variant="outline"
                        onClick={handleRecheckAnalysis}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        Coba Lagi
                      </Button>
                    </div>
                  </div>
                ) : modalContractStatus?.summary ? (
                  <ContractSummaryComponent
                    summary={modalContractStatus.summary}
                    onContinueToChat={closeAnalysisModal}
                    buttonText="Tutup"
                    buttonDescription="Analisis telah ditampilkan. Klik Tutup untuk kembali ke chat."
                  />
                ) : modalContractStatus?.status === "PROCESSING" ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center max-w-md">
                      <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Kontrak Sedang Dianalisis
                      </h3>
                      <p className="text-gray-600">
                        Analisis masih dalam proses. Silakan tunggu beberapa
                        saat.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center max-w-md">
                      <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Analisis Belum Tersedia
                      </h3>
                      <p className="text-gray-600">
                        Analisis untuk kontrak ini belum tersedia atau masih
                        dalam proses.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback - should not reach here
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Memuat...</p>
      </div>
    </div>
  );
}
