import React, { useState } from 'react';
import './ProfileForm.css';
import authService from '../../service/authService';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    gender: '',
    age: 0,
    qualification: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
        const data=await authService.createUser(formData)

        console.log(`${data.message}`)
    }
    
        catch(err){
            console.log(`${err}`)
        }
   
  };

  return (
    <div className="form-wrapper">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Profile Details</h2>

        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* City & Age (Two-column row) */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="e.g. New York"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="e.g. 25"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Qualification Selection */}
        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Qualification</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Pursuing UG">Pursuing UG</option>
            <option value="Graduate">Graduate</option>
            <option value="PG">PG</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;