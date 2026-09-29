const db = require("../db");
const { sendStatusUpdateEmail } = require("../utils/emailService");
const { syncApplicationToSheet } = require("../utils/sheetSync");

exports.getApplications = async (req, res) => {
  try {
    const { course, category, status, date, search } = req.query;
    let query = "SELECT * FROM applications WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (course) { query += ` AND course_name = $${paramIndex++}`; params.push(course); }
    if (category) { query += ` AND academy_category = $${paramIndex++}`; params.push(category); }
    if (status) { query += ` AND status = $${paramIndex++}`; params.push(status); }
    if (date) { query += ` AND DATE(submitted_at) = $${paramIndex++}`; params.push(date); }
    if (search) {
      query += ` AND (first_name ILIKE $${paramIndex} OR last_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR application_ref ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += " ORDER BY submitted_at DESC";
    const result = await db.query(query, params);
    
    res.json({
      data: result.rows,
      pagination: { page: 1, totalPages: 1 }
    });
  } catch (error) {
    console.error("Fetch applications error:", error);
    res.status(500).json({ message: "Failed to fetch applications." });
  }
};

exports.getApplicationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const appResult = await db.query("SELECT * FROM applications WHERE id = $1", [id]);
    if (appResult.rows.length === 0) {
      return res.status(404).json({ message: "Application not found." });
    }

    const notesResult = await db.query(
      "SELECT n.*, a.name as admin_name FROM application_notes n LEFT JOIN admins a ON n.admin_id = a.id WHERE n.application_id = $1 ORDER BY n.created_at DESC",
      [id]
    );

    const historyResult = await db.query(
      "SELECT * FROM application_history WHERE application_id = $1 ORDER BY changed_at DESC",
      [id]
    );

    res.json({
      application: appResult.rows[0],
      notes: notesResult.rows,
      history: historyResult.rows
    });
  } catch (error) {
    console.error("Get details error:", error);
    res.status(500).json({ message: "Failed to fetch application details." });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason, batch_id } = req.body;

    const appQuery = await db.query("SELECT * FROM applications WHERE id = $1", [id]);
    if (appQuery.rows.length === 0) {
      return res.status(404).json({ message: "Application not found." });
    }
    const applicant = appQuery.rows[0];

    let accessCode = applicant.access_code;
    let paymentStatus = applicant.payment_status;

    // If approved, automatically set payment status to Paid and generate access code
    if (status === "Approved") {
      paymentStatus = "Paid";
      if (!accessCode) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        accessCode = '';
        for (let i = 0; i < 8; i++) {
          accessCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
      }
    }

    // Update PostgreSQL for ALL statuses (Pending, Under Review, Approved, Rejected)
    await db.query(
      `UPDATE applications 
       SET status = $1, rejection_reason = $2, payment_status = $3, batch_id = COALESCE($4, batch_id), access_code = $5 
       WHERE id = $6`, 
      [status, reason || null, paymentStatus, batch_id || null, accessCode || null, id]
    );

    await db.query(
      "INSERT INTO application_history (application_id, to_status, reason) VALUES ($1, $2, $3)",
      [id, status, reason || null]
    );

    const updatedRes = await db.query("SELECT * FROM applications WHERE id = $1", [id]);
    const updatedApp = updatedRes.rows[0];
    
    // Push sync to Google Sheet immediately for ANY status change
    syncApplicationToSheet(updatedApp);

    // Send email notification (with access code if approved)
    sendStatusUpdateEmail(applicant.email, applicant.first_name, status, reason, accessCode);

    res.json({ message: `Application status updated to ${status}.`, access_code: accessCode });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update status." });
  }
};

exports.addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const adminId = req.admin?.id || null;

    const result = await db.query(
      "INSERT INTO application_notes (application_id, admin_id, note) VALUES ($1, $2, $3) RETURNING *",
      [id, adminId, note]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Add note error:", error);
    res.status(500).json({ message: "Failed to add note." });
  }
};

exports.approvePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { batch_id } = req.body;
    
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let accessCode = '';
    for (let i = 0; i < 8; i++) accessCode += chars.charAt(Math.floor(Math.random() * chars.length));

    await db.query(
      "UPDATE applications SET payment_status = 'Paid', batch_id = $1, access_code = $2 WHERE id = $3",
      [batch_id, accessCode, id]
    );

    res.json({ message: "Payment approved.", access_code: accessCode });
  } catch (error) {
    console.error("Approve payment error:", error);
    res.status(500).json({ message: "Failed to approve payment." });
  }
};