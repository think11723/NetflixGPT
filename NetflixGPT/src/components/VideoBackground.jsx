import React from "react";
import { useMovieTrailer } from "../utils/customHooks";

const VideoBackground = ({ id }) => {
  const key = useMovieTrailer(id);

  if (!key) return null;

  return (
    <div className="absolute inset-0 w-full overflow-hidden bg-black">
      <iframe
        className="absolute inset-0 h-full w-full scale-150 pointer-events-none"
        src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0`}
        title="Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {/* Side fade gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
      
      {/* Bottom fade gradient - stronger for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      
      {/* Top fade gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
    </div>
  );
};

export default VideoBackground;