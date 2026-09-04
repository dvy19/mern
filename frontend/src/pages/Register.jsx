import React, { useState } from 'react';
import './register.css';

import authService from '../service/authService'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  
    const[role,setRole]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')

    const navigate=useNavigate()


  const handleSubmit =async (e) => {
    e.preventDefault()

    console.log("clicked")

    try{
        const data=await authService.register({
            role, email, password
        })

        console.log(data)

        if(role==='user'){
          navigate('/home')
        }
        else if(role==='ngo'){
          navigate('/ngo-details')
        }
        else{
          windows.alert("choose role = user or ngo")
        }

    }
    catch(err){
        console.log(`${err}`)
    }
  };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="user">User</option>
              <option value="ngo">NGO</option>
            </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
    <label htmlFor="password">Password:</label>
    <div className="password-wrapper">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="button"
        className="toggle-password-btn"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          /* Eye Slash Icon (Hide) */
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          /* Eye Icon (Show) */
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  </div>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
      </form>

      <div className="login-section">
        <p>Already have an account?</p>
        <button type="button" className="login-btn">To Login</button>
      </div>

     
    </div>
  );
}