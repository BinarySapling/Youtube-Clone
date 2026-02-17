import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoDetails } from "../api/youtube";

const Watch = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null)

    useEffect(() => {
        const loadVideo = async () => {
            const data = await fetchVideoDetails(id)
            setVideo(data)
        }

        loadVideo()
    }, [id])

    if (!video) {
        return <div className="text-white p-4">Loading...</div>;
    }

    return (
    <div className="w-full max-w-6xl mx-auto text-white">
      <div className="w-full aspect-video mb-4 md:mb-6">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={video.snippet.title}
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>

      <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
        {video.snippet.title}
      </h1>
      <div className="bg-gray-900 p-3 md:p-4 rounded-lg whitespace-pre-line text-sm md:text-base">
        {video.snippet.description}
      </div>

    </div>
  );

};

export default Watch;
