const syncProfile = require("./syncProfile");
const syncSubmission = require("./syncSubmission");
const syncContest = require("./syncContest");
const syncBadge = require("./syncBadge");

const syncLeetCode = async (userId, username) => {

    await syncProfile(userId, username);

    await syncSubmission(userId, username);

    await syncContest(userId, username);

    await syncBadge(userId, username);

};

module.exports = {
    syncLeetCode,
};