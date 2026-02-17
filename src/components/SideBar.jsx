import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[220px] h-[100vh] bg-black text-white flex flex-col py-4 border-r border-orange-600"> 
      <div className="flex flex-col gap-2 px-3">
        <Link to="/" className="px-4 py-3 rounded-lg hover:bg-orange-600 hover:text-white cursor-pointer transition-all duration-200 font-medium">
          Home
        </Link>
        <Link to="/shorts" className="px-4 py-3 rounded-lg hover:bg-orange-600 hover:text-white cursor-pointer transition-all duration-200 font-medium">
          Shorts
        </Link>
        <Link to="/subscriptions" className="px-4 py-3 rounded-lg hover:bg-orange-600 hover:text-white cursor-pointer transition-all duration-200 font-medium">
          Subscriptions
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
