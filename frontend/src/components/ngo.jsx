import React from 'react';
import './ngo.css';

export default function NgoCard({ name, logo }) {
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
    </div>
  );
}