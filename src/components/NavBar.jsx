import React from 'react'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between px-6 py-4 bg-white shadow-md'>
      <h1 className='text-2xl font-bold text-blue-600 cursor-pointer'>MediaPlatform</h1>
      <input 
        type="search" 
        name="search" 
        id="search" 
        placeholder="Search..."
        className='px-4 py-2 w-96 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors'
      />
      <div className='flex items-center gap-6'>
        <p className='cursor-pointer hover:text-blue-600 font-medium transition-colors'>Upload</p>
        <p className='cursor-pointer hover:text-blue-600 font-medium transition-colors'>Profile</p>
      </div>
    </div>
  )
}

export default NavBar
