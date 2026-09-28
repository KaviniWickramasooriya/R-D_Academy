const db = require("../db");

exports.getPublicSchedule = async (req, res) => {
  try {
    const result = await db.query("SELECT session_date, session_time, course_name, batch_id, topic, status, note FROM schedule WHERE session_date >= CURRENT_DATE ORDER BY session_date ASC");
    res.json({ ok: true, sessions: result.rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to fetch schedule." });
  }
};

exports.getPrivateAccess = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code || code.length < 6) return res.status(400).json({ ok: false, error: "Invalid access code." });

    const appResult = await db.query("SELECT first_name, batch_id, payment_status FROM applications WHERE UPPER(access_code) = $1", [code.toUpperCase()]);
    const student = appResult.rows[0];
    
    if (!student || student.payment_status !== 'Paid') {
      return res.status(403).json({ ok: false, error: "This code is not active. Please message us on WhatsApp." });
    }

    const batchResult = await db.query("SELECT * FROM batches WHERE batch_id = $1 AND is_active = true", [student.batch_id]);
    const scheduleResult = await db.query("SELECT * FROM schedule WHERE batch_id = $1", [student.batch_id]);
    const recordingsResult = await db.query("SELECT * FROM recordings WHERE batch_id = $1", [student.batch_id]);

    res.json({
      ok: true,
      studentName: student.first_name,
      className: batchResult.rows[0].course_name,
      batchName: batchResult.rows[0].batch_name,
      zoomLink: batchResult.rows[0].zoom_link,
      passcode: batchResult.rows[0].passcode,
      sessions: scheduleResult.rows,
      recordings: recordingsResult.rows
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: "Failed to verify access." });
  }
};