const mongoose = require("mongoose");

const leetCodeSubmissionSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    submissionId:String,

    questionId:Number,

    questionTitle:String,

    questionSlug:String,

    difficulty:String,

    language:String,

    runtime:String,

    memory:String,

    status:String,

    timestamp:Number,

    submittedAt:Date,

    url:String,

    isAccepted:Boolean,

},{
    timestamps:true,
});

module.exports = mongoose.model(
    "LeetCodeSubmission",
    leetCodeSubmissionSchema
);