const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // ---------- Coding Platforms ----------
    totalProblemsSolved: {
      type: Number,
      default: 0,
    },

    leetcodeSolved: {
      type: Number,
      default: 0,
    },

    codeforcesSolved: {
      type: Number,
      default: 0,
    },

    codechefSolved: {
      type: Number,
      default: 0,
    },

    gfgSolved: {
      type: Number,
      default: 0,
    },

    hackerrankSolved: {
      type: Number,
      default: 0,
    },

    // ---------- Ratings ----------
    leetcodeRating: {
      type: Number,
      default: 0,
    },

    codeforcesRating: {
      type: Number,
      default: 0,
    },

    codechefRating: {
      type: Number,
      default: 0,
    },

    developerScore: {
      type: Number,
      default: 0,
    },

    // ---------- GitHub ----------
    githubCommits: {
      type: Number,
      default: 0,
    },

    githubRepositories: {
      type: Number,
      default: 0,
    },

    githubPullRequests: {
      type: Number,
      default: 0,
    },

    githubIssues: {
      type: Number,
      default: 0,
    },

    githubFollowers: {
      type: Number,
      default: 0,
    },

    // ---------- Learning ----------
    learningStreak: {
      type: Number,
      default: 0,
    },

    totalStudyHours: {
      type: Number,
      default: 0,
    },

    // ---------- Sync ----------
    lastSyncedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DashboardStats", dashboardStatsSchema);