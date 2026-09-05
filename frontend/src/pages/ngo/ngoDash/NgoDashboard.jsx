import { useEffect, useState } from "react";
import socket from "../../../service/Socket";

import NgoNavbar from '../NgoNavbar'
import {  useNavigate, useParams } from "react-router-dom";
import {ngoService} from '../../../service/ngoService'

import './NgoDashboard.css'
import axios from "axios";

import JoinRequestCard from './JoinCard'

import  CampaignCard from '../../../components/CampaignCard'
import Card from '../../../components/Card'

export default function NgoDashboard() {

    const [notifications, setNotifications] = useState([]);

    const navigate=useNavigate()

    // Temporary: replace this with your actual NGO ID
    const {id}=useParams()

    const[ngo,setNgo]=useState({});

    const[camp,setCamp]=useState([])

    
    
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

        const[campCount,setCampCount]=useState(0);
    
        useEffect(()=>{
            getNgo()
        },[id])

        const getCampaigns=async(active , id)=>{
            console.log(id)

            try{
                const camp=await ngoService.getAllCampaigns(active , id)

                console.log("id send",id)

                setCamp(camp.campaign)

                console.log(camp)

                setCampCount(camp.count)
            }
            catch(err){
                console.log(`${err}`)
            }
        }

        useEffect(() => {
                if (id) {
                    getCampaigns(true, id);
                }
        }, [id]);

    
      /*
      {"_id":"6a94e0b30c4d27b21c54f941","name":"revamp","title":"revamp india foundation","category":"plant","bio":"kanput ngo","logo":null,"established":2021,"user":"6a94dc746fd4d050181bcfcd","__v":0}
      */


   useEffect(() => {

        if (!id) {
            console.log("❌ NGO ID missing");
            return;
        }

        console.log("🔌 Socket ID:", socket.id);
        console.log("🏢 NGO ID:", id);

        // Listen FIRST
        const handleNewRequest = (data) => {

            console.log("🔔 RECEIVED NEW JOIN REQUEST:", data);

            setNotifications((prev) => [
                data,
                ...prev
            ]);
        };

        socket.on("newJoinRequest", handleNewRequest);

        // Then join room
        socket.emit("joinNgoRoom", id);

        console.log("📤 Joined NGO room:", id);

        return () => {
            console.log("🧹 Removing newJoinRequest listener");
            socket.off("newJoinRequest", handleNewRequest);
        };

    }, [id]);

useEffect(() => {
    if (!id) return;

    const fetchJoinRequests = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/ngo/ngo-join/${id}`
            );


            console.log("📥 RESPONSE DATA:", response.data);
console.log("👤 NAME:", response.data[3]?.userName);
console.log("⚧ GENDER:", response.data[3]?.userGender);
console.log("📧 EMAIL:", response.data[3]?.userEmail);
console.log("📢 CAMPAIGN:", response.data[3]?.campaignTitle);

            console.log("📥 Existing requests:", response.data);

            setNotifications(response.data);
        } catch (error) {
            console.log("❌ Error fetching requests:", error);
        }
    };

    fetchJoinRequests();
}, [id]);


    return (
        <div>

            <NgoNavbar ngo={ngo} ></NgoNavbar>

            <div className="dashboard-grid">

                <Card number={campCount} text={"Total Campaigns Created"} title={'Campaigns'}></Card>
                <Card number={10} text={"Total Application"} title={'Application'}></Card>
                <Card number={10} text={"Total Hired Volunteers"} title={'Hired'}></Card>
                <Card number={10} text={"Campaign Goal Amount"} title={'Goal Amount'}></Card>

    
            </div>

            <button onClick={()=>navigate('/create-camp')}>Create Campaign</button>


                  <div className="ngo-list-horizontal">
                          {camp.map((item) => (
                              <CampaignCard
                                key={item._id}
                                camp={item}
                              />
                          ))}
                        </div>

            <h2>
                Notifications 🔔
            </h2>


            {notifications.length === 0 ? (
    <p>No new notifications</p>
) : (
    notifications.map((notification) => (
        <div
            className="ngo-list-horizontal"
            key={notification.requestId}
        >
            <JoinRequestCard
                title={notification.campaignTitle}
                userName={notification.userName}
                userEmail={notification.userEmail}
                userGender={notification.userGender}
                status={notification.status}
            />
        </div>
    ))
)}

        </div>
    );
}