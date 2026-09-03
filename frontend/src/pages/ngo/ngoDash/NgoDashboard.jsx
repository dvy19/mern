import { useEffect, useState } from "react";
import socket from "../../../service/Socket";

import NgoNavbar from '../NgoNavbar'
import { useParams } from "react-router-dom";
import {ngoService} from '../../../service/ngoService'
export default function NgoDashboard() {

    const [notifications, setNotifications] = useState([]);

    // Temporary: replace this with your actual NGO ID
    const {id}=useParams()

    const[ngo,setNgo]=useState({});
    
    
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


    useEffect(() => {

        // Join NGO's private room
        socket.emit("joinNgoRoom", id);

        console.log("Joining NGO room:", id);


        // Listen for new join requests
        socket.on("newJoinRequest", (data) => {

            console.log("🔔 NEW JOIN REQUEST:", data);

            setNotifications((prev) => [
                data,
                ...prev
            ]);

        });


        // Cleanup
        return () => {

            socket.off("newJoinRequest");

        };

    }, [id]);


    return (
        <div>

            <NgoNavbar ngo={ngo} ></NgoNavbar>


            <h2>
                Notifications 🔔
            </h2>


            {notifications.length === 0 ? (

                <p>No new notifications</p>

            ) : (

                notifications.map((notification) => (

                    <div
                        key={notification.requestId}
                        style={{
                            border: "1px solid #ddd",
                            padding: "12px",
                            marginBottom: "10px",
                            borderRadius: "8px"
                        }}
                    >

                        <strong>
                            🔔 {notification.message}
                        </strong>

                        <p>
                            Campaign ID: {notification.campaignId}
                        </p>

                        <p>
                            User ID: {notification.userId}
                        </p>

                    </div>

                ))

            )}

        </div>
    );
}