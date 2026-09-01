import React, { useEffect, useState } from 'react';
import './NgoDetailCard.css';
import { ngoService } from '../service/ngoService';

import {useNavigate , useParams} from 'react-router-dom'



export default function NgoDetailCard() {

    const[ngo,setNgo]=useState({});
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");

    const navigate=useNavigate()

    const {id}=useParams()


    const getNgo=async()=>{

        try{
            const res=await ngoService.getSingleNgo(id)

            setNgo(res)

            console.log(res)
        }
        catch(err){
            console.log(`${err}`)
        }
    }

    useEffect(()=>{
        getNgo()
    },[id])

  /*
  {"_id":"6a94e0b30c4d27b21c54f941","name":"revamp","title":"revamp india foundation","category":"plant","bio":"kanput ngo","logo":null,"established":2021,"user":"6a94dc746fd4d050181bcfcd","__v":0}
  */
  return (
    <div className="ngo-detail-card">
      <div className="ngo-detail-header">
        <div className="ngo-detail-logo-wrapper">
          <img
            src={ 'https://via.placeholder.com/120'}
            alt={`${ngo.name} Logo`}
            className="ngo-detail-logo"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/120';
            }}
          />
        </div>

        <div className="ngo-detail-title-group">
          <div className="ngo-meta-tags">
            <span className="ngo-category-tag">{ngo.category}</span>
            <span className="ngo-established">Est. {ngo.established}</span>
          </div>
          <h2 className="ngo-detail-name">{ngo.name}</h2>
          <p className="ngo-detail-description">{ngo.description}</p>
        </div>
      </div>

      <div className="ngo-detail-body">
        <h4 className="ngo-section-title">About the Organization</h4>
        <p className="ngo-detail-bio">{ngo.bio}</p>
      </div>

      <div className="ngo-detail-actions">
        <button 
          type="button" 
          className="btn-join" 
          //onClick={onJoin}
        >
          Join Us
        </button>
        <button 
          type="button" 
          className="btn-donate" 
          //onClick={onDonate}
        >
          Donate
        </button>
      </div>
    </div>
  );
}