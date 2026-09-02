import React, { useEffect, useState } from 'react';
import './CampaignDetails.css';

import{ ngoService }from '../service/ngoService'

import {useNavigate, useParams} from 'react-router-dom'
export default function CampaignDetailCard() {

    const[camp,setCamp]=useState({})

    const {id}=useParams()

    const navigate=useNavigate()

    /*
    {"camp":{"_id":"6a94df444fb332ba6f4d06a4","title":"faldaar","description":"plantation drive","category":"plant","active":true,"location":"kanput nearby","ngo":"6a94dce76fd4d050181bcfce","__v":0}}
    */

    

    const getCamp=async()=>{

        try{

            const data=await ngoService.getSingleCamp(id)

            console.log(data.camp)
            setCamp(data.camp)


        }
        catch(err){
            console.log(`${err}`)
        }
    }

    useEffect(()=>{
        getCamp()
    } , [id])

    const toJoin=()=>{
      navigate(`/join/${camp._id}`)
      console.log(`/join/${camp._id}`)
    }
 

  return (
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

      <button onClick={toJoin}>Join</button>
    </div>
  );
}