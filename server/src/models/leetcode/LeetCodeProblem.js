const mongoose = require("mongoose");

const leetCodeProblemSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    questionId: Number,

    title: String,

    titleSlug: String,

    difficulty: String,

    status: String,

    tags: [String],

    companies: [String],

    acceptanceRate: Number,

    paidOnly: Boolean,

    frequency: Number,

    solvedAt: Date,

    bookmarked: {
        type: Boolean,
        default: false,
    },

    notes: {
        type: String,
        default: "",
    },

    revisionCount: {
        type: Number,
        default: 0,
    },

    confidence: {
        type: Number,
        default: 0,
    }

},{
    timestamps:true,
});

module.exports = mongoose.model(
    "LeetCodeProblem",
    leetCodeProblemSchema
);