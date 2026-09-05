import React, { useState, useEffect } from 'react';
import NgoCard from '../../components/ngo'
import './home.css';
import { useNavigate } from 'react-router-dom';
 import Navbar from '../../components/navbar/Navbar'
import {ngoService} from '../../service/ngoService'
import CampaignCard from '../../components/CampaignCard';

const Home = () => {

  const [ngo, setNgo] = useState([]);
  const [ngoLoading, setNgoLoading] = useState(false);
const [campLoading, setCampLoading] = useState(false);

const [ngoError, setNgoError] = useState(false);
const [campError, setCampError] = useState(false);

  const [active, setActive] = useState(undefined);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


  const navigate=useNavigate()

  const getNgo = async () => {
    setNgoLoading(true);
    setNgoError(false);

    try {

      const data = await ngoService.getAllNGo();
      setNgo(data.ngos);
      console.log(data.ngos)

      navigate("/home")



    } catch (err) {
      console.log(`${err}`);
      setNgoError(true);
    } finally {
      setNgoLoading(false);
    }
  };

  useEffect(() => {
    getNgo();
  }, []);

  const[camp,setCamp]=useState([]);
  
  const getCamp = async () => {
    try {
        setCampLoading(true);
        setCampError(false);

        const data = await ngoService.getAllCampaigns(
            active,
            undefined,   // ngoId
            page,
            5
        );

        setCamp(data.campaign);
        setTotalPages(data.totalPages);

        console.log(data);

    } catch (error) {
        console.log(error);
        setCampError(true);
    } finally {
        setCampLoading(false);
    }
};
  useEffect(() => {
    getCamp();
}, [active, page]);
  

  return (
   <>
   <Navbar></Navbar>
    <section className="home-section">
      
      <h2 className="home-title">Featured NGOs</h2>

      {ngoLoading && <p className="status-message">Loading NGOs...</p>}
      {ngoError && <p className="status-message error">Failed to load NGOs. Please try again later.</p>}

      {!ngoLoading && !ngoError && (
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

      <h2 className="home-title">Featured Campaigns</h2>

      {campLoading && <p className="status-message">Loading Campaigns...</p>}
      {campError && <p className="status-message error">Failed to load Campaigns. Please try again later.</p>}

      <button className='btn-header' onClick={()=>getCamp(true)}>Active</button>
      <button className='btn-header' onClick={()=>getCamp()}>All</button>

      {!campLoading && !campError && (
        <>

        <div className="ngo-list-horizontal">
          {camp.map((item) => (
              <CampaignCard
                key={item._id}
                camp={item}
              />
          ))}
        </div>

         <div className="pagination">

            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button>

            <span>
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button>

        </div>
        </>

        
      )}
    </section>
   </>
  );
};

export default Home;