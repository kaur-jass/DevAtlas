const LeetCodeContest = require("../../models/leetcode/LeetCodeContest");

const {
    getContestHistory,
} = require("../platforms/leetcodeService");

const syncContest = async (userId, username) => {

    const contestResponse =
    await getContestHistory(username);

    const contests =
        contestResponse.contestParticipation || [];

    await LeetCodeContest.deleteMany({
        user: userId,
    });

    if (!Array.isArray(contests)) {
        return 0;
    }

    const contestList = contests.map((contest) => ({
        user: userId,

        contestName:
            contest.contestName ||
            contest.title ||
            "",

        contestSlug:
            contest.contestSlug ||
            contest.slug ||
            "",

        ranking:
            contest.ranking ||
            contest.rank ||
            0,

        rating:
            contest.rating ||
            contest.ratingAfter ||
            0,

        attended:
            contest.attended ??
            true,

        contestDate:
            contest.contestDate
                ? new Date(contest.contestDate)
                : new Date(),
    }));

    if (contestList.length > 0) {
        await LeetCodeContest.insertMany(contestList);
    }

    return contestList.length;
};

module.exports = syncContest;