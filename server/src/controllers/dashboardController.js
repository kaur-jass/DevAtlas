const { getDashboardStats } = require("../services/dashboardService");

const getDashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats(req.user.id);

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats.",
    });
  }
};

module.exports = {
  getDashboard,
};