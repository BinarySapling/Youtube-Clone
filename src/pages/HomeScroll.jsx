import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchTrendingVideos } from "../api/youtube";
import { Link } from "react-router-dom";

const HomeScroll = () => {
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);
    const loadMoreRef = useRef(null);
    const MAX_VIDEOS = 100;
    const initialLoadRef = useRef(false);

    const loadVideos = useCallback(async () => {
        if (loading || !hasMore) return;
        
        setLoading(true);
        try {
            const cacheKey = `trending_${nextPageToken || 'initial'}`;
            const cached = sessionStorage.getItem(cacheKey);
            let data;
            
            if (cached && !nextPageToken) {
                data = JSON.parse(cached);
            } else {
                data = await fetchTrendingVideos(nextPageToken);
                if (!nextPageToken) {
                    sessionStorage.setItem(cacheKey, JSON.stringify(data));
                }
            }
            
            setVideos(prev => {
                const newVideos = [...prev, ...data.items];
                
                if (newVideos.length >= MAX_VIDEOS) {
                    setHasMore(false);
                    return newVideos.slice(0, MAX_VIDEOS);
                }
                return newVideos;
            });
            
            if (videos.length + data.items.length < MAX_VIDEOS) {
                setNextPageToken(data.nextPageToken);
                if (!data.nextPageToken) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading videos:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, nextPageToken, videos.length]);

    useEffect(() => {
        if (videos.length === 0 && !initialLoadRef.current) {
            initialLoadRef.current = true;
            loadVideos();
        }
    }, [loadVideos, videos.length]);

    useEffect(() => {
        if (loading || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadVideos();
                }
            },
            { threshold: 0.1 }
        );

        observerRef.current = observer;

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadVideos, loading, hasMore]);

    return (
        <div className="w-full max-w-[1800px]">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['All', 'Music', 'Gaming', 'News', 'Live', 'Sports', 'Learning', 'Fashion'].map((category) => (
                    <Link
                        key={category}
                        to="/"
                        className={`px-5 py-1.5 rounded-full text-sm font-light whitespace-nowrap transition-all duration-200 ${
                            category === 'All'
                                ? 'bg-zinc-800 text-white border border-zinc-700'
                                : 'bg-zinc-900/50 text-gray-400 hover:bg-zinc-800/50 hover:text-gray-300 border border-zinc-800'
                        }`}
                    >
                        {category}
                    </Link>
                ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((video, index) => (
                    <Link key={`${video.id}-${index}`} to={`/watch/${video.id}`} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl mb-3 bg-[#272727]">
                            <img 
                                src={video.snippet.thumbnails.medium.url} 
                                alt={video.snippet.title} 
                                className="w-full aspect-video object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-white border border-zinc-600">
                                {video.snippet.channelTitle[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white text-sm font-medium line-clamp-2 mb-1 group-hover:text-gray-200 transition-colors">
                                    {video.snippet.title}
                                </h3>
                                <p className="text-gray-400 text-xs hover:text-gray-300 transition-colors">
                                    {video.snippet.channelTitle}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mt-8">
                    {Array(8).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-800 h-40 rounded-xl"></div>
                            <div className="bg-gray-700 h-4 mt-3 w-3/4 rounded"></div>
                            <div className="bg-gray-700 h-4 mt-2 w-1/2 rounded"></div>
                        </div>
                    ))}
                </div>
            )}

            <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                {!hasMore && videos.length > 0 && (
                    <div className="text-gray-500 text-sm py-8">
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            You've reached the end
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeScroll;
