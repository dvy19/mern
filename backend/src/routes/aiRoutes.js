const express = require("express");

const {
    evaluateAnswer
} = require("../controllers/aiController");

const router = express.Router();

router.post("/evaluate-answer", evaluateAnswer);

module.exports = router;