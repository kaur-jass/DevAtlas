const UserLeetCodeProblem = require("../models/leetcode/UserLeetCodeProblem");
const LeetCodeProblem = require("../models/leetcode/LeetCodeProblem");

const getOrCreateUserProblem = async (userId, slug) => {

    const problem = await LeetCodeProblem.findOne({
        titleSlug: slug,
    });

    if (!problem) {
        throw new Error("Problem not found.");
    }

    let userProblem = await UserLeetCodeProblem.findOne({
        user: userId,
        problem: problem._id,
    });

    if (!userProblem) {

        userProblem = await UserLeetCodeProblem.create({
            user: userId,
            problem: problem._id,
        });

    }

    return userProblem;
};

const toggleBookmark = async (userId, slug) => {

    const userProblem = await getOrCreateUserProblem(
        userId,
        slug
    );

    userProblem.bookmarked =
        !userProblem.bookmarked;

    await userProblem.save();

    return userProblem;
};

const toggleRevision = async (userId, slug) => {

    const userProblem = await getOrCreateUserProblem(
        userId,
        slug
    );

    userProblem.revision = !userProblem.revision;

    if (userProblem.revision) {
        userProblem.revisionCount += 1;
        userProblem.lastRevision = new Date();
    }

    await userProblem.save();

    return userProblem;
};


const updateStatus = async (userId, slug, status) => {

    const userProblem = await getOrCreateUserProblem(
        userId,
        slug
    );

    userProblem.status = status;

    if (status === "Solved") {
        userProblem.solved = true;
        userProblem.solvedAt = new Date();
    } else {
        userProblem.solved = false;
        userProblem.solvedAt = null;
    }

    await userProblem.save();

    return userProblem;
};

const updateConfidence = async (userId, slug, confidence) => {

    if (confidence < 0 || confidence > 5) {
        throw new Error("Confidence must be between 0 and 5.");
    }

    const userProblem = await getOrCreateUserProblem(
        userId,
        slug
    );

    userProblem.confidence = confidence;

    await userProblem.save();

    return userProblem;
};

const updateNotes = async (userId, slug, notes) => {

    const userProblem = await getOrCreateUserProblem(
        userId,
        slug
    );

    userProblem.notes = notes;

    await userProblem.save();

    return userProblem;
};

const incrementAttempts = async (userId, slug) => {

    const userProblem = await getOrCreateUserProblem(
        userId,
        slug
    );

    userProblem.attempts += 1;

    await userProblem.save();

    return userProblem;
}; 

const getUserProblem = async (userId, slug) => {

    const problem = await LeetCodeProblem.findOne({
        titleSlug: slug,
    });

    if (!problem) {
        throw new Error("Problem not found.");
    }

    let userProblem = await UserLeetCodeProblem.findOne({
        user: userId,
        problem: problem._id,
    });

    if (!userProblem) {

        userProblem = await UserLeetCodeProblem.create({
            user: userId,
            problem: problem._id,
        });

    }

    return {
        problem,
        userProblem,
    };
};

const getAllUserProblems = async (userId, query) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;

    const skip = (page - 1) * limit;

    const filter = {
        user: userId,
    };

    if (query.status) {
        filter.status = query.status;
    }

    if (query.bookmarked !== undefined) {
        filter.bookmarked = query.bookmarked === "true";
    }

    if (query.revision !== undefined) {
        filter.revision = query.revision === "true";
    }

    if (query.confidence !== undefined) {
        filter.confidence = Number(query.confidence);
    }

    const total = await UserLeetCodeProblem.countDocuments(filter);

    let userProblems = await UserLeetCodeProblem.find(filter)
        .populate("problem")
        .sort({
            updatedAt: -1,
        })
        .skip(skip)
        .limit(limit);

    if (query.search) {

        const search = query.search.toLowerCase();

        userProblems = userProblems.filter((item) =>
            item.problem.title
                .toLowerCase()
                .includes(search)
        );
    }

    if (query.difficulty) {

        userProblems = userProblems.filter(
            (item) =>
                item.problem.difficulty === query.difficulty
        );
    }

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        count: userProblems.length,
        userProblems,
    };
};

module.exports = {
    getOrCreateUserProblem,
    toggleBookmark,
    toggleRevision,
    updateStatus,
    updateConfidence, 
    updateNotes,
    incrementAttempts,
    getUserProblem,
    getAllUserProblems,
};