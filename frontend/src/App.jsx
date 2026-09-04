import { useState } from 'react'


import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'



import {BrowserRouter , Routes, Route} from 'react-router-dom'
import NgoDetailCard from './components/NgoDetailsCard'

import CampaignDetailsCard from './pages/CampaignDetails'
import Join from './pages/join/Join'
import TestSocket from '../src/components/Testcomponent'
import NgoDashboard from './pages/ngo/ngoDash/NgoDashboard'

import NgoProfile from './pages/ngo/profile/NgoProfile'
import NgoDetails from './pages/ngo/details/NgoDetails'
import CreateCampaign from './pages/ngo/CreateCampaigns'

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

        <Route path='/test-socket' element={<TestSocket/>}/>

        <Route path='/ngo-dash/:id' element={<NgoDashboard/>}/>


        <Route path='/ngo-profile/:id' element={<NgoProfile/>}/>

        <Route path='/ngo-details' element={<NgoDetails/>}/>

        <Route path='/create-camp' element={<CreateCampaign/>}/>







      </Routes>
    
    
    
    </BrowserRouter>

     </>
  )
}

export default App
