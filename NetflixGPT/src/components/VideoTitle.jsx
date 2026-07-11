import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='absolute w-1/3 mt-50 ml-15 text-white z-3 p-2 items-center'>
        <p className='m-2 font-bold text-6xl text-white'>{title}</p>
        <p className='font-bold text-m mt-3 ml-2' >{overview}</p>
        <div className='mt-4 ml-2'>
            <button className='text-2xl font-bold bg-amber-50 text-black px-5 py-1 rounded-md hover:bg-gray-600 cursor-pointer'>▶️ Play</button>
            <button className='text-2xl font-bold bg-amber-50 text-black px-5 py-1 rounded-md hover:bg-gray-600 mx-4 cursor-pointer'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle