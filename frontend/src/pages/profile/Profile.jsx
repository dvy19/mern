import React, { useEffect, useState } from 'react'

import authService from '../../service/authService'
import ProfileForm from '../../components/profile/ProfileForm'
import './Profile.css'
import '../../components/profile/ProfileForm.css'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
const Profile = () => {

  const [formData, setFormData] = useState({
      name: '',
      city: '',
      gender: '',
      age: 0,
      qualification: '',
    });
  
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
  
        console.log(file)
  
        if (!file) return;
  
        setProfileImage(file);
  
        // create preview
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    };

    const[user,setUser]=useState({})
    const[hasProfile,setHasProfile]=useState(false)

    const navigate=useNavigate()

    const[edit,setEdit]=useState(false)

    const onEdit=()=>{
      setFormData({
        name: user.name || '',
        city: user.city || '',
        gender: user.gender || '',
        age: user.age || '',
        qualification: user.qualification || '',
    });

    setPreview(user.profile || null);
    setEdit(true);
    }

    const onCancel=()=>{
      setEdit(false)
    }

    const editProfile = async (e) => {
    e.preventDefault();

    try {
        const data = new FormData();

        data.append("name", formData.name);
        data.append("city", formData.city);
        data.append("gender", formData.gender);
        data.append("age", formData.age);
        data.append("qualification", formData.qualification);

        if (profileImage) {
            data.append("profile", profileImage);
        }

        const response = await authService.editUser(data);

        console.log(response);

        setUser(response.data);
        setEdit(false);

        window.alert("Profile updated successfully!");

    } catch (err) {
        console.log(err);
        window.alert(
            err.response?.data?.message
        );
    }
};
    
    const deleteProfile=async()=>{

      try{
        const data=await authService.deleteUser()
        console.log(data)
        setHasProfile(false)
      }
      catch(err){
        console.log(`${err}`)
      }
    }

    const getProfile=async()=>{

        try{
            const data=await authService.getUser()

            setUser(data.user)
            console.log(data.user)

            setHasProfile(true)
        }
        catch(err){
            setHasProfile(false)
            console.log(`${err.message}`)
        }
    }

    

    useEffect(()=>{
        getProfile()
    } , [])


  return (
    <div>
      <Navbar></Navbar>

      <button className="back" onClick={()=>navigate('/home')}>Back</button>

        {!hasProfile && (
            
                <ProfileForm></ProfileForm>
            
        )}

        {hasProfile && (
            <div className="profile-card">
      {/* Header / Avatar */}
      <div className="card-header">
        <div className="avatar-container">

          
                <div className="image-preview">
                  <img
                    src={user.profile}
                    alt="Profile Preview"
                  />
                </div>
        </div>
        
        <h3 className="user-name">{user.name || 'Anonymous User'}</h3>
        <span className="user-city">{user.city || 'Location N/A'}</span>
      </div>

      {/* Profile Details Grid */}
      <div className="card-body">
        <div className="detail-item">
          <span className="detail-label">Gender</span>
          <span className="detail-value">{user.gender || '—'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Age</span>
          <span className="detail-value">{user.age ? `${user.age} yrs` : '—'}</span>
        </div>
        <div className="detail-item full-width">
          <span className="detail-label">Qualification</span>
          <span className="detail-value">{user.qualification || '—'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button type="button" className="btn btn-edit" onClick={onEdit} >
          Edit Profile
        </button>
        <button type="button" className="btn btn-delete" onClick={deleteProfile} >
          Delete Profile
        </button>
      </div>
    </div>
        )}


        {edit && (
          <div className="form-wrapper">
      <form className="profile-form" onSubmit={editProfile} >
        <h2 className="form-title">Profile Details</h2>

        <div className="form-group">
            <label htmlFor="profile">Profile Picture</label>

            <input
              type="file"
              id="profile"
              name="profile"
              accept="image/*"
              onChange={handleImageChange}
              
            />
        </div>

        {preview && (
                <div className="image-preview">
                  <img
                    src={preview}
                    alt="Profile Preview"
                  />
                </div>
        )}

        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={user.name}
            value={formData.name}
            onChange={handleChange}
            
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
              placeholder={user.city}
              value={formData.city}
              onChange={handleChange}
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder={user.age}
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name={user.gender}
            value={formData.gender}
            onChange={handleChange}
            
          >
            <option value={user.gender} disabled>Select Gender</option>
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
            
          >
            <option value={user.qualification} disabled>Select Qualification</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Pursuing UG">Pursuing UG</option>
            <option value="Graduate">Graduate</option>
            <option value="PG">PG</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" >
          Edit Profile
        </button>

        <button type="button" className="submit-btn" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
        )
        }

      
    </div>
  )
}

export default Profile
