import { useEffect, useState } from "react";
import { options } from "./constants";

/**
 * Custom hook to fetch a movie trailer
 * @param {string|number} movieId - The TMDB movie ID
 * @returns {string|null} - The YouTube trailer key or null
 */
export const useMovieTrailer = (movieId) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        const data = await response.json();

        const trailer = data.results?.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  return trailerKey;
};
