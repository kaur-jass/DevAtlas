// const axios = require("axios");

// const GRAPHQL_URL = "https://leetcode.com/graphql";

// const getSolvedProblems = async (username, skip = 0, limit = 50) => {
//     try {
//         const response = await axios.post(
//             GRAPHQL_URL,
//             {
//                 operationName: "userProgressQuestionList",
//                 query: `
//                     query userProgressQuestionList($filters: UserProgressQuestionListInput) {
//                         userProgressQuestionList(filters: $filters) {
//                             totalNum
//                             questions {
//                                 frontendId
//                                 title
//                                 titleSlug
//                                 difficulty
//                                 lastSubmittedAt
//                                 numSubmitted
//                                 status
//                             }
//                         }
//                     }
//                 `,
//                 variables: {
//                     filters: {
//                         skip,
//                         limit,
//                         username,
//                     },
//                 },
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         return response.data.data.userProgressQuestionList;
//     } catch (err) {
//         console.error(
//             err.response?.data || err.message
//         );

//         throw new Error("Failed to fetch solved problems.");
//     }
// };

// module.exports = {
//     getSolvedProblems,
// };