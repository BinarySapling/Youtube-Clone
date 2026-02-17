import React from 'react'
import NavBar from './components/NavBar'
import './App.css'
import SideBar from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <>
    <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/watch/:id' element={<Watch/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </Layout>
    </>
  )
}

export default App
