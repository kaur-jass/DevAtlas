const mongoose = require("mongoose");

const leetCodeProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    username: {
        type: String,
        required: true,
    },

    ranking: Number,

    reputation: Number,

    easySolved: Number,

    mediumSolved: Number,

    hardSolved: Number,

    totalSolved: Number,

    contestRating: Number,

    globalRanking: Number,

    badges: [
        {
            name: String,
            icon: String,
        }
    ],

    submissionCalendar: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },

    lastSynced: Date,

}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "LeetCodeProfile",
    leetCodeProfileSchema
);