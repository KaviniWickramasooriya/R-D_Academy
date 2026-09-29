const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { submitApplication } = require("./controllers/applicationController");
const { login } = require("./controllers/authController");
const adminRoutes = require("./routes/adminRoutes");
const classesWebhookRoutes = require("./routes/classesWebhookRoutes");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/classes", classesWebhookRoutes);

// Public Routes
app.post("/api/applications", submitApplication);
app.post("/api/auth/login", login);

// Admin Routes (Protected)
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 R&D Academy Server running on port ${PORT}`);
});