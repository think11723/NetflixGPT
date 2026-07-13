export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODY5MTEzZDhjODdhODE5MjU1NGFmMDgxOWY4Nzc3YyIsIm5iZiI6MTc4Mzc3NTUxNS4wMjksInN1YiI6IjZhNTI0MTFiYjQ4YTAxYjE0MWExMmI5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U1mgKH8aL87-zten6nOSTLyJKy0R_0ws4R7x-rj_9JA",
  },
};

export const image_url_cdn = "https://image.tmdb.org/t/p/w500/"

// Movie API Endpoints
export const now_playing_api = "https://api.themoviedb.org/3/movie/now_playing"
export const popular_movies_api = "https://api.themoviedb.org/3/movie/popular"
export const toprated_movie_api = "https://api.themoviedb.org/3/movie/top_rated"
export const upcoming_movies_api = "https://api.themoviedb.org/3/movie/upcoming"

// Movie categories configuration
export const MOVIE_CATEGORIES = [
  {
    id: "nowPlaying",
    title: "Now Playing",
    api: now_playing_api,
    stateKey: "nowPlayingMovies",
    actionName: "addNowPlayingMovies",
  },
  {
    id: "popular",
    title: "Popular",
    api: popular_movies_api,
    stateKey: "popularMovies",
    actionName: "addPopularMovies",
  },
  {
    id: "topRated",
    title: "Top Rated",
    api: toprated_movie_api,
    stateKey: "topRatedMovies",
    actionName: "addTopRatedMovies",
  },
  {
    id: "upcoming",
    title: "Upcoming",
    api: upcoming_movies_api,
    stateKey: "upcomingMovies",
    actionName: "addUpcomingMovies",
  },
]
