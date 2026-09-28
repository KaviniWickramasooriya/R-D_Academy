const express = require("express");
const { 
  getApplications, 
  getApplicationDetails, 
  updateStatus, 
  addNote, 
  approvePayment 
} = require("../controllers/adminController");
const { adminAuth } = require("../middleware/adminAuth");

const router = express.Router();

router.use(adminAuth);

router.get("/applications", getApplications);
router.get("/applications/:id", getApplicationDetails);
router.put("/applications/:id/status", updateStatus);
router.post("/applications/:id/notes", addNote);
router.put("/applications/:id/approve-payment", approvePayment);

module.exports = router;