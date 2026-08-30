
const express=require("express")

const authMiddleware=require("../middleware/authMiddleware")

const {createNgo}=require("../controllers/ngoControllers")

const router=express.Router()


router.post("/createNgo",authMiddleware,createNgo)

module.exports=router



