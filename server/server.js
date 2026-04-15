require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Node.js Express Backend",
    port: PORT,
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy",
    uptime: process.uptime()
  });
});

app.get("/api/data", (req, res) => {
  res.json({
    data: [
      { id: 1, name: "Item 1", description: "First item" },
      { id: 2, name: "Item 2", description: "Second item" },
      { id: 3, name: "Item 3", description: "Third item" }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "production"}`);
  console.log(`Database URL: ${process.env.DB_URL || "not configured"}`);
});
