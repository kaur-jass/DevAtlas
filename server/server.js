require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

console.log("🚀 SERVER.JS LOADED");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`
    =================================
    DevAtlas Backend Started
    Server: http://localhost:${PORT}
    =================================
 `);
});