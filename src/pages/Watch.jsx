import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchVideoDetails, fetchRecommendedVideos } from "../api/youtube";

const Watch = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null)
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVideo = async () => {
            try {
                setLoading(true);
                const cachedVideo = sessionStorage.getItem(`video_${id}`);
                let data;
                
                if (cachedVideo) {
                    data = JSON.parse(cachedVideo);
                    setVideo(data);
                } else {
                    data = await fetchVideoDetails(id);
                    setVideo(data);
                    sessionStorage.setItem(`video_${id}`, JSON.stringify(data));
                }
                
                const cachedRecommended = sessionStorage.getItem(`rec_${id}`);
                if (cachedRecommended) {
                    setRecommended(JSON.parse(cachedRecommended));
                } else {
                    const recData = await fetchRecommendedVideos(data.snippet.title);
                    setRecommended(recData.slice(0, 8));
                    sessionStorage.setItem(`rec_${id}`, JSON.stringify(recData.slice(0, 8)));
                }
                
                const historyItem = {
                    id: id,
                    title: data.snippet.title,
                    thumbnail: data.snippet.thumbnails.medium.url,
                    channelTitle: data.snippet.channelTitle,
                    watchedAt: new Date().toISOString()
                };
                
                const existing = JSON.parse(localStorage.getItem("watchHistory")) || [];
                const filtered = existing.filter(item => item.id !== id);
                const updated = [historyItem, ...filtered].slice(0, 50); 
                localStorage.setItem("watchHistory", JSON.stringify(updated));
            } catch (error) {
                console.error("Error loading video:", error)
            } finally {
                setLoading(false);
            }
        }
        loadVideo()
    }, [id])

    if (loading || !video) {
        return <div className="text-white p-4">Loading...</div>;
    }

    return (
        <div className="w-full max-w-[1800px] flex gap-6 text-white">
            <div className="flex-1">
                <div className="aspect-video mb-4 rounded-xl overflow-hidden bg-[#0f0f0f]">
                    <iframe src={`https://www.youtube.com/embed/${id}`} title={video.snippet.title} allowFullScreen className="w-full h-full"></iframe>
                </div>
                <h1 className="text-xl font-semibold mb-4 leading-tight">{video.snippet.title}</h1>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
                            {video.snippet.channelTitle[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="font-medium text-base">{video.snippet.channelTitle}</p>
                            <p className="text-xs text-gray-400">Creator</p>
                        </div>
                    </div>
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

            <div className="w-[400px] space-y-3">
                <h2 className="font-semibold text-lg mb-2">Recommended</h2>
                {recommended.map((item) => (
                    <Link key={item.id.videoId} to={`/watch/${item.id.videoId}`} className="flex gap-2 group cursor-pointer">
                        <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} className="w-40 h-24 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2 mb-1 group-hover:text-gray-300 transition-colors">{item.snippet.title}</p>
                            <p className="text-xs text-gray-400 mb-1">{item.snippet.channelTitle}</p>
                            <p className="text-xs text-gray-500">{new Date(item.snippet.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Watch;
