const LeetCodeProblem = require("../../models/leetcode/LeetCodeProblem");

const {
    getAllProblems,
} = require("../platforms/leetcodeService");

const importLeetCodeProblems = async () => {

    const LIMIT = 100;
    let skip = 0;
    let imported = 0;
    let totalQuestions = 0;

    console.log("Starting LeetCode import...");

    while (true) {

        const response = await getAllProblems(
            LIMIT,
            skip
        );

        totalQuestions = response.totalQuestions;

        const problems =
            response.problemsetQuestionList;

        if (!problems.length)
            break;

        console.log(
            `Fetched ${problems.length} problems (skip=${skip})`
        );

        const operations = problems.map((problem) => ({
            updateOne: {
                filter: {
                    titleSlug: problem.titleSlug,
                },
                update: {
                    $set: {
                        questionId: Number(problem.questionFrontendId),

                        title: problem.title,

                        titleSlug: problem.titleSlug,

                        difficulty: problem.difficulty,

                        category: problem.categoryTitle || "",

                        acceptanceRate: problem.acRate || 0,

                        likes: problem.likes || 0,

                        dislikes: problem.dislikes || 0,

                        isPaidOnly: problem.isPaidOnly,

                        hints: problem.hints || [],

                        hasSolution: problem.hasSolution,

                        hasVideoSolution: problem.hasVideoSolution,

                        topicTags: (problem.topicTags || []).map(tag => ({
                            name: tag.name,
                            slug: tag.slug,
                        })),

                        companyTags: (problem.companyTags || []).map(tag => ({
                            name: tag.name,
                            slug: tag.slug,
                        })),

                        similarQuestions: problem.similarQuestions || [],
                    },
                },
                upsert: true,
            },
        }));

        await LeetCodeProblem.bulkWrite(operations);

        console.log(`Saved ${operations.length} problems.`);

        imported += problems.length;
        skip += LIMIT;

        if (imported >= totalQuestions)
            break;
    }

    console.log(
        `Finished fetching ${imported} problems`
    );

    return imported;
};

module.exports = {
    importLeetCodeProblems,
};