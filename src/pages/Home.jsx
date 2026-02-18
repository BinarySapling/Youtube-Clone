import React, { useEffect, useState } from "react";
import { fetchTrendingVideos } from "../api/youtube";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, hasNext, hasPrev, onNext, onPrev }) => {
    return (
        <div className="flex justify-center items-center gap-4 mt-8 mb-4">
            <button
                onClick={onPrev}
                disabled={!hasPrev}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasPrev
                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
            >
                Previous
            </button>
            <span className="text-white font-medium">Page {currentPage}</span>
            <button
                onClick={onNext}
                disabled={!hasNext}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasNext
                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
            >
                Next
            </button>
        </div>
    );
};

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [videos, setVides] = useState([])
    const [page, setPage] = useState(1)
    const [nextToken, setNextToken] = useState(null)
    const [pageTokens, setPageTokens] = useState([null]) // Track tokens for each page

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true)
            const pageToken = pageTokens[page - 1]
            const data = await fetchTrendingVideos(pageToken)
            setVides(data.items)
            setNextToken(data.nextPageToken)
            setLoading(false)
        }
        loadVideos()
    }, [page, pageTokens])

    const handleNext = () => {
        if (nextToken) {
            setPageTokens(prev => {
                const newTokens = [...prev]
                if (newTokens[page] !== nextToken) {
                    newTokens[page] = nextToken
                }
                return newTokens
            })
            setPage(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }
    return (
        <div className="w-full max-w-[1800px]">
            <h1 className="text-xl font-semibold text-white mb-4">Trending</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {loading
                    ? Array(12).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-800 h-40 rounded-lg"></div>
                            <div className="bg-gray-700 h-4 mt-3 w-3/4 rounded"></div>
                            <div className="bg-gray-700 h-4 mt-2 w-1/2 rounded"></div>
                        </div>
                    ))
                    : videos.map((video) => (
                        <Link key={video.id} to={`/watch/${video.id}`} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl mb-3 bg-[#272727]">
                                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full aspect-video object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm font-semibold text-white">
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
            {!loading && videos.length > 0 && (
                <Pagination
                    currentPage={page}
                    hasNext={!!nextToken}
                    hasPrev={page > 1}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </div>
    );
};

export default Home;
