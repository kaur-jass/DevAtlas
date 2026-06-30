const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { getWorkspace } = require("../controllers/workspaceController");

console.log("🔥 WORKSPACE ROUTES LOADED"); 

router.get(
    "/:trackId",
    protect,
    getWorkspace
);

module.exports = router;