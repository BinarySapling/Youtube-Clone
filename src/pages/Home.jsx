import React, { useEffect, useState } from "react";
import { fetchTrendingVideos } from "../api/youtube";

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
    <div>
      <h1 className="text-2xl font-bold">Trending Videos</h1>
        <div className="grid grid-cols-3 gap-6"> 
            {videos.map((video)=>(
                <div key={video.id}>
                    <img src={video.snippet.thumbnails.medium.url} alt="" className="rounded-lg" />
                    <p>{video.snippet.title}</p>
                </div>
            ))}
        </div>

    </div>
  );
};

export default Home;
