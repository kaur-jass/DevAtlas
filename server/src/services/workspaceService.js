const UserLeetCodeProblem = require("../models/leetcode/UserLeetCodeProblem");
const LeetCodeProblem = require("../models/leetcode/LeetCodeProblem");


const getDSAWorkspace = async (userId) => {

    console.log("Workspace user:", userId);

    const docs = await UserLeetCodeProblem.find();

    console.log(
        docs.map(d => d.user.toString())
    );
    const totalProblems =
        await LeetCodeProblem.countDocuments();

    
    console.log(
        "Matching docs:",
        await UserLeetCodeProblem.countDocuments({
            user: userId,
        })
    );

    const trackedProblems =
        await UserLeetCodeProblem.countDocuments({
            user: userId,
        });

    const solved =
        await UserLeetCodeProblem.countDocuments({
            user: userId,
            status: "Solved",
        });

    const attempted =
        await UserLeetCodeProblem.countDocuments({
            user: userId,
            status: "Attempted",
        });

    const bookmarked =
        await UserLeetCodeProblem.countDocuments({
            user: userId,
            bookmarked: true,
        });

    const revision =
        await UserLeetCodeProblem.countDocuments({
            user: userId,
            revision: true,
        });

    const recentProblems =
        await UserLeetCodeProblem.find({
            user: userId,
        })
        .populate("problem")
        .sort({
            updatedAt: -1,
        })
        .limit(10);

    const allProblems =
        await UserLeetCodeProblem.find({
            user: userId,
        });

    const totalConfidence =
        allProblems.reduce(
            (sum, item) => sum + item.confidence,
            0
        );

    const totalAttempts =
        allProblems.reduce(
            (sum, item) => sum + item.attempts,
            0
        );

    const averageConfidence =
        trackedProblems === 0
            ? 0
            : Number(
                  (
                      totalConfidence /
                      trackedProblems
                  ).toFixed(2)
              );

        return {

            overview: {

                totalProblems,
                trackedProblems,
                solved,
                attempted,
                bookmarked,
                revision,
                averageConfidence,
                totalAttempts,

            },

            recentProblems,

            revisionQueue: [],

            topicStats: [],

            studyStreak: 0,

        };

};

module.exports = {
    getDSAWorkspace,
};