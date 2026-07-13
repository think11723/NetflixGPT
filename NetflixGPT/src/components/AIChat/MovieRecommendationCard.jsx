/**
 * MovieRecommendationCard Component
 * Displays a movie recommendation with poster, title, year, rating, and reason
 */

import React, { useState } from 'react';
import { getPosterUrl } from '../../services/tmdbSearch';

const MovieRecommendationCard = ({ recommendation, onMovieClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    name,
    year,
    genre,
    reason,
    tmdbData
  } = recommendation;

  const posterUrl = tmdbData?.posterPath ? getPosterUrl(tmdbData.posterPath) : '';
  const rating = tmdbData?.voteAverage ? (tmdbData.voteAverage / 2).toFixed(1) : 'N/A';
  const overview = tmdbData?.overview || reason;
  const movieId = tmdbData?.id;

  const handleMovieClick = () => {
    if (onMovieClick && movieId) {
      onMovieClick(movieId, tmdbData);
    }
  };

  return (
    <div
      onClick={handleMovieClick}
      className={`
        bg-gray-800 rounded-lg overflow-hidden
        transition-all duration-300 cursor-pointer
        hover:shadow-lg hover:scale-105
        flex-shrink-0
        w-40
        ${movieId ? 'hover:ring-2 hover:ring-red-600' : ''}
      `}
    >
      {/* Poster */}
      <div className="relative w-full h-56 bg-gray-700 overflow-hidden group">
        {posterUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse" />
            )}
            <img
              src={posterUrl}
              alt={name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`
                w-full h-full object-cover
                transition-all duration-300
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                group-hover:brightness-125
              `}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-8 h-8 text-gray-500 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 12m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-gray-500">No Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 bg-gray-800">
        {/* Title and Year */}
        <h3 className="font-bold text-sm text-white truncate mb-1">
          {name}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">{year}</span>
          <span className="text-xs text-red-500 font-semibold flex items-center gap-0.5">
            ⭐ {rating}
          </span>
        </div>

        {/* Genre */}
        {genre && (
          <p className="text-xs text-gray-400 mb-2 truncate">
            {genre}
          </p>
        )}

        {/* Overview/Reason */}
        <p className="text-xs text-gray-300 line-clamp-2 mb-2">
          {overview}
        </p>

        {/* Reason (GPT explanation) */}
        {reason && reason !== overview && (
          <div className="pt-2 border-t border-gray-700">
            <p className="text-xs text-gray-400 italic line-clamp-1">
              "{reason}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieRecommendationCard;
