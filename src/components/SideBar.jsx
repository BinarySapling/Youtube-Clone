import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
   
    {
      name: "Trending",
      path: "/",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      name: "Watch History",
      path: "/history",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: "Liked Videos",
      path: "/liked",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      name: "Upload",
      path: "/upload",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    }
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-60 h-screen bg-[#0f0f0f] text-white flex flex-col border-r border-zinc-800 overflow-y-auto">
      <div className="flex flex-col p-3 gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isActive(item.path)
                ? 'bg-zinc-800 text-white'
                : 'text-gray-400 hover:bg-zinc-800/50 hover:text-white'
              }
            `}
          >
            <span className={isActive(item.path) ? 'text-orange-500' : ''}>
              {item.icon}
            </span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="mt-auto p-4 border-t border-zinc-800">
        <p className="text-xs text-gray-600">© 2026 MediaTube</p>
      </div>
    </aside>
  );
};

export default Sidebar;
