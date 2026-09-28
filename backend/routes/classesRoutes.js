const express = require("express");
const { getPublicSchedule } = require("../controllers/classesController");
const router = express.Router();

router.get("/schedule", getPublicSchedule);
module.exports = router;