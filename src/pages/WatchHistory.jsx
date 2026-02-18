import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const WatchHistory = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("watchHistory")) || []
        setHistory(stored)
    }, [])

    function clearHistory() {
        localStorage.removeItem("watchHistory")
        setHistory([])
    }

    return (
        <div className="w-full max-w-[1800px]">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl md:text-2xl font-semibold text-white">Watch History</h1>
                {history.length > 0 && (
                    <button 
                        onClick={clearHistory}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                    >
                        Clear History
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="text-center py-20">
                    <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl text-gray-400 mb-2">No watch history</h2>
                    <p className="text-gray-500 text-sm">Videos you watch will appear here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                    {history.map((video, index) => (
                        <Link key={index} to={`/watch/${video.id}`} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl mb-3 bg-[#272727]">
                                <img 
                                    src={video.thumbnail} 
                                    alt={video.title} 
                                    className="w-full aspect-video object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm font-semibold text-white">
                                    {video.channelTitle ? video.channelTitle[0].toUpperCase() : 'V'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white text-sm font-medium line-clamp-2 mb-1 group-hover:text-gray-200 transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs hover:text-gray-300 transition-colors">
                                        {video.channelTitle}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        Watched {new Date(video.watchedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default WatchHistory
