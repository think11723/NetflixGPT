import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <div className="w-full max-w-3xl px-4 pb-8 sm:px-6 sm:pb-12 md:px-8 md:pb-16 lg:px-12 lg:pb-24">
        <h1 className="mb-4 text-3xl font-black text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mb-8 max-w-2xl text-sm text-gray-200 line-clamp-3 sm:text-base md:text-lg lg:line-clamp-4 leading-relaxed">
          {overview}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button className="btn-play">
            ▶ Play
          </button>
          <button className="btn-info">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoTitle