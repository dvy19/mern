
const express=require("express")

const authMiddleware=require("../middleware/authMiddleware")

const {
    createNgo , 
    getAllNgos,
    getNgoById
}=require("../controllers/ngoControllers")

const createCampaign=require("../controllers/campaignController")

const upload=require("../middleware/upload")

const router=express.Router()


router.post("/create-ngo", upload.single("logo"), authMiddleware, createNgo);

router.get("/getAllNgo",getAllNgos)
router.get("/:id",getNgoById)

router.get("/create-campaign",createCampaign)

module.exports=router



