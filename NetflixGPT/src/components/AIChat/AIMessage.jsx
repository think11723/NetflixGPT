/**
 * AIMessage Component
 * Displays a single chat message (user or assistant)
 */

import React from 'react';
import MovieRecommendationCard from './MovieRecommendationCard';
import TypingIndicator from './TypingIndicator';

const AIMessage = ({ message, isLoading, onMovieClick }) => {
  const isUserMessage = message.role === 'user';

  return (
    <div
      className={`
        flex gap-3 mb-4 animate-fadeIn
        ${isUserMessage ? 'justify-end' : 'justify-start'}
      `}
    >
      {/* Assistant Avatar */}
      {!isUserMessage && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </div>
      )}

      {/* Message Content */}
      <div
        className={`
          max-w-xs lg:max-w-md px-4 py-3 rounded-lg
          ${isUserMessage
            ? 'bg-red-600 text-white rounded-br-none'
            : 'bg-gray-800 text-gray-100 rounded-bl-none'
          }
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>

      {/* User Avatar */}
      {isUserMessage && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}
    </div>
  );
};

/**
 * Message Group with Movies
 * Displays a message followed by movie recommendations
 */
export const MessageWithMovies = ({ message, isLoading, onMovieClick }) => {
  const isUserMessage = message.role === 'user';

  return (
    <>
      {/* Text Message */}
      <AIMessage
        message={message}
        isLoading={isLoading}
        onMovieClick={onMovieClick}
      />

      {/* Loading Indicator */}
      {isLoading && !isUserMessage && (
        <div className="flex gap-3 mb-4">
          <div className="flex-shrink-0 w-8 h-8" />
          <TypingIndicator />
        </div>
      )}

      {/* Movie Cards */}
      {!isUserMessage && message.movies && message.movies.length > 0 && (
        <div className="mb-4 flex gap-3 overflow-x-auto pb-2">
          {message.movies.map((movie, index) => (
            <MovieRecommendationCard
              key={`${message.id}-movie-${index}`}
              recommendation={movie}
              onMovieClick={onMovieClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AIMessage;
