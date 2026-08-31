
const express=require("express")

const authMiddleware=require("../middleware/authMiddleware")

const {
    createNgo , 
    getAllNgos,
    getNgoById
}=require("../controllers/ngoControllers")

const {createCampaign}=require("../controllers/campaignController")

const {createJointRequest}=require("../controllers/campaignController")

const {upload}=require("../middleware/upload")

const router=express.Router()


router.post("/create-ngo",  authMiddleware, createNgo);

router.get("/getAllNgo",getAllNgos)
router.get("/:id",getNgoById)

router.post("/create-campaign",authMiddleware,createCampaign)


// http://localhost:5000/api/campaigns/64f123abc456/join-request
router.post(
    "/:campaignId/join-request",
    authMiddleware,
    createJointRequest
);

module.exports=router



