import React from 'react';
import './ngo.css';
import { useNavigate } from 'react-router-dom';

export default function NgoCard({ name, logo , id }) {

  const navigate=useNavigate()

  const toNgo=()=>{
    navigate(`/NgoDetailsCard/${id}`)

  }
  return (
    <div className="ngo-card">
      <div className="ngo-logo-wrapper">
        <img 
          src={logo || 'https://via.placeholder.com/100'}
          alt={`${name || 'NGO'} Logo`} 
          className="ngo-logo"
        />
      </div>
      <h3 className="ngo-name">{name}</h3>
      <button onClick={toNgo}>View Details</button>
    </div>
  );
}