
import  './JoinDetails.css'
import {ngoService} from '../../service/ngoService'
import { useState , useEffect } from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import authService from '../../service/authService';

const JoinDetails=()=>{

    const {userId}=useParams();
    const {campaignId}=useParams()

    const {requestId}=useParams()

    console.log(" req id from path :",requestId)

    console.log(userId)

    const[camp,setCamp]=useState({})


    const navigate=useNavigate()

    /*
    {"camp":{"_id":"6a94df444fb332ba6f4d06a4","title":"faldaar","description":"plantation drive","category":"plant","active":true,"location":"kanput nearby","ngo":"6a94dce76fd4d050181bcfce","__v":0}}
    */

    

    const getCamp=async()=>{

        try{

            const data=await ngoService.getSingleCamp(campaignId)

            console.log(data.camp)
            setCamp(data.camp)


        }
        catch(err){
            console.log(`${err}`)
        }
    }

    const[user,setUser]=useState({})

    const getUser=async()=>{

        try{

            console.log("from try : ",userId)

            const data=await authService.getUserById(userId)

            setUser(data.user)

            console.log(data)
        }
        catch(err){
            console.log(`${err}`)
        }
    }

    const accept=async()=>{


        console.log("request id :",requestId)

        try{
            const data=await ngoService.acceptJoin(requestId)
            console.log(data)
        }
        catch(err){
            console.log(`${err.message}`)
        }
    }

    useEffect(()=>{
        getCamp()
    } , [campaignId])

    useEffect(()=>{
        getUser()
    } , [userId])

    const toJoin=()=>{
      navigate(`/join/${camp._id}`)
      console.log(`/join/${camp._id}`)
    }
 

  return (
    <div className='main'>

         <div className="profile-card">
      {/* Header / Avatar */}
      <div className="card-header">
        <div className="avatar-container">

          
                <div className="image-preview">
                  <img
                    src={user.profile}
                    alt="Profile Preview"
                  />
                </div>
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
         <button type="button" className="btn btn-edit" onClick={accept} >
          Accept 
        </button>
        <button type="button" className="btn btn-delete">

            Reject 

        </button>
       
      </div>
      </div>

        <div className="campaign-detail-card">
      <div className="campaign-detail-header">
        <span className="campaign-detail-category">{camp.category}</span>
        <span className={`campaign-detail-status ${camp.active ? 'active' : 'ended'}`}>
          {camp.active ? 'Active' : 'Ended'}
        </span>
      </div>

      <h2 className="campaign-detail-title">{camp.title}</h2>

      <div className="campaign-detail-info">
        <p className="campaign-detail-item">
          {/*If camp.ngo exists, access title. If it doesn't exist, just return undefined instead of throwing an error.*/}
          <strong>Organized by:</strong> {camp.ngo?.title}
        </p>
        <p className="campaign-detail-item">
          <strong>Lead Contact:</strong> {camp.name}
        </p>
        <p className="campaign-detail-item">
          <strong>Location:</strong> 📍 {camp.location}
        </p>
      </div>

    </div>
    </div>
  );




}

export default JoinDetails;