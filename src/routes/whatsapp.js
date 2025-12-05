const express = require("express");
const router = express.Router();
const receiveMessage = require("../controllers/receiveMessage");

router.post("/webhook", receiveMessage);

module.exports = router;
