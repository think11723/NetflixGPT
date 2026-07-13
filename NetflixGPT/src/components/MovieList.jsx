import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MovieList = ({ categoryKey, title }) => {
  const movies = useSelector((state) => state.movies);

  // Get movies for the specified category from Redux state
  const movieList = movies?.[categoryKey] || [];

  // Don't render if no movies are available for this category
  if (!movieList || movieList.length === 0) return null;

  return (
    <div className="mb-8 w-full sm:mb-10 md:mb-12 lg:mb-14">
      <h2 className="section-title mb-4 px-0 sm:mb-5 md:mb-6">
        {title}
      </h2>
      <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto sm:gap-3 md:gap-4 pb-2">
        {movieList.map((movie, index) => (
          <MovieCard key={movie.id || index} posterUrl={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
