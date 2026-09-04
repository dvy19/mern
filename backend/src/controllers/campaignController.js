const {Campaign}=require("../models/Campaign")

const Ngo=require("../models/Ngo")

const {getIO }=require("../socket")

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

const getAllCampaign=async(req,res)=>{
    
    try{


        const {active , ngoId }=req.query;

        console.log(ngoId)

        let filter={};

        // using strict equality, because query parameters are string
        // converts string "true" to boolean true
        if (active !== undefined) {
            filter.active = active === "true";
        }

         if (ngoId !== undefined) {
            filter.ngo = ngoId;
        }

         console.log("NGO ID:", ngoId);
        console.log("Filter:", filter);


        const campaign=await Campaign.find(filter).populate("ngo");



        res.status(200).json({
            count:campaign.length,
            campaign
        })
    }
     catch (error) {
        res.status(500).json({
            message: "Failed to fetch Campaigns",
            error: error.message
        });
    }
}

const getSingleCampaign=async(req,res)=>{

    try{

        const camp=await Campaign.findById(req.params.id).populate("ngo")

        res.status(201).json({
            camp
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch Campaign",
            error: error.message
        });
    }
}




const createJointRequest = async (req, res) => {

    try {

        console.log("REQ.USER:", req.user);

        const user = req.user.userId;

        console.log("USER:", user);

        const campaign = req.params.campaignId;

        const existingCampaign = await Campaign.findById(campaign);

        if (!existingCampaign) {
            return res.status(404).json({
                message: "Campaign not found"
            });
        }


        const joinExist = await JoinRequest.findOne({
            user,
            campaign
        });

        /*
        if (joinExist) {
            return res.status(400).json({
                message: "You have already requested this campaign"
            });
        }

        */

        const request = await JoinRequest.create({
            user,
            campaign,
            status: "pending"
        });


        // Socket.IO
        const io = getIO();

        console.log(
    "📤 Sending notification to NGO:",
    existingCampaign.ngo.toString()
);

        io.to(existingCampaign.ngo.toString()).emit(
            "newJoinRequest",
            {
                message: "New join request received",
                requestId: request._id,
                campaignId: campaign,
                userId: user
            }
        );

        console.log("✅ Notification emitted");


        return res.status(201).json({
            message: "join request sent",
            request
        });

    }
    catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const getNgoJoinRequests = async (req, res) => {
    try {
        const { ngoId } = req.params;

        console.log("🏢 NGO ID:", ngoId);

        const campaigns = await Campaign.find({
            ngo: ngoId
        }).select("_id");

        console.log("📋 NGO campaigns:", campaigns);

        const campaignIds = campaigns.map(campaign => campaign._id);

        console.log("🆔 Campaign IDs:", campaignIds);

        const requests = await JoinRequest.find({
            campaign: { $in: campaignIds },
            status: "pending"
        });

        console.log("📥 EXISTING REQUESTS:", requests);
        console.log("📊 COUNT:", requests.length);

        const allRequests = await JoinRequest.find({
    status: "pending"
}).select("_id campaign user status");

console.log("🔎 ALL PENDING REQUESTS:", allRequests);

        
const formattedRequests = requests.map((request) => ({
    message: "New join request received",
    requestId: request._id,
    campaignId: request.campaign?._id,
    campaignTitle: request.campaign?.title,
    userId: request.user?._id,
    userName: request.user?.name,
    userEmail: request.user?.email,
    status: request.status
}));

res.status(200).json(formattedRequests);
    } catch (error) {
        console.log("❌ ERROR:", error);
        res.status(500).json({
            message: "Failed to fetch join requests"
        });
    }
};

module.exports={createCampaign , createJointRequest , getAllCampaign , getSingleCampaign , getNgoJoinRequests}