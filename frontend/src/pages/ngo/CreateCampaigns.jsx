import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ngoService } from '../../service/ngoService';


const CreateCampaign = () => {
  const [campData, setCampData] = useState({
    title: '',
    description: '',
    active: '',
    category: '',
    location: '',
    active:true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{

        const res=await ngoService.createCampaign(campData)
        console.log(res)


        navigate(-1)
        

        

    }
    catch(err){
        console.error("CREATE CAMPAIGN ERROR:", err);
    console.error("Response:", err.response?.data);
    console.error("Status:", err.response?.status);
        console.log(`${err}`)
    }
   
};

  return (
    <div className="ngo-container">
      <form className="ngo-form" onSubmit={handleSubmit}>
        <h2 className="ngo-form-title">Campaign Details</h2>

        {/* NGO Name */}
        <div className="ngo-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Hope Foundation"
            value={campData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tagline / Title */}
        <div className="ngo-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="e.g. Empowering Local Communities"
            value={campData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category & Established Year */}
        <div className="ngo-row">
          <div className="ngo-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={campData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="environment">Environment</option>
              <option value="poverty-relief">Poverty Relief</option>
              <option value="animal-welfare">Animal Welfare</option>
              <option value="women-empowerment">Women Empowerment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="ngo-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="City"
              value={campData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        

        {/* Submit Button */}
        <button type="submit" className="ngo-submit-btn" onClick={handleSubmit}>
            Create
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;