import { useEffect, useState } from "react";
import socket from "../../service/Socket";

export default function NgoDashboard() {

    const [notifications, setNotifications] = useState([]);

    // Temporary: replace this with your actual NGO ID
    const ngoId = "YOUR_NGO_ID";


    useEffect(() => {

        // Join NGO's private room
        socket.emit("joinNgoRoom", ngoId);

        console.log("Joining NGO room:", ngoId);


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

    }, [ngoId]);


    return (
        <div>

            <h1>NGO Dashboard</h1>


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