import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChannelDetails, fetchVideoDetails } from "../api/youtube";

const Watch = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null)
    const [channel, setChannel] = useState(null)
    useEffect(() => {
        const loadVideo = async () => {
            try {
                const data = await fetchVideoDetails(id)
                setVideo(data)

                const channelData = await fetchChannelDetails(data.snippet.channelId)
                setChannel(channelData)
            } catch (error) {
                console.error("Error loading video:", error)
            }
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
            
            <h1 className="text-xl font-semibold mb-4 leading-tight">
                {video.snippet.title}
            </h1>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                {channel && channel.snippet && (
                    <div className="flex items-center gap-3">
                        <img
                            src={channel.snippet.thumbnails.default.url}
                            alt={channel.snippet.title}
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-medium text-base">
                                {channel.snippet.title}
                            </p>
                            {channel.statistics?.subscriberCount && (
                                <p className="text-xs text-gray-400">
                                    {Number(channel.statistics.subscriberCount).toLocaleString()} subscribers
                                </p>
                            )}
                        </div>
                    </div>
                )}
                
                <div className="flex items-center gap-2 bg-[#272727] rounded-full px-4 py-2">
                    <span className="text-xl">👍</span>
                    <span className="text-sm font-medium">{Number(video.statistics.likeCount).toLocaleString()}</span>
                </div>
            </div>

            <div className="bg-[#272727] p-4 rounded-xl">
                <div className="text-sm font-medium mb-2">
                    {Number(video.statistics.viewCount).toLocaleString()} views • {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
                <div className="text-sm text-gray-300 whitespace-pre-line max-h-60 overflow-y-auto">
                    {video.snippet.description}
                </div>
            </div>
        </div>
    );

};

export default Watch;
