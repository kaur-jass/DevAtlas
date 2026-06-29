const Track = require("../models/Track");

// Get all tracks of a user
const getTracks = async (userId) => {
  console.log("Searching tracks for user:", userId);

  const tracks = await Track.find({ user: userId });

  console.log("Tracks found:", tracks);

  return tracks;
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

// Connect a profile to a track
const connectProfile = async (trackId, userId, profileData) => {
  const track = await Track.findOne({
    _id: trackId,
    user: userId,
  });

  if (!track) {
    throw new Error("Track not found.");
  }

  // Prevent duplicate platform connections
  const alreadyConnected = track.connectedProfiles.find(
    (profile) =>
      profile.platform.toLowerCase() ===
      profileData.platform.toLowerCase()
  );

  if (alreadyConnected) {
    throw new Error(`${profileData.platform} is already connected.`);
  }

  track.connectedProfiles.push({
    platform: profileData.platform,
    username: profileData.username,
  });

  await track.save();

  return track.connectedProfiles;
};



module.exports = {
  getTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
  connectProfile,
};