const {
    importLeetCodeProblems,
} = require("../../services/importers/leetcodeProblemImporter");

const importProblems = async (req, res) => {

    try {

        await importLeetCodeProblems();

        res.status(200).json({
            success: true,
            message: "Import completed.",
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

module.exports = {
    importProblems,
};