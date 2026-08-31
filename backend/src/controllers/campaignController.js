const {Campaign}=require("../models/Campaign")

const Ngo=require("../models/Ngo")

const {JoinRequest}=require("../models/Campaign")

const createCampaign=async(req,res)=>{

    try{

        const{title, description, location, active, category}=req.body

        const user=req.user.userId
        console.log(user)

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
                id:create._id,
                title:create.title,
                description:create.description
            }}
        )
    }

    catch(err){
        console.log(`${err}`)
    }
}


const createJointRequest=async(req,res)=>{

    try{
        const user=req.user.userId;
        const campaign=req.params.campaignId

        const existingCampaign = await Campaign.findById(campaign);
        
        if (!existingCampaign) { 
            return res.status(404).json(
                { 
                    message: "Campaign not found" 
                }
            );
        }

        const joinExist=await JoinRequest.findOne({
            user, campaign
        })

        if (joinExist) {
            return res.status(400).json(
                { 
                    message: "You have already requested this campaign" 
                }
            ); 
        }


        const request=await JoinRequest.create({
            user,
            campaign,
            status:"pending"
        })

        res.status(201).json({
            message:"join request send",
            request
        })
    }
    catch(err){
        console.log(`${err}`)
    }




}

module.exports={createCampaign , createJointRequest}