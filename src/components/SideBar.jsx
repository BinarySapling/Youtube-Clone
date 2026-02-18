import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      section: "Main",
      items: [
        {
          name: "Home",
          path: "/",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          )
        },
        {
          name: "Trending",
          path: "/trending",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          )
        },
        {
          name: "Explore",
          path: "/explore",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          )
        }
      ]
    },
    {
      section: "Library",
      items: [
        {
          name: "Watch History",
          path: "/history",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          )
        },
        {
          name: "Liked Videos",
          path: "/liked",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          )
        },
        {
          name: "Playlists",
          path: "/playlists",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          )
        }
      ]
    },
    {
      section: "Content",
      items: [
        {
          name: "Upload",
          path: "/upload",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
            </svg>
          )
        }
      ]
    }
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-60 h-screen bg-[#0f0f0f] text-white flex flex-col border-r border-zinc-800/50 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      <div className="flex flex-col py-3 px-3 space-y-1">
        {menuItems.map((section, index) => (
          <div key={section.section}>
            {/* Section Header */}
            {index > 0 && <div className="h-px bg-zinc-800 my-3 mx-2"></div>}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.section}
            </div>
            
            {/* Menu Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-4 px-3 py-2.5 rounded-xl font-medium text-sm
                    transition-all duration-300 group relative overflow-hidden
                    ${isActive(item.path)
                      ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/30 shadow-lg shadow-orange-500/10'
                      : 'text-gray-300 hover:bg-zinc-800/80 hover:text-white border border-transparent'
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {isActive(item.path) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-r-full"></div>
                  )}
                  
                  {/* Icon */}
                  <span className={`
                    transition-all duration-300 flex-shrink-0
                    ${isActive(item.path)
                      ? 'text-orange-500 scale-110'
                      : 'text-gray-400 group-hover:text-orange-500 group-hover:scale-110'
                    }
                  `}>
                    {item.icon}
                  </span>
                  
                  {/* Label */}
                  <span className="flex-1 whitespace-nowrap">
                    {item.name}
                  </span>
                  
                  {/* Hover Effect */}
                  {!isActive(item.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Section */}
      <div className="mt-auto p-4 border-t border-zinc-800/50">
        <div className="text-xs text-gray-500 space-y-2">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="#" className="hover:text-gray-300 transition-colors">About</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Press</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          </div>
          <p className="text-gray-600 mt-3">© 2026 MediaTube</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
