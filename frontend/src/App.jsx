import { useState } from 'react'


import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/home/Home'



import {BrowserRouter , Routes, Route} from 'react-router-dom'
import NgoDetailCard from './components/NgoDetailsCard'

function App() {
  

  return (
    <>

    <BrowserRouter>

      <Routes>

        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/home" element={<Home/>}/>

        <Route path='/NgoDetailsCard/:id' element={<NgoDetailCard></NgoDetailCard>}/>




      </Routes>
    
    
    
    </BrowserRouter>

     </>
  )
}

export default App
