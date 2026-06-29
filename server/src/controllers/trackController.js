const {
  getTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
  connectProfile,
} = require("../services/trackService");
const { syncTrack } = require("../services/syncService");

// GET /api/tracks
const getAllTracks = async (req, res) => {
  try {
    const tracks = await getTracks(req.user.id);

    res.status(200).json({
      success: true,
      tracks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/tracks/:id
const getSingleTrack = async (req, res) => {
  try {
    const track = await getTrackById(req.params.id, req.user.id);

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found.",
      });
    }

    res.status(200).json({
      success: true,
      track,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/tracks
const addTrack = async (req, res) => {
  try {
    const track = await createTrack(req.user.id, req.body);
    res.status(201).json({
      success: true,
      track,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/tracks/:id
const editTrack = async (req, res) => {
  try {
    const track = await updateTrack(
      req.params.id,
      req.user.id,
      req.body
    );

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found.",
      });
    }

    res.status(200).json({
      success: true,
      track,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/tracks/:id
const removeTrack = async (req, res) => {
  try {
    const track = await deleteTrack(
      req.params.id,
      req.user.id
    );

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Track not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Track deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/tracks/:id/connect-profile
const addConnectedProfile = async (req, res) => {
  try {
    const profiles = await connectProfile(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      connectedProfiles: profiles,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/tracks/:id/sync
const syncTrackData = async (req, res) => {
  try {
    const track = await syncTrack(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      track,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTracks,
  getSingleTrack,
  addTrack,
  editTrack,
  removeTrack,
  addConnectedProfile,
  syncTrackData,
};