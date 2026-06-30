const {
    toggleBookmark,
    toggleRevision, 
    updateStatus,
    updateConfidence, 
    updateNotes,
    incrementAttempts,
    getUserProblem,
    getAllUserProblems,
} = require("../services/userProblemService");

const bookmarkProblem = async (req, res) => {

    try {

        const userProblem = await toggleBookmark(
            req.user.id,
            req.params.slug
        );

        res.status(200).json({
            success: true,
            userProblem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

const revisionProblem = async (req, res) => {

    try {

        const userProblem = await toggleRevision(
            req.user.id,
            req.params.slug
        );

        res.status(200).json({
            success: true,
            userProblem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};
const updateProblemStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const userProblem = await updateStatus(
            req.user.id,
            req.params.slug,
            status
        );

        res.status(200).json({
            success: true,
            userProblem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

const updateProblemConfidence = async (req, res) => {

    try {

        const { confidence } = req.body;

        const userProblem =
            await updateConfidence(
                req.user.id,
                req.params.slug,
                confidence
            );

        res.status(200).json({
            success: true,
            userProblem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

const updateProblemNotes = async (req, res) => {

    try {

        const { notes } = req.body;

        const userProblem = await updateNotes(
            req.user.id,
            req.params.slug,
            notes
        );

        res.status(200).json({
            success: true,
            userProblem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

const incrementProblemAttempts = async (req, res) => {

    try {

        const userProblem = await incrementAttempts(
            req.user.id,
            req.params.slug
        );

        res.status(200).json({
            success: true,
            userProblem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

const getProblem = async (req, res) => {

    try {

        const data = await getUserProblem(
            req.user.id,
            req.params.slug
        );

        res.status(200).json({
            success: true,
            problem: data.problem,
            userProblem: data.userProblem,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

const getProblems = async (req, res) => {
    try {

        const data = await getAllUserProblems(
            req.user.id,
            req.query
        );

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

module.exports = {
    bookmarkProblem,
    revisionProblem,
    updateProblemStatus, 
    updateProblemConfidence, 
    updateProblemNotes,
    incrementProblemAttempts,
    getProblem,
    getProblems,
};