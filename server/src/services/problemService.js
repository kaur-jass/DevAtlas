const LeetCodeProblem = require("../models/leetcode/LeetCodeProblem");

const getProblems = async (query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;

    const skip = (page - 1) * limit;

    const filter = {};

    if (query.search) {
        filter.title = {
            $regex: query.search,
            $options: "i",
        };
    }

    if (query.difficulty) {
        filter.difficulty = query.difficulty;
    }

    if (query.paid !== undefined) {
        filter.isPaidOnly = query.paid === "true";
    }

    const total = await LeetCodeProblem.countDocuments(filter);

    const problems = await LeetCodeProblem.find(filter)
        .sort({ questionId: 1 })
        .skip(skip)
        .limit(limit);

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        problems,
    };
};

const getProblemBySlug = async (slug) => {

    return await LeetCodeProblem.findOne({
        titleSlug: slug,
    });

};

module.exports = {
    getProblems,
    getProblemBySlug,
};