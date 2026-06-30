const LeetCodeBadge = require("../../models/leetcode/LeetCodeBadge");

const {
    getBadges,
} = require("../platforms/leetcodeService");

const syncBadge = async (userId, username) => {

    const badgeResponse =
    await getBadges(username);

    const badges =
        badgeResponse.badges || [];

    await LeetCodeBadge.deleteMany({
        user: userId,
    });

    if (!Array.isArray(badges)) {
        return 0;
    }

    const badgeList = badges.map((badge) => ({
        user: userId,

        name:
            badge.name || "",

        icon:
            badge.icon || "",

        description:
            badge.description || "",

        createdAtLeetCode:
            badge.createdAt
                ? new Date(badge.createdAt)
                : null,
    }));

    if (badgeList.length > 0) {
        await LeetCodeBadge.insertMany(badgeList);
    }

    return badgeList.length;
};

module.exports = syncBadge;