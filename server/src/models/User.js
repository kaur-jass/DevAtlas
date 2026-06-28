const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    googleId: {
      type: String,
      default: "",
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    tracks: [
      {
        type: String,
      },
    ],

     githubUsername: {
        type: String,
        default: "",
        trim: true,
      },

      leetcodeUsername: {
        type: String,
        default: "",
        trim: true,
      },

      codeforcesUsername: {
        type: String,
        default: "",
        trim: true,
      },

      codechefUsername: {
        type: String,
        default: "",
        trim: true,
      },

      gfgUsername: {
        type: String,
        default: "",
        trim: true,
      },

      hackerrankUsername: {
        type: String,
        default: "",
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);