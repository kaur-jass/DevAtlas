const axios = require("axios");

const getLeetCodeProfile = async (username) => {
  try {
    const query = `
    query {
      matchedUser(username: "${username}") {
        username

        profile {
          ranking
        }

        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = response.data.data.matchedUser;

    if (!user) {
      throw new Error("LeetCode user not found.");
    }

    return {
      username: user.username,
      ranking: user.profile.ranking,
      solved: user.submitStats.acSubmissionNum,
    };
  } catch (error) {
    throw new Error("Failed to fetch LeetCode profile.");
  }
};

module.exports = {
  getLeetCodeProfile,
};