
const express=require("express")

const authMiddleware=require("../middleware/authMiddleware")

const {
    createNgo , 
    getAllNgos,
    getNgoById
}=require("../controllers/ngoControllers")

const router=express.Router()


router.post("/", upload.single("logo"), authMiddleware, createNgo);

router.get("/getAllNgo",getAllNgos)
router.get("/:id",getNgoById)

module.exports=router



