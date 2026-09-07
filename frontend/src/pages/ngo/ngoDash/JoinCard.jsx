import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinCard.css';

const JobRequestCard = ({ title, userEmail , userName, userGender , userId, campaignId, requestId}) => {

  const navigate=useNavigate()

  return (
    <div className="job-card">
      <div className="job-card-content">
        <h3 className="job-card-title">{title}</h3>
        <div className="job-card-meta">
          <span className="job-card-user">{userEmail}</span>
          <span className="job-card-divider">•</span>
          <span className="job-card-date">{userGender}</span>
        </div>
        <span className="job-card-date">{userName}</span>

      </div>
      <button className="job-card-btn"  onClick={()=>navigate(`/join-details/${userId}/${campaignId}/${requestId}`)}>
        View Details
      </button>
    </div>
  );
};

export default JobRequestCard;