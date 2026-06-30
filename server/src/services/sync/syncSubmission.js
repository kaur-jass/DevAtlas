const LeetCodeSubmission = require("../../models/leetcode/LeetCodeSubmission");
const LeetCodeProblem = require("../../models/leetcode/LeetCodeProblem");
const UserLeetCodeProblem = require("../../models/leetcode/UserLeetCodeProblem");

const {
    getRecentSubmissions,
    getAcceptedSubmissions,
} = require("../platforms/leetcodeService");

const syncSubmission = async (userId, username) => {

    console.log("===== SYNC SUBMISSION =====");
    console.log("User:", userId);
    console.log("Username:", username);
    // Fetch data
    const recentResponse =
    await getRecentSubmissions(username);

    const acceptedResponse =
        await getAcceptedSubmissions(username);

    const recentSubmissions =
        recentResponse.submission || [];

    const acceptedSubmissions =
        acceptedResponse.submission || [];

    console.log("Recent:", recentSubmissions.length);
    console.log("Accepted:", acceptedSubmissions.length);

    // Remove previous submissions
    await LeetCodeSubmission.deleteMany({
        user: userId,
    });

    const allSubmissions = [];

    // Recent submissions
    if (Array.isArray(recentSubmissions)) {

        for (const submission of recentSubmissions) {

            allSubmissions.push({

                user: userId,

                submissionId:
                    submission.id ||
                    submission.submissionId ||
                    "",

                questionId:
                    submission.questionId || 0,

                questionTitle:
                    submission.title ||
                    submission.questionTitle ||
                    "",

                questionSlug:
                    submission.titleSlug ||
                    submission.questionSlug ||
                    "",

                difficulty:
                    submission.difficulty ||
                    "",

                language:
                    submission.lang ||
                    submission.language ||
                    "",

                runtime:
                    submission.runtime ||
                    "",

                memory:
                    submission.memory ||
                    "",

                status:
                    submission.statusDisplay ||
                    submission.status ||
                    "",

                timestamp:
                    submission.timestamp || 0,

                submittedAt:
                    submission.timestamp
                        ? new Date(submission.timestamp * 1000)
                        : new Date(),

                url:
                    submission.url || "",

                isAccepted:
                    submission.statusDisplay === "Accepted",

            });

        }

    }

    // Accepted submissions (avoid duplicates)
    if (Array.isArray(acceptedSubmissions)) {

        for (const submission of acceptedSubmissions) {


            const alreadyExists = allSubmissions.find(
                item =>
                    item.submissionId ===
                    (submission.id || submission.submissionId)
            );

            if (!alreadyExists) {

                allSubmissions.push({

                    user: userId,

                    submissionId:
                        submission.id ||
                        submission.submissionId ||
                        "",

                    questionId:
                        submission.questionId || 0,

                    questionTitle:
                        submission.title ||
                        submission.questionTitle ||
                        "",

                    questionSlug:
                        submission.titleSlug ||
                        submission.questionSlug ||
                        "",

                    difficulty:
                        submission.difficulty ||
                        "",

                    language:
                        submission.lang ||
                        submission.language ||
                        "",

                    runtime:
                        submission.runtime ||
                        "",

                    memory:
                        submission.memory ||
                        "",

                    status: "Accepted",

                    timestamp:
                        submission.timestamp || 0,

                    submittedAt:
                        submission.timestamp
                            ? new Date(submission.timestamp * 1000)
                            : new Date(),

                    url:
                        submission.url || "",

                    isAccepted: true,

                });

            }

        }

    }

    if (allSubmissions.length > 0) {

        await LeetCodeSubmission.insertMany(allSubmissions);

    }
            
    // =========================================
    // Update UserLeetCodeProblem from accepted submissions
    // =========================================

    const accepted = allSubmissions.filter(
        submission => submission.isAccepted
    );

    for (const submission of accepted) {

        console.log("Looking for:", submission.questionSlug);

        const problem = await LeetCodeProblem.findOne({
            titleSlug: submission.questionSlug,
        });

        if (!problem) {
            console.log("❌ Problem not found:", submission.questionSlug);
            continue;
        }

        console.log("✅ Found:", submission.questionSlug);

        await UserLeetCodeProblem.findOneAndUpdate(

            {
                user: userId,
                problem: problem._id,
            },

            {
                $set: {
                    status: "Solved",
                    solved: true,
                    solvedAt: submission.submittedAt,
                },

                $max: {
                    attempts: 1,
                },
            },

            {
                upsert: true,
                new: true,
            }

        );

        }

    return allSubmissions.length;
};

module.exports = syncSubmission;