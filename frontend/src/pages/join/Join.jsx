import React from 'react'
import {useState, useEffect} from 'react'

import authService from '../../service/authService'
import ProfileForm from '../../components/profile/ProfileForm'
import '../profile/Profile.css'

import './Join.css'
import { ngoService } from '../../service/ngoService'
import { useNavigate, useParams } from 'react-router-dom'

const Join = () => {

    const {id}=useParams()

    const navigate=useNavigate()

    console.log(id)

  
    const[user,setUser]=useState({})
    const[hasProfile,setHasProfile]=useState(false)

    const getProfile=async()=>{

        try{
            const data=await authService.getUser(id)

            setUser(data.user)
            console.log(data.user)

            setHasProfile(true)
        }
        catch(err){
            setHasProfile(false)
            console.log(`${err.message}`)
        }
    }

    const sendJoin=async()=>{

      try{
        const res=await ngoService.createJoin(id)

        console.log(res)
      }
    
  catch(err){
            setHasProfile(false)
            console.log(`${err.message}`)
        }
    }

    useEffect(()=>{
        getProfile()
    } , [])

  return (
    <div className='main-join'>
      
            <div className="profile-card">
      {/* Header / Avatar */}
      <div className="card-header">
        <div className="avatar-container">
           
        </div>
        <h3 className="user-name">{user.name || 'Anonymous User'}</h3>
        <span className="user-city">{user.city || 'Location N/A'}</span>
      </div>

      {/* Profile Details Grid */}
      <div className="card-body">
        <div className="detail-item">
          <span className="detail-label">Gender</span>
          <span className="detail-value">{user.gender || '—'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Age</span>
          <span className="detail-value">{user.age ? `${user.age} yrs` : '—'}</span>
        </div>
        <div className="detail-item full-width">
          <span className="detail-label">Qualification</span>
          <span className="detail-value">{user.qualification || '—'}</span>
        </div>
      </div>

     
    </div>

          
      <div className="message-section">
        <label htmlFor="user-message" className="message-label">
          Enter a message for us
        </label>
        <textarea
          id="user-message"
          className="message-textarea"
          placeholder="Write your thoughts, feedback, or queries here..."
          rows="4"
        />
        <button type="button" className="message-submit-btn" onClick={sendJoin}>
          Send Join Request
        </button>

        
        <button type="button" className="message-submit-btn" onClick={()=>{navigate('/test-socket')}}>
          Send Join Request
        </button>
      </div>
      
    </div>
  )
}

export default Join
