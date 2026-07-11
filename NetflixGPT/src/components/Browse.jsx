import React, { useEffect } from 'react'
import { options } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovie } from '../utils/movieSlice'
import MainContainer from './MainContainer'

const Browse = () => {
    const dispatch = useDispatch()
   const NowPlayingMovies = async()=>{
       const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1",options)
       const data = await response.json()    
       dispatch(addNowPlayingMovie(data.results))
   }

   useEffect(()=>{
       NowPlayingMovies() 
   },[])
  return (
    <div>
         <MainContainer />
    </div>
  )
}

export default Browse