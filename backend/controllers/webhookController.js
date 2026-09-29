const db = require("../db");

exports.handleSheetWebhook = async (req, res) => {
  try {
    const { regId, status, paymentStatus, batchId, accessCode } = req.body;
    if (!regId) return res.status(400).json({ ok: false, error: "Missing regId" });

    await db.query(
      `UPDATE applications 
       SET status = COALESCE($1, status), 
           payment_status = COALESCE($2, payment_status), 
           batch_id = COALESCE($3, batch_id), 
           access_code = COALESCE($4, access_code) 
       WHERE application_ref = $5`,
      [status || null, paymentStatus || null, batchId || null, accessCode || null, regId]
    );

    console.log(`✅ PostgreSQL updated from Google Sheet webhook for: ${regId}`);
    res.json({ ok: true, message: "PostgreSQL synchronized successfully" });
  } catch (error) {
    console.error("Webhook database update error:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};