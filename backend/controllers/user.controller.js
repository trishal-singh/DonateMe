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
    const user = await User.findById(req.body.id).select("-password");
    res.json(user);
  } catch (e) {
    res.json({ message: "User Not Found" });
  }
};
const addBalance = async (req, res) => {
  try {
    let amount = await User.findById(req.body.id).select("balance");

    amount.balance += req.body.amount;
    console.log(amount.balance);
    const user = await User.findByIdAndUpdate(req.body.id, {
      balance: amount.balance,
    });
    res.json({ message: "Balance updated" });
  } catch (e) {
    //console.log(e)
    res.json({ message: "Unable to add amount" });
  }
};
module.exports = { registerUser, loginUser, currentUser, addBalance };
