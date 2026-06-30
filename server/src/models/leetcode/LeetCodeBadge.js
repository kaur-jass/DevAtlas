const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    name:String,

    icon:String,

    description:String,

    createdAtLeetCode:Date,

},{
    timestamps:true,
});

module.exports = mongoose.model(
    "LeetCodeBadge",
    badgeSchema
);