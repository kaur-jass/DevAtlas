const mongoose = require("mongoose");

const leetCodeProfileSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true,
        required:true,
    },

    username:String,

    realName:String,

    avatar:String,

    ranking:Number,

    reputation:Number,

    easySolved:Number,

    mediumSolved:Number,

    hardSolved:Number,

    totalSolved:Number,

    contestRating:Number,

    contestRanking:Number,

    stars:Number,

    views:Number,

    languageStats:mongoose.Schema.Types.Mixed,

    skillStats:mongoose.Schema.Types.Mixed,

    submissionCalendar:mongoose.Schema.Types.Mixed,

    lastSynced:Date,

},{
    timestamps:true,
});

module.exports = mongoose.model(
    "LeetCodeProfile",
    leetCodeProfileSchema
);