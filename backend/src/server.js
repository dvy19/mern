/*
main entry point of your Express backend.
*/


const express = require("express");
const cors=require("cors")

const http = require("http");
const {
    initializeSocket
} = require("../src/socket");


require("dotenv").config();

// connect to the database
const connectDB = require("./config/db");

// getting auth routes
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");


// creates the express application
const app = express();

const server=http.createServer(app)

initializeSocket(server);



app.use(cors({
     origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}));

// a middleware to understand the json data
app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);


const ngoRoutes = require("./routes/ngoRoutes");

app.use("/api/ngo", ngoRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Auth API is running"
    });
});

const PORT = process.env.PORT || 5000;

/*
.listen() is what actually starts your Express server and makes it ready to receive HTTP requests

Start my server and listen for incoming requests on this port.
*/
const startServer = async () => {
    await connectDB();

    function startIt(){
        console.log(`Server running on port ${PORT}`);
    }

    // after success, the 2nd argument function will run
    server.listen(PORT, startIt);
};

startServer();