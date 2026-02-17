import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[220px] h-[100vh] bg-black text-white flex flex-col py-4 border-r border-gray-800"> 
      <div className="flex flex-col gap-2 px-3">
        <div className="px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 font-medium">
          <Link to="/" className="block w-full h-full">
            Home
          </Link>
        </div>
        <div className="px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 font-medium">
          <Link to="/shorts" className="block w-full h-full">
            Shorts
          </Link>
        </div>
        <div className="px-4 py-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 font-medium">
          <Link to="/subscriptions" className="block w-full h-full">
            Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
