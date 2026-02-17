import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between px-6 py-4 bg-black text-white shadow-lg border-b border-gray-800'>
      <Link to="/" className='text-2xl font-bold text-white cursor-pointer hover:text-gray-300 transition-colors'>
        MediaPlatform
      </Link>
      <input type="search" name="search" id="search" placeholder="Search..."
        className='px-4 py-2 w-96 bg-gray-900 text-white border-2 border-gray-700 rounded-full placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors' />
      <div className='flex items-center gap-6'>
        <Link to="/upload" className='cursor-pointer hover:text-gray-400 font-medium transition-colors'>
          Upload
        </Link>
        <Link to="/profile" className='cursor-pointer hover:text-gray-400 font-medium transition-colors'>Profile
        </Link>
      </div>
    </div>
  )
}

export default NavBar
