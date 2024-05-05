const express = require("express");
const router = express.Router();
const fundController = require("../controllers/fund.controller");
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/add", verifyToken, fundController.addFund);
router.get("/", fundController.getFund);

module.exports = router;
