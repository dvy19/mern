import React, { useState } from 'react';
import './NgoDetails.css';
import { ngoService } from '../../../service/ngoService';
import { useNavigate } from 'react-router-dom';

const NgoDetails = () => {
  const [ngoData, setNgoData] = useState({
    name: '',
    title: '',
    bio: '',
    category: '',
    established: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNgoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{

        const res=await ngoService.createNgo(ngoData)
        console.log(res)


        console.log(`/ngo-dash/${res.data.id}`)

        
        console.log(res)

        navigate(`/ngo-dash/${res.data.id}`)

    }
    catch(err){
        console.log(`${err}`)
    }
   
};

  return (
    <div className="ngo-container">
      <form className="ngo-form" onSubmit={handleSubmit}>
        <h2 className="ngo-form-title">NGO Details</h2>

        {/* NGO Name */}
        <div className="ngo-group">
          <label htmlFor="name">NGO Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Hope Foundation"
            value={ngoData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tagline / Title */}
        <div className="ngo-group">
          <label htmlFor="title">Tagline / Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Empowering Local Communities"
            value={ngoData.title}
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
              value={ngoData.category}
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
            <label htmlFor="establishedYear">Established Year</label>
            <input
              type="number"
              id="establishedYear"
              name="establishedYear"
              placeholder="e.g. 2015"
              min="1800"
              max={new Date().getFullYear()}
              value={ngoData.established}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Bio / Description */}
        <div className="ngo-group">
          <label htmlFor="bio">About / Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            placeholder="Briefly describe your NGO's mission and goals..."
            value={ngoData.bio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="ngo-submit-btn" onClick={handleSubmit}>
          Save NGO Details
        </button>
      </form>
    </div>
  );
};

export default NgoDetails;