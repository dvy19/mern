import React, { useEffect, useState } from 'react';
import './CampaignDetails.css';

import{ ngoService }from '../service/ngoService'

import {useParams} from 'react-router-dom'
export default function CampaignDetailCard() {

    const[camp,setCamp]=useState({})

    const {id}=useParams()

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
          <strong>Organized by:</strong> {camp.ngo}
        </p>
        <p className="campaign-detail-item">
          <strong>Lead Contact:</strong> {camp.name}
        </p>
        <p className="campaign-detail-item">
          <strong>Location:</strong> 📍 {camp.location}
        </p>
      </div>
    </div>
  );
}