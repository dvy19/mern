const Campaign=require("../models/Campaign")

const Ngo=require("../models/Ngo")

const createCampaign=async(req,res)=>{

    try{

        const{title, description, location, active, category}=req.body

        const user=req.user.userId

        const ngo=await Ngo.findOne({user})

        if (!ngo) {

            return res.status(404).json({
                message: "NGO profile not found"
            });
        }

        const create=await Campaign.create({
            title,
            description,
            ngo:ngo._id,
            category,
            location,
            active
        })

        res.status(201).json(
           { message:"Campaign created Success",
            data:{
                title:create.title,
                description:create.description
            }}
        )
    }

    catch(err){
        console.log(`${err}`)
    }
}

module.exports=createCampaign