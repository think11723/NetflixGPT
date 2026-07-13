/**
 * TypingIndicator Component
 * Shows animated dots while waiting for AI response
 */

import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-gray-800 rounded-lg w-fit">
      <div className="flex gap-1">
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '0s' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.4s' }}
        />
      </div>
      <span className="text-xs text-gray-400 ml-2">Thinking...</span>
    </div>
  );
};

export default TypingIndicator;
