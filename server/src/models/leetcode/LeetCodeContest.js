const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    contestName:String,

    contestSlug:String,

    ranking:Number,

    rating:Number,

    attended:Boolean,

    contestDate:Date,

},{
    timestamps:true,
});

module.exports = mongoose.model(
    "LeetCodeContest",
    contestSchema
);