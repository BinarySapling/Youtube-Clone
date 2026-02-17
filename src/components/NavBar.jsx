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
    <div className='flex items-center justify-between px-4 py-3 bg-black text-white border-b border-zinc-800'>
      <Link to="/" className='text-xl font-semibold text-orange-500 hover:text-orange-400 transition-colors'>
        MediaTube
      </Link>
      <input type="search" name="search" id="search" placeholder="Search"
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
        onKeyDown={handleSearch}
       className='px-4 py-2 w-96 bg-zinc-900 text-white border border-zinc-700 rounded-full placeholder-gray-400 focus:outline-none focus:border-zinc-500 transition-colors' />
      <div className='flex items-center gap-6'>
        <Link to="/upload" className='text-sm hover:text-orange-500 transition-colors'>
          Upload
        </Link>
        <Link to="/profile" className='w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-semibold'>
          U
        </Link>
      </div>
    </div>
  )
}

export default NavBar
