/**
 * TMDB Search Service
 * Searches for movies on The Movie Database to get actual movie data
 * Uses the same API credentials as the main app
 */

import { options, image_url_cdn } from '../utils/constants';

/**
 * Search for a single movie by name on TMDB
 * @param {string} movieName - Name of the movie to search
 * @returns {Promise<Object|null>} - Movie data or null if not found
 */
export const searchMovieOnTMDB = async (movieName) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error(`TMDB search failed for "${movieName}"`);
    }

    const data = await response.json();

    // Return the first matching result
    if (data.results && data.results.length > 0) {
      const movie = data.results[0];
      return {
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        overview: movie.overview,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        backdropPath: movie.backdrop_path
      };
    }

    return null;
  } catch (error) {
    console.error(`Error searching TMDB for "${movieName}":`, error);
    return null;
  }
};

/**
 * Search for multiple movies and return enriched data
 * @param {Array<string>} movieNames - Array of movie names to search
 * @returns {Promise<Array>} - Array of movie data objects
 */
export const searchMoviesOnTMDB = async (movieNames) => {
  const movies = [];

  for (const movieName of movieNames) {
    const movieData = await searchMovieOnTMDB(movieName);
    if (movieData) {
      movies.push(movieData);
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return movies;
};

/**
 * Parse GPT response to extract movie names and reasons
 * Expected format: "Movie Name (Year) - Genre - Reason"
 * @param {string} gptResponse - Raw GPT response text
 * @returns {Array} - Array of {name, year, genre, reason}
 */
export const parseMovieRecommendations = (gptResponse) => {
  const recommendations = [];
  const lines = gptResponse.split('\n').filter(line => line.trim());

  for (const line of lines) {
    // Match pattern: "Movie Name (Year) - Genre - Reason"
    const match = line.match(/^[•\-\*]?\s*(.+?)\s*\((\d{4})\)\s*-\s*(.+?)\s*-\s*(.+)$/);
    if (match) {
      recommendations.push({
        name: match[1].trim(),
        year: match[2],
        genre: match[3].trim(),
        reason: match[4].trim()
      });
    } else {
      // Fallback: try to extract movie name (in case format is different)
      const simpleMatch = line.match(/^[•\-\*]?\s*(.+?)\s*\((\d{4})\)/);
      if (simpleMatch) {
        recommendations.push({
          name: simpleMatch[1].trim(),
          year: simpleMatch[2],
          genre: 'Unknown',
          reason: line
        });
      }
    }
  }

  return recommendations;
};

/**
 * Get poster image URL
 * @param {string} posterPath - Poster path from TMDB
 * @returns {string} - Full image URL
 */
export const getPosterUrl = (posterPath) => {
  return posterPath ? `${image_url_cdn}${posterPath}` : '';
};
