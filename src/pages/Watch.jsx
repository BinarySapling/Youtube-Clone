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
    <div className="w-full max-w-[1280px] text-white">
      <div className="w-full aspect-video mb-4 rounded-xl overflow-hidden bg-[#0f0f0f]">
        <iframe src={`https://www.youtube.com/embed/${id}`} title={video.snippet.title} allowFullScreen  className="w-full h-full"></iframe>
      </div>
      <h1 className="text-xl font-semibold mb-4">
        {video.snippet.title}
      </h1>
      <div className="bg-[#272727] p-4 rounded-xl text-sm text-gray-300 whitespace-pre-line max-h-60 overflow-y-auto">
        {video.snippet.description}
      </div>
    </div>
  );

};

export default Watch;
