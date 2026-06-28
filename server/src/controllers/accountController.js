const User = require("../models/User");

// GET Connected Accounts
const getConnectedAccounts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("connectedAccounts");

    res.status(200).json({
      success: true,
      connectedAccounts: user.connectedAccounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE Connected Accounts
const updateConnectedAccounts = async (req, res) => {
  try {
    const {
      github,
      leetcode,
      codeforces,
      codechef,
      gfg,
      hackerrank,
    } = req.body;

    const user = await User.findById(req.user.id);

    user.connectedAccounts = {
      github,
      leetcode,
      codeforces,
      codechef,
      gfg,
      hackerrank,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Connected accounts updated successfully.",
      connectedAccounts: user.connectedAccounts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getConnectedAccounts,
  updateConnectedAccounts,
};