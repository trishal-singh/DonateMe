const Fund = require("../models/fund.model");

const addFund = async (req, res) => {
  try {
    const { title, image, description, target, user_id } = req.body;
    const status = "Ongoing";
    const current = 0;
    const newFund = new Fund({
      title,
      image,
      description,
      target,
      owner: user_id,
      status,
      current,
    });
    await newFund.save();
    res.status(201).json({ message: "New Fund Added" });
  } catch (e) {
    res.status(500).json({ message: "Fund not added" });
  }
};

const getFund = async (req, res) => {
  try {
    const funds = await Fund.find({});
    if (!funds)
      return res
        .status(500)
        .json({ status: "Complete", message: "No Funds Found" });
    res.status(200).json({ status: "Complete", data: funds });
  } catch (e) {
    res
      .status(500)
      .json({ status: "Incomplete", message: "Unable to retrieve data" });
  }
};
const getFundById = async (req, res) => {
  const id = req.params.id;
  try {
    const funds = await Fund.findById(id);
    if (!funds)
      return res
        .status(500)
        .json({ status: "Complete", message: "No Funds Found" });
    res.status(200).json({ status: "Complete", data: funds });
  } catch (e) {
    res
      .status(500)
      .json({ status: "Incomplete", message: "Unable to retrieve data" });
  }
};

module.exports = { addFund, getFund, getFundById };
