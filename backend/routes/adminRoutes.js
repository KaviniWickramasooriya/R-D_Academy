const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAuth } = require("../middleware/adminAuth");

// Protected Admin Routes for Applications & Management
router.get("/applications", adminAuth, adminController.getApplications);
router.get("/applications/:id", adminAuth, adminController.getApplicationDetails);
router.put("/applications/:id/status", adminAuth, adminController.updateStatus);
router.post("/applications/:id/notes", adminAuth, adminController.addNote); // Line 11 check
router.post("/applications/:id/approve-payment", adminAuth, adminController.approvePayment);

module.exports = router;