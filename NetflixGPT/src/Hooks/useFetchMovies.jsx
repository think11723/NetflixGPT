import React from "react";
import { options } from '../utils/constants'
import { useDispatch } from 'react-redux'

const useFetchMovies = (api) => {
  const dispatch = useDispatch();
  
  const FetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      options,
    );
    const data = await response.json();
    dispatch(addNowPlayingMovie(data.results));
  };

  useEffect
};


export default useFetchMovies
