const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const accountRoutes = require("./routes/accountRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const trackRoutes = require("./routes/trackRoutes");

const app = express();
console.log("🔥 APP.JS LOADED");
app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tracks", trackRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevAtlas Backend Running 🚀",
  });
});

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Working",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});


module.exports = app;