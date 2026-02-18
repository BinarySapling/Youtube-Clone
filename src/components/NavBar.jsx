import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [search, setSearch] = useState("")
  const [searchHistory, setSearchHistory] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)
  
  const saveToHistory = (query) => {
    const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }
  
  const performSearch = () => {
    if (search.trim() !== "") {
      saveToHistory(search.trim())
      navigate(`/search?q=${search.trim()}`)
      setSearch("")
      setShowSuggestions(false)
      setIsFocused(false)
    }
  }
  
  const handleSearch = (e) => {
    if(e.key === "Enter"){
      performSearch()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion)
    navigate(`/search?q=${suggestion}`)
    setShowSuggestions(false)
    setIsFocused(false)
  }

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || []
    setSearchHistory(stored)
  },[])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const filteredSuggestions = useMemo(()=>{
    if (!search.trim()) return searchHistory.slice(0, 5)
    return searchHistory.filter(item=> item.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
  },[search, searchHistory])
  
  return (
    <nav className='sticky top-0 z-50 flex items-center justify-between px-8 md:px-6 py-2.5 bg-[#0f0f0f]/95 backdrop-blur-md text-white border-b border-zinc-800/50 shadow-lg'>
      <Link to="/" className='flex items-center gap-2 group min-w-fit'>
        <span className='text-lg font-medium hidden sm:flex items-center gap-2 tracking-tight'>
          <span className='text-white'>Vid</span><span className='text-violet-500'>Stream</span>
          <svg className='w-5 h-5 text-violet-500' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M8 5v14l11-7z'/>
          </svg>
        </span>
        <span className='text-lg font-medium sm:hidden flex items-center gap-1.5'>
          <span className='text-white'>Vid</span><span className='text-violet-500'>Stream</span>
          <svg className='w-4 h-4 text-violet-500' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M8 5v14l11-7z'/>
          </svg>
        </span>
      </Link>
      
      <div className='flex-1 max-w-2xl mx-4 md:mx-8 relative' ref={searchRef}>
        <div className={`flex items-center bg-[#121212] border rounded-full overflow-hidden transition-all duration-200 ${
          isFocused ? 'border-violet-600/50' : 'border-zinc-800 hover:border-zinc-700'
        }`}>
          <input 
            type="search" 
            name="search" 
            id="search" 
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => {
              setShowSuggestions(true)
              setIsFocused(true)
            }}
            className='flex-1 px-4 py-2 bg-transparent text-white placeholder-gray-600 focus:outline-none text-sm' 
          />
          <button 
            onClick={performSearch}
            className='px-4 py-2 hover:bg-zinc-800/50 transition-colors group'
            aria-label='Search'
          >
            <svg className='w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </button>
        </div>
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className='absolute top-full mt-2 w-full bg-[#212121] rounded-xl shadow-2xl shadow-black/50 border border-zinc-700/50 overflow-hidden z-50 backdrop-blur-xl'>
            <div className='py-2'>
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className='px-4 py-2.5 hover:bg-zinc-800/80 cursor-pointer text-sm text-gray-200 transition-all duration-150 flex items-center gap-3 group'
                >
                  <svg className='w-4 h-4 text-gray-500 group-hover:text-violet-400 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <span className='group-hover:text-white transition-colors'>{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className='flex items-center gap-3 min-w-fit'>
        <Link 
          to="/upload" 
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-800/60 transition-all duration-200 group'
          aria-label='Upload video'
        >
          <svg className='w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
          </svg>
          <span className='text-xs font-normal text-gray-400 group-hover:text-gray-200 transition-colors hidden lg:inline'>Upload</span>
        </Link>
        
        <button className='p-2 rounded-full hover:bg-zinc-800 transition-all duration-300 group relative' aria-label='Notifications'>
          <svg className='w-6 h-6 text-gray-400 group-hover:text-white transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
          </svg>
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0f0f0f]'></span>
        </button>
        
        <Link 
          to="/profile" 
          className='w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold hover:bg-zinc-600 transition-colors border border-zinc-600'
          aria-label='Profile'
        >
          U
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
