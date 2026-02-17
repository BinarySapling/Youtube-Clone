import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchVideos } from "../api/youtube";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        const data = await searchVideos(query);
        setVideos(data);
      } catch (error) {
        console.error("Error searching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      loadResults();
    }
  }, [query]);

  if (loading) {
    return <div className="text-white p-6">Loading results...</div>;
  }
  
  return (
    <div className="w-full max-w-[1800px]">
      <h1 className="text-xl font-semibold text-white mb-4">
        Search results for "{query}"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map((video) => (
          <Link key={video.id.videoId} to={`/watch/${video.id.videoId}`} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl mb-3 bg-[#272727]">
              <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title}
                className="w-full aspect-video object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
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
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(video.snippet.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {videos.length === 0 && !loading && (
        <div className="text-gray-400 text-center py-12">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default Search;
