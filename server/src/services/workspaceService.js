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

  
    const allProblems = await UserLeetCodeProblem.find({
        user: userId,
    }).populate("problem");
    
    const topicMap = new Map();



    for (const item of allProblems) {
        // console.log("====================");
        // console.log(item.problem);

        if (!item.problem) continue;

        // console.log("Title:", item.problem.title);
        // console.log("Tags:", item.problem.tags);

        const tags = item.problem.topicTags || [];

        for (const tag of tags) {

            if (!topicMap.has(tag.name)) {

                topicMap.set(tag.name, {

                    name: tag.name,

                    count: 0,

                    solved: 0,

                    attempted: 0,

                    bookmarked: 0,

                    revision: 0,

                    confidenceSum: 0,

                });

            }

            const topic = topicMap.get(tag.name);

            topic.count++;

            if (item.status === "Solved")
                topic.solved++;

            if (item.status === "Attempted")
                topic.attempted++;

            if (item.bookmarked)
                topic.bookmarked++;

            if (item.revision)
                topic.revision++;

            topic.confidenceSum += item.confidence || 0;

        }
    }

    const topicStats = [];

    const recentProblems = [...allProblems]

        .sort(
            (a, b) =>
                new Date(b.updatedAt) -
                new Date(a.updatedAt)
        )
        .slice(0, 10)
        .map((item) => ({

            _id: item._id,

            title: item.problem?.title,

            slug: item.problem?.titleSlug,

            topic:
                item.problem?.topicTags?.[0]?.name ||
                "General",

            difficulty: item.problem?.difficulty,

            confidence: item.confidence || 0,

            attempts: item.attempts || 0,

            status: item.status,

            bookmarked: item.bookmarked,

            revision: item.revision,

            platform: "LeetCode",

    }));

    const revisionQueue = [];

    for (const item of allProblems) {

        if (!item.problem) continue;

        let priority = 0;
        let revisionReason = "";

        if (item.revision) {
            priority += 40;
            revisionReason = "Marked for Revision ";
        }

        if ((item.confidence || 0) < 40) {
            priority += 30;

            if (!revisionReason)
                revisionReason = "Low Confidence";
        }
        else if ((item.confidence || 0) < 60) {
            priority += 20;

            if (!revisionReason)
                revisionReason = "Needs More Practice";
        }

    
        if ((item.attempts || 0) >= 3) {
            priority += 20;

            if (!revisionReason)
                revisionReason = `Attempted ${item.attempts} times`;
        }
        else if ((item.attempts || 0) === 2) {
            priority += 10;

            if (!revisionReason)
                revisionReason = "Solved after multiple attempts";
        }

    
        if (priority === 0) continue;

        revisionQueue.push({

            _id: item._id,

            title: item.problem.title,

            slug: item.problem.titleSlug,

            topic:
                item.problem.topicTags?.[0]?.name ||
                "General",

            difficulty: item.problem.difficulty,

            confidence: item.confidence || 0,

            attempts: item.attempts || 0,

            status: item.status,

            priority,

            revisionReason,

            platform: "LeetCode",

        });

    }

    revisionQueue.sort((a, b) => {

        if (b.priority !== a.priority)
            return b.priority - a.priority;

        return a.confidence - b.confidence;

    });

    const finalRevisionQueue =    revisionQueue.slice(0, 3);
    
    for (const topic of topicMap.values()) {

        topic.averageConfidence =
            topic.count === 0
                ? 0
                : Number(
                    (
                        topic.confidenceSum /
                        topic.count
                    ).toFixed(2)
                );

        delete topic.confidenceSum;

        topic.children = [];

        topicStats.push(topic);

    }

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

        topicStats.sort((a, b) => b.count - a.count);

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

            revisionQueue: finalRevisionQueue,

            topicStats,

            studyStreak: 0,

        };
};

module.exports = {
    getDSAWorkspace,
};