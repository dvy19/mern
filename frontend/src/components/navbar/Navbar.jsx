import React from 'react';
import './Navbar.css';

import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          
          <span className="logo-text">CommmunityBridge</span>
        </a>
      </div>

      <ul className="navbar-menu">
        <li><a href="#about">Home</a></li>
        <li><a href="#projects">Blogs</a></li>
        <li><a href="#donate">Donate</a></li>
        <li><a href="#contact">About Us</a></li>
      </ul>

      <div className="navbar-profile">
        <button className="profile-btn" aria-label="User Profile">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <Link to='/profile' className='link'>Profile</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;