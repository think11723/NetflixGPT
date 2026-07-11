import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "Movie",

  initialState: {
    nowPlayingMovies:null,
  },

  reducers: {
    addNowPlayingMovie(state, action) {
        state.nowPlayingMovies = action.payload
    },

    removeNowPlayingMovie(state, action) {
       return null;
    },
  },
});


export const {addNowPlayingMovie,removeNowPlayingMovie} = movieSlice.actions
export default movieSlice.reducer;