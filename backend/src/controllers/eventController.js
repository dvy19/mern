
const cloudinary = require("../config/cloudinary");

const Event=require('../models/Event')
const Ngo=require('../models/Ngo')

const createEvent=async(req,res)=>{

    try{

        const{title,description,startTime, endTime, date, fee, venue}=req.body;

        const ngoId=req.params.ngoId;

        const ngo = await Ngo.findById(ngoId);

        if (!ngo) {
            return res.status(404).json({
                message: "NGO not found"
            });
        }

        const event=await Event.create({
            title,
            description,
            startTime,
            endTime,
            date,
            fee,
            venue,
            ngoId
        });

        res.status(200).json({
            message:"created event",
            event
        })
    }

     catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server error"
        });
    }

}

module.exports=createEvent