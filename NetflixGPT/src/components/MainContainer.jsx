import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = () => {
  const movies = useSelector((state) => state.movies)
  if (!movies.nowPlayingMovies) return null

  const { id, title, overview } = movies.nowPlayingMovies[0]

  return (
    <div className="relative w-full overflow-hidden pt-16 sm:pt-20 md:pt-24">
      <div className="relative min-h-screen sm:min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh]">
        <VideoBackground id={id} />
        <VideoTitle title={title} overview={overview} />
      </div>
    </div>
  )
}

export default MainContainer