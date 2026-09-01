
const express=require("express")

const authMiddleware=require("../middleware/authMiddleware")

const {
    createNgo , 
    getAllNgos,
    getNgoById,
    
}=require("../controllers/ngoControllers")

const {createCampaign , getAllCampaign , 
    getSingleCampaign}=require("../controllers/campaignController")

const {createJointRequest}=require("../controllers/campaignController")

const {upload}=require("../middleware/upload")

const router=express.Router()


router.post("/create-ngo",  authMiddleware, createNgo);

router.get("/getAllNgo",getAllNgos)

router.post("/create-campaign",authMiddleware,createCampaign)

router.get('/getAllCampaigns' ,  getAllCampaign)
router.get('/getSingleCampaign/:id' , getSingleCampaign)

router.get("/:id",getNgoById)

/*
console.log(typeof authMiddleware);
console.log(typeof getAllCampaign);
console.log(typeof getSingleCampaign);
*/



// http://localhost:5000/api/campaigns/64f123abc456/join-request
router.post(
    "/:campaignId/join-request",
    authMiddleware,
    createJointRequest
);

module.exports=router



