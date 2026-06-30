const mongoose = require("mongoose");

const leetCodeProblemSchema = new mongoose.Schema({

    questionId: {
        type: Number,
        unique: true,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    titleSlug: {
        type: String,
        unique: true,
    },

    difficulty: String,

    category: String,

    acceptanceRate: Number,

    likes: Number,

    dislikes: Number,

    isPaidOnly: Boolean,

    hints: [String],

    hasSolution: Boolean,

    hasVideoSolution: Boolean,
    
    topicTags: [{
        name: String,
        slug: String,
    }],

    companyTags: [{
        name: String,
        slug: String,
    }],

    similarQuestions: [String],

    officialSolution: {
        type: Boolean,
        default: false,
    }

},{
    timestamps:true,
});

module.exports = mongoose.model(
    "LeetCodeProblem",
    leetCodeProblemSchema
);