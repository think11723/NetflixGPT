/**
 * ChatInput Component
 * Input area with send button and keyboard shortcuts
 */

import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSend, isLoading, disabled = false }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        120
      ) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading && !disabled) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow newline
        return;
      }
      e.preventDefault();
      handleSend();
    }

    // Escape to close (handled by parent)
    if (e.key === 'Escape') {
      e.preventDefault();
    }
  };

  return (
    <div className="sticky bottom-0 px-4 py-4 bg-gradient-to-t from-gray-900 to-transparent border-t border-gray-700">
      <div className="flex gap-2">
        {/* Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What kind of movie are you looking for?"
          disabled={isLoading || disabled}
          rows={1}
          className={`
            flex-1 px-4 py-3 rounded-lg
            bg-gray-800 text-white placeholder-gray-400
            border border-gray-700 focus:border-red-600
            focus:outline-none
            resize-none
            transition-colors duration-200
            text-sm
            max-h-30
            ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={isLoading || disabled || !input.trim()}
          aria-label="Send message"
          className={`
            flex-shrink-0 w-12 h-12 rounded-lg
            flex items-center justify-center
            transition-all duration-200
            ${
              isLoading || disabled || !input.trim()
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
            }
          `}
        >
          {isLoading ? (
            <svg
              className="w-6 h-6 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.9702544,11.6889879 22.9702544,11.6889879 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.98722272 L3.03521743,10.4282157 C3.03521743,10.5853131 3.19218622,10.7424105 3.50612381,10.7424105 L16.6915026,11.5279001 C16.6915026,11.5279001 17.1624089,11.5279001 17.1624089,11.0566079 L17.1624089,12.4744748 C17.1624089,12.4744748 17.1624089,12.9457669 16.6915026,12.4744748 Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-500 mt-2">
        Press <kbd className="bg-gray-800 px-1 rounded">Enter</kbd> to send • <kbd className="bg-gray-800 px-1 rounded">Shift + Enter</kbd> for newline
      </p>
    </div>
  );
};

export default ChatInput;
