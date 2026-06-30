const LeetCodeProfile = require("../../models/leetcode/LeetCodeProfile");

const {
    getLeetCodeProfile,
    getCalendar,
    getSkillStats,
    getLanguageStats,
} = require("../platforms/leetcodeService");

const syncProfile = async (userId, username) => {

    // Fetch all required data
    const profile = await getLeetCodeProfile(username);
    const calendar = await getCalendar(username);
    const skills = await getSkillStats(username);
    const languages = await getLanguageStats(username);

    // Save to MongoDB
    await LeetCodeProfile.findOneAndUpdate(
        {
            user: userId,
        },
        {
            user: userId,

            username: profile.username,

            realName: profile.realName || "",

            avatar: profile.avatar || "",

            ranking: profile.ranking || 0,

            reputation: profile.reputation || 0,

            easySolved: profile.easySolved || 0,

            mediumSolved: profile.mediumSolved || 0,

            hardSolved: profile.hardSolved || 0,

            totalSolved: profile.totalSolved || 0,

            contestRating: profile.contestRating || 0,

            contestRanking: profile.contestRanking || 0,

            stars: profile.stars || 0,

            views: profile.views || 0,

            languageStats: languages,

            skillStats: skills,

            submissionCalendar: calendar,

            lastSynced: new Date(),
        },
        {
            new: true,
            upsert: true,
        }
    );
};

module.exports = syncProfile;