/**
 * FloatingButton Component
 * Netflix-themed floating button in bottom-right corner
 * Opens the AI chat when clicked
 */

import React from 'react';

const FloatingButton = ({ onClick, isOpen }) => {
  return (
    <>
      {/* Floating Button Container */}
      <button
        onClick={onClick}
        aria-label="Open AI movie assistant"
        className={`
          fixed bottom-6 right-6 z-40
          w-16 h-16 rounded-full
          bg-red-600 hover:bg-red-700
          text-white
          flex items-center justify-center
          transition-all duration-300
          shadow-lg hover:shadow-xl
          transform hover:scale-110
          group
          ${isOpen ? 'scale-0 pointer-events-none' : 'animate-pulse hover:animate-none'}
        `}
        title="Ask for movie recommendations"
      >
        {/* AI Icon (simplified) */}
        <svg
          className="w-8 h-8 transform group-hover:scale-110 transition-transform"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      </button>

      {/* Tooltip */}
      <div
        className={`
          fixed bottom-24 right-6 z-40
          bg-gray-900 text-white px-3 py-2 rounded-lg
          text-sm font-semibold whitespace-nowrap
          pointer-events-none
          transition-opacity duration-300
          ${isOpen ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}
        `}
        style={{
          pointerEvents: 'none'
        }}
      >
        Need movie recommendations?
        <div className="absolute top-full right-3 w-2 h-2 bg-gray-900 transform rotate-45" />
      </div>

      {/* Tooltip (hover version) */}
      <style>{`
        button:hover ~ [role="tooltip"] {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default FloatingButton;
