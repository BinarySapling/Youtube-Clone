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
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Trending Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"> 
            {videos.map((video)=>(
                <Link key={video.id} to={`/watch/${video.id}`} className="group">
                    <div className="relative overflow-hidden rounded-lg">
                        <img src={video.snippet.thumbnails.medium.url} alt="" className="rounded-lg w-full group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <p className="text-white mt-2 line-clamp-2 group-hover:text-orange-500 transition-colors">{video.snippet.title}</p>
                </Link>
            ))}
        </div>
    </div>
  );
};

export default Home;
