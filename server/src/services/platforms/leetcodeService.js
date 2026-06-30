const axios = require("axios");
const { LEETCODE_API } = require("../../config/platforms");

const fetchData = async (endpoint, errorMessage) => {
    try {
        const { data } = await axios.get(endpoint);
        return data;
    } catch (err) {
        throw new Error(errorMessage);
    }
};

// ======================
// USER
// ======================

const getLeetCodeProfile = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/profile`,
        `Failed to fetch profile for ${username}`
    );

const getRecentSubmissions = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/submission`,
        `Failed to fetch submissions for ${username}`
    );

const getAcceptedSubmissions = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/acSubmission`,
        `Failed to fetch accepted submissions`
    );

const getContestHistory = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/contest`,
        `Failed to fetch contest history`
    );

const getBadges = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/badges`,
        `Failed to fetch badges`
    );

const getCalendar = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/calendar`,
        `Failed to fetch calendar`
    );

const getSkillStats = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/skill`,
        `Failed to fetch skill stats`
    );

const getLanguageStats = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/language`,
        `Failed to fetch language stats`
    );

const getQuestionProgress = (username) =>
    fetchData(
        `${LEETCODE_API}/${username}/progress`,
        `Failed to fetch progress`
    );

// ======================
// GLOBAL LEETCODE
// ======================

const getAllProblems = (
    limit = 100,
    skip = 0
) =>
    fetchData(
        `${LEETCODE_API}/problems?limit=${limit}&skip=${skip}`,
        "Failed to fetch problems"
    );

const getDailyProblem = () =>
    fetchData(
        `${LEETCODE_API}/daily`,
        "Failed to fetch daily problem"
    );

const getRandomProblem = () =>
    fetchData(
        `${LEETCODE_API}/random`,
        "Failed to fetch random problem"
    );

const getAllContests = () =>
    fetchData(
        `${LEETCODE_API}/contests`,
        "Failed to fetch contests"
    );

const getUpcomingContests = () =>
    fetchData(
        `${LEETCODE_API}/contests/upcoming`,
        "Failed to fetch upcoming contests"
    );

module.exports = {
    getLeetCodeProfile,
    getRecentSubmissions,
    getAcceptedSubmissions,
    getContestHistory,
    getBadges,
    getCalendar,
    getSkillStats,
    getLanguageStats,
    getQuestionProgress,

    getAllProblems,
    getDailyProblem,
    getRandomProblem,
    getAllContests,
    getUpcomingContests,
};