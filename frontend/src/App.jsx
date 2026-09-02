import { useState } from 'react'


import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'



import {BrowserRouter , Routes, Route} from 'react-router-dom'
import NgoDetailCard from './components/NgoDetailsCard'

import CampaignDetailsCard from './pages/CampaignDetails'
import Join from './pages/join/Join'

function App() {
  

  return (
    <>

    <BrowserRouter>

      <Routes>

        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/home" element={<Home/>}/>

        <Route path='/NgoDetailsCard/:id' element={<NgoDetailCard></NgoDetailCard>}/>

        <Route path='/CampaignDetails/:id' element={<CampaignDetailsCard/>}/>

        <Route path='/profile' element={<Profile/>}/>

        <Route path='/join/:id' element={<Join/>}/>






      </Routes>
    
    
    
    </BrowserRouter>

     </>
  )
}

export default App
