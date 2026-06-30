const express = require("express");

const router = express.Router();

const {
    importProblems,
} = require("../controllers/admin/problemImportController");

router.post(
    "/leetcode/import",
    importProblems
);

module.exports = router;