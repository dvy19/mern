/*
acts as the routing layer for the auth endpoints
*/

const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

// router is like a mini Express application specifically for a group of routes.

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;