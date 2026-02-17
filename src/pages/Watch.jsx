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
      <div className="w-full aspect-video mb-4 md:mb-6 border-2 border-orange-600 rounded-lg overflow-hidden">
        <iframe src={`https://www.youtube.com/embed/${id}`} title={video.snippet.title} allowFullScreen  className="w-full h-full"></iframe>
      </div>
      <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-orange-500">
        {video.snippet.title}
      </h1>
      <div className="bg-black border border-orange-600 p-3 md:p-4 rounded-lg whitespace-pre-line text-sm md:text-base overflow-hidden">
        {video.snippet.description}
      </div>

    </div>
  );

};

export default Watch;
