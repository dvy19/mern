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

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Name:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
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
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
      </form>

      <div className="login-section">
        <p>Already have an account?</p>
        <button type="button" className="login-btn">To Login</button>
      </div>

      <div className="login-section">
        <p>Register as an NGO</p>
        <button type="button" className="login-btn" onClick={()=>{navigate('./ngo-register')}}>To Login</button>
      </div>
    </div>
  );
}