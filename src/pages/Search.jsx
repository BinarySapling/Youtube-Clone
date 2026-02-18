import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchVideos } from "../api/youtube";

const Pagination = ({ currentPage, hasNext, hasPrev, onNext, onPrev }) => {
  return (
    <div className="flex justify-between items-center mt-6 pt-6 border-t border-zinc-800/50">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          hasPrev
            ? "text-white hover:bg-zinc-800"
            : "text-gray-600 cursor-not-allowed"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </button>
      
      <span className="text-sm text-gray-400">Page {currentPage}</span>
      
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          hasNext
            ? "text-white hover:bg-zinc-800"
            : "text-gray-600 cursor-not-allowed"
        }`}
      >
        <span>Next</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [nextToken, setNextToken] = useState(null);
  const [pageTokens, setPageTokens] = useState([null]);

  useEffect(() => {
    setPage(1);
    setPageTokens([null]);
    setNextToken(null);
  }, [query]);

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        const pageToken = pageTokens[page - 1];
        const data = await searchVideos(query, pageToken);
        setVideos(data.items);
        setNextToken(data.nextPageToken);
      } catch (error) {
        console.error("Error searching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      loadResults();
    }
  }, [query, page, pageTokens]);

  const handleNext = () => {
    if (nextToken) {
      setPageTokens(prev => {
        const newTokens = [...prev];
        if (newTokens[page] !== nextToken) {
          newTokens[page] = nextToken;
        }
        return newTokens;
      });
      setPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

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

export default Search;
