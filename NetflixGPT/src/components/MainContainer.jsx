import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = () => {
    const movies = useSelector((state)=>state.movies)
    if(!movies.nowPlayingMovies) return;
    console.log("received movies ",movies);
    const {id,title,overview} =movies.nowPlayingMovies[0] ;
  return (
    <>
    <VideoBackground id={id} />
    <VideoTitle title={title} overview={overview} />
    </>
  )
}

export default MainContainer