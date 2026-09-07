
const express = require("express");

const router=express.Router()
const createEvent=require('../controllers/eventController')

router.post('/create-event/:ngoId',  createEvent)

module.exports=router