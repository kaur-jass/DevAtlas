const mongoose = require("mongoose");

const connectedProfileSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    username: {
        type: String,
        required: true,
        trim: true,
    },

    displayName: {
        type: String,
        default: "",
    },

    profileUrl: {
        type: String,
        default: "",
    },

    avatar: {
        type: String,
        default: "",
    },

    isConnected: {
        type: Boolean,
        default: true,
    },

    lastSynced: {
        type: Date,
        default: null,
    },
    
    syncedData: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
},
}, { _id: false });

const trackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "bg-purple-500",
    },

    progress: {
      type: Number,
      default: 0,
    },

    topicsCount: {
      type: Number,
      default: 0,
    },

    completedTopics: {
      type: Number,
      default: 0,
    },

    connectedProfiles: [connectedProfileSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Track", trackSchema);