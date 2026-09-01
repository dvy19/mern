import React, { useState, useEffect } from 'react';
import NgoCard from '../../components/ngo'
import './home.css';
import { useNavigate } from 'react-router-dom';

import {ngoService} from '../../service/ngoService'

const Home = () => {

  const [ngo, setNgo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const navigate=useNavigate()

  const getNgo = async () => {
    setLoading(true);
    setError(false);

    try {

      const data = await ngoService.getAllNGo();
      setNgo(data.ngos);
      console.log(data.ngos)

      navigate("/home")



    } catch (err) {
      console.log(`${err}`);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNgo();
  }, []);

  return (
    <section className="home-section">
      <h2 className="home-title">Featured NGOs</h2>

      {loading && <p className="status-message">Loading NGOs...</p>}
      {error && <p className="status-message error">Failed to load NGOs. Please try again later.</p>}

      {!loading && !error && (
        <div className="ngo-list-horizontal">
          {ngo.map((item) => (
            <NgoCard 
              key={item._id || item.id} 
              name={item.name} 
              logo={item.logo}
              id={item._id || item.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;