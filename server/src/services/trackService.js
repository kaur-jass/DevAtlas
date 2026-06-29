const Track = require("../models/Track");

// Get all tracks of a user
const getTracks = async (userId) => {
  return await Track.find({ user: userId });
};

// Get one track
const getTrackById = async (trackId, userId) => {
  return await Track.findOne({
    _id: trackId,
    user: userId,
  });
};

// Create track
const createTrack = async (userId, trackData) => {
  return await Track.create({
    user: userId,
    ...trackData,
  });
};

// Update track
const updateTrack = async (trackId, userId, updateData) => {
  return await Track.findOneAndUpdate(
    {
      _id: trackId,
      user: userId,
    },
    updateData,
    {
      new: true,
    }
  );
};

// Delete track
const deleteTrack = async (trackId, userId) => {
  return await Track.findOneAndDelete({
    _id: trackId,
    user: userId,
  });
};

module.exports = {
  getTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
};