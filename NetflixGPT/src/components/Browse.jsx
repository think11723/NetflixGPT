import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { options } from '../utils/constants';
import { MOVIE_CATEGORIES } from '../utils/constants';
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies } from '../utils/movieSlice';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  const dispatch = useDispatch();

  // Map category IDs to Redux actions
  const actionMap = {
    nowPlaying: addNowPlayingMovies,
    popular: addPopularMovies,
    topRated: addTopRatedMovies,
    upcoming: addUpcomingMovies,
  };

  // Fetch all movie categories dynamically
  const fetchMovieCategory = async (category) => {
    try {
      const response = await fetch(`${category.api}?page=1`, options);
      const data = await response.json();
      const action = actionMap[category.id];
      if (action && data.results) {
        dispatch(action(data.results));
      }
    } catch (error) {
      console.error(`Error fetching ${category.id} movies:`, error);
    }
  };

  useEffect(() => {
    // Fetch all movie categories on component mount
    MOVIE_CATEGORIES.forEach((category) => {
      fetchMovieCategory(category);
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;