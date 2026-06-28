const express = require("express");

const router = express.Router();

console.log("✅ accountRoutes loaded");
const {
  getConnectedAccounts,
  updateConnectedAccounts,
} = require("../controllers/accountController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getConnectedAccounts);

router.put("/", protect, updateConnectedAccounts);

console.log(
  router.stack.map((layer) => ({
    path: layer.route?.path,
    methods: layer.route?.methods,
  }))
);

module.exports = router;