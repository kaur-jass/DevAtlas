const mongoose = require("mongoose");

const userLeetCodeProblemSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LeetCodeProblem",
            required: true,
        },

        status: {
            type: String,
            enum: ["Not Started", "Attempted", "Solved"],
            default: "Not Started",
        },

        solved: {
            type: Boolean,
            default: false,
        },

        solvedAt: {
            type: Date,
            default: null,
        },

        bookmarked: {
            type: Boolean,
            default: false,
        },

        revision: {
            type: Boolean,
            default: false,
        },

        revisionCount: {
            type: Number,
            default: 0,
        },

        lastRevision: {
            type: Date,
            default: null,
        },

        attempts: {
            type: Number,
            default: 0,
        },

        confidence: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// One record per user per problem
userLeetCodeProblemSchema.index(
    {
        user: 1,
        problem: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model(
    "UserLeetCodeProblem",
    userLeetCodeProblemSchema
);