const { getLeetCodeProfile } = require("./leetcodeService");
const { getGitHubProfile } = require("./githubService");

// Future platform services
// const { getCodeforcesProfile } = require("./codeforcesService");
// const { getKaggleProfile } = require("./kaggleService");
// const { getHuggingFaceProfile } = require("./huggingfaceService");

const platformServices = {
  leetcode: getLeetCodeProfile,
  github: getGitHubProfile,
  // codeforces: getCodeforcesProfile,
  // kaggle: getKaggleProfile,
  // huggingface: getHuggingFaceProfile,
};

module.exports = platformServices;