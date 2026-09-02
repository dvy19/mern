import React from 'react';
import './Navbar.css';

import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <a href="/">
          
          <span className="logo-text">HopeFoundation</span>
        </a>
      </div>

      {/* Center: Navigation Links */}
      <ul className="navbar-menu">
        <li><a href="#about">About Us</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#donate">Donate</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Right: Profile Button */}
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