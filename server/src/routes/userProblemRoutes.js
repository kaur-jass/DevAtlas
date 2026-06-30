const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    bookmarkProblem,
    revisionProblem,
    updateProblemStatus,
    updateProblemConfidence,
    updateProblemNotes,
    incrementProblemAttempts,
    getProblem,
    getProblems,
} = require("../controllers/userProblemController");

router.patch(
    "/:slug/bookmark",
    protect,
    bookmarkProblem
);

router.patch(
    "/:slug/revision",
    protect,
    revisionProblem
);

router.patch(
    "/:slug/status",
    protect,
    updateProblemStatus
);

router.patch(
    "/:slug/confidence",
    protect,
    updateProblemConfidence
);

router.patch(
    "/:slug/notes",
    protect,
    updateProblemNotes
);

router.patch(
    "/:slug/attempt",
    protect,
    incrementProblemAttempts
);

router.get(
    "/:slug",
    protect,
    getProblem
);

router.get(
    "/",
    protect,
    getProblems
);

module.exports = router;