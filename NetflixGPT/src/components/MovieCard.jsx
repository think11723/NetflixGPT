import React from 'react'
import { image_url_cdn } from '../utils/constants'

const MovieCard = ({ posterUrl, alt = 'Movie poster' }) => {
  return (
    <div className="movie-card group flex-shrink-0">
      <div className="h-32 w-24 cursor-pointer overflow-hidden rounded-lg sm:h-40 sm:w-28 md:h-52 md:w-36 lg:h-60 lg:w-44" style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
      }}>
        <img
          className="h-full w-full object-cover transition-transform duration-300 group-hover:brightness-125"
          src={image_url_cdn + posterUrl}
          alt={alt}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default MovieCard