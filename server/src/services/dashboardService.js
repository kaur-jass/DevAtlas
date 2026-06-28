const DashboardStats = require("../models/DashboardStats");

const getDashboardStats = async (userId) => {
  let stats = await DashboardStats.findOne({ user: userId });

  if (!stats) {
    stats = await DashboardStats.create({
      user: userId,
    });
  }

  return stats;
};

module.exports = {
  getDashboardStats,
};