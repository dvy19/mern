import { useEffect } from "react";
import socket from '../service/Socket';

export default function TestSocket() {

    useEffect(() => {

        console.log("🔌 Connecting to Socket.IO...");

        socket.on("connect", () => {

            console.log(
                "✅ Connected!",
                socket.id
            );

        });

        socket.on("disconnect", () => {

            console.log("❌ Disconnected");
        });


        return () => {

            socket.off("connect");
            socket.off("disconnect");

        };

    }, []);


    return (
        <div>
            <h1>Socket Test</h1>
            <p>Open browser console</p>
        </div>
    );
}