/*
acts as the routing layer for the auth endpoints
*/

const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const createUserProfile=require("../controllers/userController")

const authMiddleware=require("../middleware/authMiddleware")

// router is like a mini Express application specifically for a group of routes.

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/create-user" , authMiddleware,createUserProfile )

module.exports = router;