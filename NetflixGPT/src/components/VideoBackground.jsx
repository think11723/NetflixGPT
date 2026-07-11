import React, { useEffect, useState } from "react";
import { options } from "../utils/constants";

const VideoBackground = ({ id }) => {
  const [key, setKey] = useState(null);

  const getMovieVideos = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );

    const data = await response.json();

    const trailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      setKey(trailer.key);
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, [id]);

  if (!key) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full scale-150 pointer-events-none"
        src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0`}
        title="Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
    </div>
  );
};

export default VideoBackground;