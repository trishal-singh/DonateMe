const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user)
      return res.status(405).json({
        status: "Not Registered",
        message: "User Already Exists",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      balance: 10000,
      raised: 0,
    });
    await newUser.save();
    res.status(201).json({
      status: "Registered",
      message: "User Registered Successfully",
      username: username,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Not Registered", message: "Unable to register" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (!exists)
      return res
        .status(401)
        .json({ status: "Not Logged In", message: "Wrong Username" });
    const correctPassword = await bcrypt.compare(password, exists.password);
    if (!correctPassword)
      return res
        .status(401)
        .json({ status: "Not Logged In", message: "Wrong Password" });
    const token = jwt.sign({ userId: exists._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    res.status(200).json({
      status: "Logged In",
      message: "Successfully Logged in",
      token: token,
      user_id: exists._id,
    });
  } catch (e) {
    console.log(e);
  }
};
const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id).select("-password");

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: "User Not Found" });
  }
};
const addBalance = async (req, res) => {
  try {
    let amount = await User.findById(req.body.user_id).select("balance");

    amount.balance += Number(req.body.amount);
    const user = await User.findByIdAndUpdate(
      req.body.user_id,
      {
        balance: amount.balance,
      },
      { new: true }
    );
    res.status(200).json({ message: "Balance updated", balance: user.balance });
  } catch (e) {
    //console.log(e)
    res.status(404).json({ message: "Unable to add amount" });
  }
};
module.exports = { registerUser, loginUser, currentUser, addBalance };
