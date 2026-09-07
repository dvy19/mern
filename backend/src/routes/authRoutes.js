/*
acts as the routing layer for the auth endpoints
*/

const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const {createUserProfile , getUserProfile , editUserProfile , deleteUserProfile , getUserProfileById}=require("../controllers/userController")

const authMiddleware=require("../middleware/authMiddleware")

// router is like a mini Express application specifically for a group of routes.

const router = express.Router();

const upload=require('../middleware/upload')

router.post("/register", register);
router.post("/login", login);

router.post("/create-user" ,  upload.single("profile"),authMiddleware,createUserProfile )
router.get("/get-user" , authMiddleware,getUserProfile )

router.get("/get-user-profile/:userId" , authMiddleware,getUserProfileById )



router.put(
    "/edit-profile",
    authMiddleware,
    upload.single("profile"),
    editUserProfile
);

router.delete(
    "/delete-profile",
    authMiddleware,
    deleteUserProfile
);

module.exports = router;