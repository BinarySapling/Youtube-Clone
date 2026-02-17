import React, { useEffect, useState } from "react";
import { fetchTrendingVideos } from "../api/youtube";
import { Link } from "react-router-dom";

const Home = () => {
    const [videos,setVides] = useState([])
    useEffect(()=>{
        const loadVideos = async () =>{
            const data = await fetchTrendingVideos()
            setVides(data)
        }
        loadVideos()
    },[])
  return (
    <div className="w-full max-w-[1800px]">
      <h1 className="text-xl font-semibold text-white mb-4">Trending</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8"> 
            {videos.map((video)=>(
                <Link key={video.id} to={`/watch/${video.id}`} className="group cursor-pointer">
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
                      </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default Home;
