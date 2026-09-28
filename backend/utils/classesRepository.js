const db = require("../db");

const generateAccessCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const getPublicSchedule = async () => {
  const result = await db.query(`
    SELECT session_date, session_time, course_name, batch_id, topic, status, note 
    FROM schedule 
    WHERE session_date >= CURRENT_DATE 
    ORDER BY session_date ASC
  `);
  return result.rows;
};

const getPrivateClassAccess = async (accessCode) => {
  const appResult = await db.query(
    "SELECT first_name, batch_id, payment_status FROM applications WHERE UPPER(access_code) = $1", 
    [accessCode.toUpperCase()]
  );
  
  const student = appResult.rows[0];
  if (!student || student.payment_status !== 'Paid') {
    throw new Error('This code is not active. Please message us on WhatsApp.');
  }

  const batchResult = await db.query("SELECT * FROM batches WHERE batch_id = $1 AND is_active = true", [student.batch_id]);
  const batch = batchResult.rows[0];
  if (!batch) {
    throw new Error('Your batch is not ready yet.');
  }

  const scheduleResult = await db.query("SELECT * FROM schedule WHERE batch_id = $1 AND session_date >= CURRENT_DATE", [student.batch_id]);
  const recordingsResult = await db.query("SELECT * FROM recordings WHERE batch_id = $1", [student.batch_id]);

  return {
    studentName: student.first_name,
    className: batch.course_name,
    batchName: batch.batch_name,
    zoomLink: batch.zoom_link,
    passcode: batch.passcode,
    sessions: scheduleResult.rows,
    recordings: recordingsResult.rows
  };
};

const approvePaymentAndGenerateCode = async (applicationRef, batchId) => {
  const accessCode = generateAccessCode();
  const result = await db.query(
    `UPDATE applications 
     SET payment_status = 'Paid', batch_id = $1, access_code = $2 
     WHERE application_ref = $3 RETURNING access_code`,
    [batchId, accessCode, applicationRef]
  );
  return result.rows[0];
};

module.exports = { getPublicSchedule, getPrivateClassAccess, approvePaymentAndGenerateCode };