const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Student Management API is running" });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api/students", studentRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Server error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
