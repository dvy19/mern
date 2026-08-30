/*

the file connects database to the application
mongoDB to Node/Express
uses mongoose for connection

NodeJS => runtime environment that runs js outside the browser.
Express => a Node framework, that helps us to create API and HTTP request
Mongoose => a js library that helps in communicating the the mongo db, acts as a helper

Mongoose provides things like:
    database connection
    schemas
    models
    validation
    queries
    middleware/hooks
    convenient CRUD operations

process
    Node.js global object containing information about the currently running Node.js process

error object
    error.message
    error.name
    error.stack
*/

// require => node import mechanism
// const to declare the variable names mongoose
const mongoose = require("mongoose");


// a function to connect the mongoDB with server
// an asynchronous operation, using async keyword 
const connectDB = async function() {
    try {

        // a function .connect provided by mongoose, to connect with the database
        // receives the URI or connnection string as the parameter, but avoid hardcoding and further push to github
        // get the MONGO_URI from env, using process object
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);

        // stop the running environment, 1 represents an error here
        process.exit(1);
    }
};


// While using CommonJS, Node's older/traditional module system:
// Export this function so another file can import and use it.
module.exports = connectDB;

/*
react uses ES JS module
hence it has for e.g. , export default connectDB

and instead of import, we do require()
*/