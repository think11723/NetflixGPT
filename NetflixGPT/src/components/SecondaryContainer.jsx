import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import { MOVIE_CATEGORIES } from "../utils/constants";

const SecondaryContainer = () => {
  const movies = useSelector((state) => state.movies);

  // Don't render if no movies are loaded
  if (!movies.nowPlayingMovies) return null;

  return (
    <div className="relative z-10 -mt-16 w-full bg-black px-4 pb-8 pt-6 sm:-mt-20 sm:px-6 sm:pb-12 sm:pt-8 md:-mt-24 md:px-8 md:pb-16 md:pt-10 lg:-mt-32 lg:px-12 lg:pb-20 lg:pt-12">
      {MOVIE_CATEGORIES.map((category) => (
        <MovieList
          key={category.id}
          categoryKey={category.stateKey}
          title={category.title}
        />
      ))}
    </div>
  );
};

export default SecondaryContainer;
