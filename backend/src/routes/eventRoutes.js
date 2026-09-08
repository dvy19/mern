
const express = require("express");

const router=express.Router()
const createEvent=require('../controllers/eventController')
const createActivity=require("../controllers/eventController");

const getActivity=require("../controllers/eventController")

const authMiddleware=require("../middleware/authMiddleware")

const getNotifications=require("../controllers/eventController")

router.post('/create-event/:ngoId',  createEvent)

router.post("/create-activity/" , authMiddleware, createActivity)

router.post("/get-activity/" , authMiddleware, getActivity)

router.get(
    "/notifications",
    authMiddleware,
    getNotifications
);


module.exports=router