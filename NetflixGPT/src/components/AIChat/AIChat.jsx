/**
 * AIChat Component
 * Main chat modal container with header, messages, and input
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useAIChat } from '../../hooks/useAIChat';
import ChatInput from './ChatInput';
import { MessageWithMovies } from './AIMessage';
import TypingIndicator from './TypingIndicator';

// Lazy load the floating button to avoid initial load impact
const FloatingButton = lazy(() => import('./FloatingButton'));

const WELCOME_MESSAGE = `Hi 👋

I'm your Netflix AI assistant.

Tell me what you're in the mood for.

Examples:
• I want a mind-bending sci-fi movie.
• Recommend a comedy for family night.
• Horror movies similar to Conjuring.
• Movies like Interstellar.
• Best action movies after 2020.`;

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const {
    messages,
    loading,
    error,
    retryMessage,
    sendMessage,
    clearChat,
    retryLastMessage,
    messagesEndRef
  } = useAIChat();

  // Show welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0 && !showWelcome) {
      setShowWelcome(true);
    }
  }, [isOpen, messages.length, showWelcome]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  const handleKeyDown = (e) => {
    // ESC closes the chat
    if (e.key === 'Escape' && isOpen) {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Button - Lazy loaded */}
      <Suspense fallback={null}>
        <FloatingButton onClick={handleOpen} isOpen={isOpen} />
      </Suspense>

      {/* Chat Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Chat Modal */}
      <div
        className={`
          fixed bottom-6 right-6 z-50
          w-full sm:w-[420px]
          h-[80vh] sm:h-[650px]
          bg-gray-900 rounded-2xl
          shadow-2xl
          flex flex-col
          transition-all duration-300 ease-out
          transform
          ${
            isOpen
              ? 'scale-100 opacity-100 visible'
              : 'scale-90 opacity-0 invisible'
          }
          max-h-[95vh] sm:max-h-[80vh]
          mx-2.5 sm:mx-0
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-700 bg-gray-800/50 rounded-t-2xl">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Netflix AI</h2>
                <p className="text-xs text-gray-400">Ask me for movie recommendations</p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close chat"
              className="text-gray-400 hover:text-white transition-colors p-1"
              title="Close (ESC)"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {/* Welcome Message */}
          {showWelcome && messages.length === 0 && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
              <p className="text-sm text-gray-300 whitespace-pre-wrap">
                {WELCOME_MESSAGE}
              </p>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((message, index) => (
            <MessageWithMovies
              key={message.id}
              message={message}
              isLoading={loading && index === messages.length - 1}
              onMovieClick={(movieId, movieData) => {
                // Handle movie click - could navigate or show details
                console.log('Movie clicked:', movieId, movieData);
              }}
            />
          ))}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-300 mb-2">{error}</p>
              {retryMessage && (
                <button
                  onClick={retryLastMessage}
                  className="text-xs px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <ChatInput
          onSend={handleSendMessage}
          isLoading={loading}
          disabled={!!error}
        />

        {/* Clear Chat Button */}
        {messages.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-700 flex justify-center">
            <button
              onClick={clearChat}
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              Clear conversation
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChat;
