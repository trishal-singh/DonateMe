const Donation = require("../models/donation.model.js");
const User = require("../models/user.model.js");
const Fund = require("../models/fund.model");
const add = async (req, res) => {
  const { user_id, amount, fund_id } = req.body;

  try {
    const user = await User.findById(user_id);
    const fund = await Fund.findById(fund_id);
    const owner = await User.findById(fund.owner);
    if (isNaN(Number(amount)) || Number(amount) <= 0)
      return res.status(404).json({ message: "Invalid Input" });
    if (Number(amount) > user.balance)
      return res.status(404).json({ message: "Insufficient Balance" });
    if (Number(amount) > fund.target - fund.current)
      return res.status(404).json({ message: "Amount Exceeds requirement" });
    const newUser = await User.findByIdAndUpdate(
      user._id,
      {
        balance: user.balance - Number(amount),
      },
      { new: true }
    );
    const newOwner = await User.findByIdAndUpdate(
      owner._id,
      {
        raised: owner.raised + Number(amount),
      },
      { new: true }
    );
    let newFund = await Fund.findByIdAndUpdate(
      fund._id,
      {
        current: fund.current + Number(amount),
      },
      { new: true }
    );
    const donation = new Donation({
      amount: amount,
      user_id: newUser._id,
      fund_id: newFund._id,
    });
    await donation.save();
    if (newFund.current === newFund.target) {
      newFund = await Fund.findByIdAndUpdate(
        fund._id,
        {
          status: "Completed",
        },
        { new: true }
      );
    }
    console.log(newUser);
    console.log(newOwner);
    console.log(newFund);
    res.status(200).json({ message: "Donation Added" });
  } catch (e) {
    res.status(404).json({ message: "Unable to make donation" });
  }
};
const myDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      user_id: req.body.user_id,
    }).populate("fund_id");

    res.status(200).json({ donations });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: "Incomplete", message: "Unable to retrieve data" });
  }
};
module.exports = { add, myDonations };
