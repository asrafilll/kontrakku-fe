"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
} from "lucide-react";
import { ContractSummary, ContractClause } from "@/lib/types";

interface ContractSummaryProps {
  summary: ContractSummary;
  onContinueToChat: () => void;
  buttonText?: string;
  buttonDescription?: string;
}

export default function ContractSummaryComponent({
  summary,
  onContinueToChat,
  buttonText,
  buttonDescription,
}: ContractSummaryProps) {
  const [expandedClauses, setExpandedClauses] = useState<Set<number>>(
    new Set()
  );
  const [showAllClauses, setShowAllClauses] = useState(false);

  const toggleClause = (index: number) => {
    const newExpanded = new Set(expandedClauses);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedClauses(newExpanded);
  };

  const redFlagClauses = summary.clauses.filter((clause) => clause.redFlag);
  const vagueClauses = summary.clauses.filter(
    (clause) => clause.vague && !clause.redFlag
  );
  const goodClauses = summary.clauses.filter(
    (clause) => !clause.redFlag && !clause.vague
  );

  const displayedClauses = showAllClauses
    ? summary.clauses
    : summary.clauses.slice(0, 5);

  const ClauseCard = ({
    clause,
    index,
  }: {
    clause: ContractClause;
    index: number;
  }) => {
    const isExpanded = expandedClauses.has(index);

    return (
      <div
        className={`border rounded-lg p-4 ${
          clause.redFlag
            ? "border-red-200 bg-red-50"
            : clause.vague
              ? "border-yellow-200 bg-yellow-50"
              : "border-green-200 bg-green-50"
        }`}
      >
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleClause(index)}
        >
          <div className="flex items-center space-x-3">
            {clause.redFlag ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : clause.vague ? (
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            <div>
              <h4 className="font-medium text-gray-900">
                {clause.clauseTopic}
              </h4>
              {clause.redFlag && (
                <span className="text-sm text-red-600 font-medium">
                  ⚠️ Red Flag
                </span>
              )}
              {clause.vague && !clause.redFlag && (
                <span className="text-sm text-yellow-600 font-medium">
                  ⚠️ Perlu Klarifikasi
                </span>
              )}
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            <div>
              <h5 className="font-medium text-gray-800 mb-2">
                Ringkasan Klausul:
              </h5>
              <p className="text-sm text-gray-700 leading-relaxed">
                {clause.clauseSummary}
              </p>
            </div>

            {clause.issueReason && (
              <div>
                <h5 className="font-medium text-red-800 mb-2">
                  Alasan Masalah:
                </h5>
                <p className="text-sm text-red-700 leading-relaxed">
                  {clause.issueReason}
                </p>
              </div>
            )}

            {clause.questions.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-800 mb-2">
                  Pertanyaan yang Disarankan:
                </h5>
                <ul className="space-y-1">
                  {clause.questions.map((question, qIndex) => (
                    <li
                      key={qIndex}
                      className="text-sm text-gray-700 pl-4 border-l-2 border-gray-300"
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white p-3 rounded border">
              <h5 className="font-medium text-gray-800 mb-2">
                Isi Klausul Asli:
              </h5>
              <p className="text-xs text-gray-600 font-mono leading-relaxed">
                {clause.clauseContent}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Analisis Kontrak Selesai
            </h1>
            <p className="text-gray-600">
              Berikut adalah hasil analisis detail kontrak Anda
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-800">Red Flags</span>
          </div>
          <p className="text-2xl font-bold text-red-800 mt-1">
            {redFlagClauses.length}
          </p>
          <p className="text-sm text-red-600">Klausul bermasalah</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">
              Perlu Klarifikasi
            </span>
          </div>
          <p className="text-2xl font-bold text-yellow-800 mt-1">
            {vagueClauses.length}
          </p>
          <p className="text-sm text-yellow-600">Klausul ambigu</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Baik</span>
          </div>
          <p className="text-2xl font-bold text-green-800 mt-1">
            {goodClauses.length}
          </p>
          <p className="text-sm text-green-600">Klausul standar</p>
        </div>
      </div>

      {/* Contract Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          Ringkasan Kontrak
        </h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-blue-800 leading-relaxed whitespace-pre-wrap">
            {summary.contractSummary}
          </p>
        </div>
      </div>

      {/* Coverage Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-3">
            ✅ Topik yang Tercakup
          </h3>
          <ul className="space-y-1">
            {summary.coveredTopic.map((topic, index) => (
              <li
                key={index}
                className="text-sm text-green-700 flex items-center"
              >
                <CheckCircle className="w-3 h-3 mr-2" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">
            ❌ Topik yang Belum Tercakup
          </h3>
          <ul className="space-y-1">
            {summary.uncoveredTopic.map((topic, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-center"
              >
                <Info className="w-3 h-3 mr-2" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clauses Analysis */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Analisis Klausul Detail
          </h2>
          {summary.clauses.length > 5 && (
            <button
              onClick={() => setShowAllClauses(!showAllClauses)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showAllClauses
                ? "Tampilkan Lebih Sedikit"
                : `Tampilkan Semua (${summary.clauses.length})`}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {displayedClauses.map((clause, index) => (
            <ClauseCard key={index} clause={clause} index={index} />
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onContinueToChat}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          {buttonText || "Lanjut ke Chat Assistant"}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          {buttonDescription ||
            "Setelah melihat analisis, Anda bisa bertanya lebih detail kepada AI assistant"}
        </p>
      </div>
    </div>
  );
}
