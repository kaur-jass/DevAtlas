const {
    getProblems,
    getProblemBySlug,
} = require("../services/problemService");

const getAllProblems = async (req, res) => {

    try {

        const data = await getProblems(req.query);

        res.status(200).json({
            success: true,
            ...data,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

const getSingleProblem = async (req, res) => {

    try {

        const problem = await getProblemBySlug(
            req.params.slug
        );

        if (!problem) {

            return res.status(404).json({
                success: false,
                message: "Problem not found.",
            });

        }

        res.status(200).json({
            success: true,
            problem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

module.exports = {
    getAllProblems,
    getSingleProblem,
};