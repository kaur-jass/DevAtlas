const mongoose = require("mongoose");

const leetCodeSubmissionSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    questionTitle:String,

    questionSlug:String,

    language:String,

    status:String,

    runtime:String,

    memory:String,

    submittedAt:Date,

},{
    timestamps:true,
});

module.exports = mongoose.model(
    "LeetCodeSubmission",
    leetCodeSubmissionSchema
);