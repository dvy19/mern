
const express = require("express");

const router=express.Router()
const createEvent=require('../controllers/eventController')
const createActivity=require("../controllers/eventController");

const getActivity=require("../controllers/eventController")

const authMiddleware=require("../middleware/authMiddleware")

router.post('/create-event/:ngoId',  createEvent)

router.post("/create-activity/" , authMiddleware, createActivity)

router.post("/get-activity/" , authMiddleware, getActivity)


module.exports=router