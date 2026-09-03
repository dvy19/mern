let io;

const initializeSocket = (server) => {

    const { Server } = require("socket.io");

    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("Socket connected:", socket.id);
        console.log("✅ Socket connected:", socket.id);

        socket.on("joinNgoRoom", (ngoId) => {

            socket.join(ngoId);

            console.log(
                `NGO joined room: ${ngoId}`
            );
            console.log(
                `🏢 NGO ${ngoId} joined room`
            );
        });

        socket.on("disconnect", () => {

            console.log(
                "Socket disconnected:",
                socket.id
            );
        });

    });

};

const getIO = () => {

    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;
};

module.exports = {
    initializeSocket,
    getIO
};