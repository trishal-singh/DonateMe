const express = require("express");
const donationController = require("../controllers/donation.controller.js");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/", verifyToken, donationController.add);
router.get("/", verifyToken, donationController.myDonations);
module.exports = router;
