import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [search, setSearch] = useState("")
  const [searchHistory, setSearchHistory] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)
  
  const saveToHistory = (query) => {
    const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }
  
  const handleSearch = (e) => {
    if(e.key === "Enter" && search.trim() !== ""){
      saveToHistory(search.trim())
      navigate(`/search?q=${search.trim()}`)
      setSearch("")
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion)
    navigate(`/search?q=${suggestion}`)
    setShowSuggestions(false)
  }

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || []
    setSearchHistory(stored)
  },[])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
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
    <div className='flex items-center justify-between px-6 py-3 bg-[#0f0f0f] text-white border-b border-zinc-800'>
      <Link to="/" className='text-xl font-semibold text-orange-500 hover:text-orange-400 transition-colors'>
        MediaTube
      </Link>
      
      <div className='flex-1 max-w-2xl mx-8 relative' ref={searchRef}>
        <input 
          type="search" 
          name="search" 
          id="search" 
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          onFocus={() => setShowSuggestions(true)}
          className='w-full px-4 py-2 bg-[#121212] text-white border border-zinc-700 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors' 
        />
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className='absolute top-full mt-2 w-full bg-[#212121] rounded-lg shadow-lg border border-zinc-700 overflow-hidden z-50'>
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className='px-4 py-3 hover:bg-[#3a3a3a] cursor-pointer text-sm text-gray-200 transition-colors flex items-center gap-3'
              >
                <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className='flex items-center gap-6'>
        <Link to="/upload" className='text-sm hover:text-orange-500 transition-colors'>
          Upload
        </Link>
        <Link to="/profile" className='w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-semibold hover:bg-orange-600 transition-colors'>
          U
        </Link>
      </div>
    </div>
  )
}

export default NavBar
