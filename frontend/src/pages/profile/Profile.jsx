import React, { useEffect, useState } from 'react'

import authService from '../../service/authService'
import ProfileForm from '../../components/profile/ProfileForm'
import './Profile.css'
const Profile = () => {

    const[user,setUser]=useState({})
    const[hasProfile,setHasProfile]=useState(false)

    const getProfile=async()=>{

        try{
            const data=await authService.getUser()

            setUser(data.user)
            console.log(data.user)

            setHasProfile(true)
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
    <div>

        {!hasProfile && (
            
                <ProfileForm></ProfileForm>
            
        )}

        {hasProfile && (
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

      {/* Action Buttons */}
      <div className="card-actions">
        <button type="button" className="btn btn-edit" >
          Edit Profile
        </button>
        <button type="button" className="btn btn-delete" >
          Delete Profile
        </button>
      </div>
    </div>
        )}


      
    </div>
  )
}

export default Profile
