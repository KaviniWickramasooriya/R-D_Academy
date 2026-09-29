const express = require("express");
const { handleSheetWebhook } = require("../controllers/webhookController");
const router = express.Router();

router.post("/webhook", handleSheetWebhook);
module.exports = router;