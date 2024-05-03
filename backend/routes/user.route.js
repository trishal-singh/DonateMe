const express = require("express");
const userController = require("../controllers/user.controller.js");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", verifyToken, userController.currentUser);
router.patch("/addAmount", verifyToken, userController.addBalance);
module.exports = router;
