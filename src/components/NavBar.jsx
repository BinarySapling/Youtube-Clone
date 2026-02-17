import React from 'react'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between px-6 py-4 bg-black text-white shadow-lg border-b border-gray-800'>
      <h1 className='text-2xl font-bold text-white cursor-pointer hover:text-gray-300 transition-colors'>MediaPlatform</h1>
      <input 
        type="search" 
        name="search" 
        id="search" 
        placeholder="Search..."
        className='px-4 py-2 w-96 bg-gray-900 text-white border-2 border-gray-700 rounded-full placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors'
      />
      <div className='flex items-center gap-6'>
        <p className='cursor-pointer hover:text-gray-400 font-medium transition-colors'>Upload</p>
        <p className='cursor-pointer hover:text-gray-400 font-medium transition-colors'>Profile</p>
      </div>
    </div>
  )
}

export default NavBar
