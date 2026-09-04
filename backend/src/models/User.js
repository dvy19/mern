const mongoose = require("mongoose");

/*
schema => rules for the documents

mongoose.Schema is a Mongoose class/function that creates a schema object.

Other common type includes, 
    String
    Number
    Boolean
    Date
    Array
    ObjectId

trim => removes space from both back and front side

using timestamps,
    mongoDB automatically adds createAt adn updatedAt

*/

// here we only define the rules, constraints and types
const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            trim: true,
            enum: ["user" , "ngo"]
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const userDetail= new mongoose.Schema(

    {
        name:String,
        city:String,
        gender: {
            type: String,
            enum: ["male", "female", "other"]
            },
        age:Number,
        qualification:String,

        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
                unique: true
            }

    }
)


// here we create the actual model
const User = mongoose.model("User", userSchema);

const UserProfile=mongoose.model("UserProfile",userDetail)

/*
this User model gives us the methods like

User.create()
User.findOne()
User.find()
User.findById()
User.findByIdAndUpdate()
User.deleteOne()

*/

module.exports = {User ,UserProfile};