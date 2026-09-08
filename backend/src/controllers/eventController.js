
const cloudinary = require("../config/cloudinary");

const Event=require('../models/Event')
const Activity=require("../models/Event")
const Ngo=require('../models/Ngo')

const UserProfile=require("../models/User")

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

const createActivity=async(req,res)=>{

    try{

        const{title, date} = req.body;

        const userId=req.user.userId;

        let image=null;

        if (req.file) {
        
                image = await new Promise((resolve, reject) => {
        
                    const stream = cloudinary.uploader.upload_stream(
                            {
                                folder: "ngo-app/activity-pic",
                                resource_type: "image"
                            },
                        (error, result) => {
        
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
        
                            }
                    );
        
                        stream.end(req.file.buffer);
                    });
                }

        const userProfile=await UserProfile.findOne({userId})

        console.log(userProfile)


        const activity=await Activity.create({
            title,
            userId:userProfile._id,
            image:image,
            date
        })

        res.status(200).json({
            message:"activity marked",
            activity
        })


    }
    
    catch(err){
        console.log(`${err}`)
    }
}

const getActivity=async(req,res)=>{

    try{

        const userId=req.user.userId;
        
        const userProfile=await UserProfile.findOne({userId})

        const activity=await Activity.findOne({userId:userProfile._id})
        .populate("userId")

        res.status(201).json({
            message:"activity found",
            activity
        })
    }
    
    catch(err){
        console.log(`${err}`)
    }


}
module.exports=createEvent
module.exports=createActivity
module.exports=getActivity