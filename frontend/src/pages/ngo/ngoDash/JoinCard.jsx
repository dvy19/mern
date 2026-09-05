import React from 'react';
import './JoinCard.css';

const JobRequestCard = ({ title, userEmail , userName, userGender}) => {
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
      <button className="job-card-btn" >
        View Details
      </button>
    </div>
  );
};

export default JobRequestCard;