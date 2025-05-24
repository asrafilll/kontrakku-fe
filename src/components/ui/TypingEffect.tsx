"use client";

import { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypingEffect({
  text,
  speed = 30,
  onComplete,
  className = "",
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  // Format text with proper line breaks and handle special characters
  const formatText = (text: string) => {
    // More aggressive text formatting to handle all edge cases
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

    // Additional cleanup for better display
    formattedText = formattedText
      .replace(/\s*\n\s*/g, "\n") // Clean up spacing around line breaks
      .replace(/\n{3,}/g, "\n\n") // Limit consecutive line breaks to 2
      .replace(/^\n+|\n+$/g, ""); // Remove leading/trailing line breaks

    return formattedText;
  };

  return (
    <div
      className={`whitespace-pre-wrap text-gray-700 text-sm leading-relaxed ${className}`}
      key={text} // Force re-render when text changes
    >
      {formatText(displayedText)}
      {currentIndex < text.length && (
        <span className="animate-pulse bg-blue-600 text-blue-600 ml-1">|</span>
      )}
    </div>
  );
}
