import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchVideos } from "../api/youtube";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const loadResults = async () => {
      const data = await searchVideos(query);
      setVideos(data);
    };
    loadResults();
  }, [query]);
  
  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-6">
        Search Results for "{query}"
      </h1>
      <div className="grid grid-cols-4 gap-6">
        {videos.map((video) => (
          <Link key={video.id.videoId} to={`/watch/${video.id.videoId}`} >
            <img src={video.snippet.thumbnails.medium.url} className="rounded-lg"/>
            <p className="mt-2 text-sm font-semibold">
              {video.snippet.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
