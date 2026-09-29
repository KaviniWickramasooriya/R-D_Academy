const db = require("../db");
const { syncApplicationToSheet } = require("../utils/sheetSync");

const generateAppRef = async () => {
  const year = new Date().getFullYear();
  const result = await db.query("SELECT COUNT(*) FROM applications WHERE EXTRACT(YEAR FROM submitted_at) = $1", [year]);
  const count = parseInt(result.rows[0].count) + 1;
  return `RD-${year}-${count.toString().padStart(4, '0')}`;
};

exports.submitApplication = async (req, res) => {
  try {
    const data = req.body;
    
    const diff_ms = Date.now() - new Date(data.dob).getTime();
    data.age = Math.abs(new Date(diff_ms).getUTCFullYear() - 1970);

    if (data.age < 18 && (!data.parent_name || !data.parent_contact)) {
      return res.status(400).json({ message: "Parent/Guardian details are required for applicants under 18." });
    }

    const application_ref = await generateAppRef();

    const query = `
      INSERT INTO applications (
        application_ref, academy_category, course_name, first_name, last_name, 
        dob, age, gender, nic_passport, email, mobile_number, whatsapp_number, 
        address, city, school_education, parent_name, parent_relationship, 
        parent_contact, parent_email, parent_address, emergency_contact, 
        medical_conditions, previous_experience
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
        $17, $18, $19, $20, $21, $22, $23
      ) RETURNING *`;

    const values = [
      application_ref, data.academy_category, data.course_name, data.first_name, data.last_name,
      data.dob, data.age, data.gender, data.nic_passport, data.email, data.mobile_number, data.whatsapp_number,
      data.address, data.city, data.school_education, data.parent_name, data.parent_relationship,
      data.parent_contact, data.parent_email, data.parent_address, data.emergency_contact,
      data.medical_conditions, data.previous_experience
    ];

    const result = await db.query(query, values);
    const newApp = result.rows[0];

    // Instantly sync the new application to Google Sheets
    syncApplicationToSheet(newApp);
    
    res.status(201).json({ 
      message: "Your application has been submitted successfully.", 
      application_ref: newApp.application_ref 
    });
  } catch (error) {
    console.error("Submit application error:", error);
    res.status(500).json({ message: "Failed to submit application." });
  }
};