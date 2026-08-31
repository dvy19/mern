/*
contains the actual auth logic of backend
registration and login

common res methods
    res.status(200)       // Set status
    res.json({...})       // Send JSON
    res.send("Hello")     // Send text/data
    res.end()             // End response
*/

// a js library,  used to hash password and store in db
// during login, it matches the password with stored in db
const bcrypt = require("bcryptjs");


// importing User model => a mongoose model with which built-in functions like findOne and create can work
const {User} = require("../models/User");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {

        // object destructing => extracting keys of a variable into variables
        const { name, email, password } = req.body;

        /*
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        */

        // res is a Response object from Express, sends the response in JSON format. Also sets the status code
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

    
        // findOne() is a Mongoose method used to search MongoDB for one document
        // Search the User collection and give me the first document where email is abc@gmail.com.
        // find is used for an array of matching documents
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);
        // 10 is the salt rounds — higher means more computationally expensive and generally more resistant to brute-force attacks.

        // creating a user document and save
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );


        // 5. Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // manually creating JWT => valid for 1 day
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    register,
    login
};