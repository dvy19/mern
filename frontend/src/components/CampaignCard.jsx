import React from 'react';
import './campaignCard.css';
import { ngoService } from '../service/ngoService';
import { useNavigate } from 'react-router-dom';

export default function CampaignCard({camp}) {

  const navigate=useNavigate()
    
  /*
  active: true
category: "plant"
description: "plantation drive"
location: "kanput nearby"
ngo: "6a94dce76fd4d050181bcfce"
title: "faldaar"
_id: "6a94df444fb332ba6f4d06a4"
  */


    const toCamp=()=>{
      navigate(`/CampaignDetails/${camp._id}`)
    }

  return (
    <div className="campaign-card">
      {/* Top Header: Category Tag & Status Badge */}
      <div className="campaign-card-header">
        <span className="campaign-category-tag">{camp.category}</span>
        <span className={`campaign-status-badge ${camp.active ? 'active' : 'completed'}`}>
          {camp.active ? 'Active' : 'Ended'}
        </span>
      </div>

      {/* Campaign Details */}
      <div className="campaign-card-body">
        <h3 className="campaign-title">{camp.name}</h3>
        
        {/* NGO Info Link Button */}
        <div className="campaign-ngo-row">
          
          <button 
            type="button" 
            className="btn-view-ngo" 
            //onClick={onViewNgo}
            title="View NGO profile"
          >
            View NGO
          </button>
        </div>

        <p className="campaign-description">{camp.description}</p>

        {/* Location Indicator */}
        <div className="campaign-location">
          <span className="location-icon">📍</span>
          <span>{camp.location}</span>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="campaign-card-actions">
        <button 
          type="button" 
          className="btn-campaign-join" 
          onClick={toCamp}
          disabled={!camp.active}
        >
          Join
        </button>
        <button 
          type="button" 
          className="btn-campaign-donate" 
          //onClick={onDonate}
          disabled={!camp.active}
        >
          Donate
        </button>
      </div>
    </div>
  );
}