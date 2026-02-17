import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const[search,setSearch]=useState("")
  const navigate = useNavigate()
  const handleSearch = (e) =>{
    if(e.key==="Enter" ){
      navigate(`/search?q=${search}`)
    }
  }
  return (
    <div className='flex items-center justify-between px-6 py-4 bg-black text-white shadow-lg border-b border-orange-600'>
      <Link to="/" className='text-2xl font-bold text-orange-500 cursor-pointer hover:text-orange-400 transition-colors'>
        MediaPlatform
      </Link>
      <input type="search" name="search" id="search" placeholder="Search..."
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
        onKeyDownCapture={handleSearch}
       className='px-4 py-2 w-96 bg-gray-900 text-white border-2 border-orange-600 rounded-full placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all' />
      <div className='flex items-center gap-6'>
        <Link to="/upload" className='cursor-pointer hover:text-orange-500 font-medium transition-colors'>
          Upload
        </Link>
        <Link to="/profile" className='cursor-pointer hover:text-orange-500 font-medium transition-colors'>Profile
        </Link>
      </div>
    </div>
  )
}

export default NavBar
