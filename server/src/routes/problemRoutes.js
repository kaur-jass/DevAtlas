const express = require("express");

const router = express.Router();

const {
    getAllProblems,
    getSingleProblem,
} = require("../controllers/problemController");

router.get("/", getAllProblems);

router.get("/:slug", getSingleProblem);

module.exports = router;