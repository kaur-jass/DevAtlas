require("dotenv").config();

const mongoose = require("mongoose");

const {
    importLeetCodeProblems,
} = require("../src/services/importers/leetcodeProblemImporter");

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        await importLeetCodeProblems();

        console.log("✅ Import Finished");

        process.exit(0);

        } catch (err) {
        console.error("ERROR MESSAGE:");
        console.error(err.message);

        console.error("\nFULL ERROR:");
        console.error(err);

        process.exit(1);
    }
}

run();