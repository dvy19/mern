import React, { useState } from 'react';
import './login.css';
import authService from '../service/authService';
import {useNavigate} from 'react-router-dom'
export default function Login() {
  const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('')

    const navigate=useNavigate()


  const handleSubmit =async (e) => {
    e.preventDefault()

    console.log("clicked")

    try{
        const data=await authService.login({
            name, email, password
        })

        console.log(data)
        navigate('/home')

    }
    catch(err){
        console.log(`${err}`)
    }
  };

  return (
    <div className="register-container">
      <h2>Login Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <div className="login-section">
        <p>Already have an account?</p>
        <button type="button" className="login-btn">To Login</button>
      </div>
    </div>
  );
}