import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[240px] h-[100vh] bg-[#0f0f0f] text-white flex flex-col py-4 border-r border-zinc-800"> 
      <div className="flex flex-col gap-1 px-3">
        <Link to="/" className="px-4 py-2.5 rounded-lg hover:bg-[#272727] transition-colors text-sm">
          Home
        </Link>
        <Link to="/" className="px-4 py-2.5 rounded-lg hover:bg-[#272727] transition-colors text-sm">
          Trending
        </Link>
        <Link to="/upload" className="px-4 py-2.5 rounded-lg hover:bg-[#272727] transition-colors text-sm">
          Upload
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
