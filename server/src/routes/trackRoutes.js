const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getAllTracks,
  getSingleTrack,
  addTrack,
  editTrack,
  removeTrack,
} = require("../controllers/trackController");

router.get("/", protect, getAllTracks);

router.get("/:id", protect, getSingleTrack);

router.post("/", protect, addTrack);

router.put("/:id", protect, editTrack);

router.delete("/:id", protect, removeTrack);

module.exports = router;