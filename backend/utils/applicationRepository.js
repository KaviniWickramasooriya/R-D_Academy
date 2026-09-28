const db = require("../db");

const generateAppRef = async () => {
  const year = new Date().getFullYear();
  const result = await db.query(
    "SELECT COUNT(*) FROM applications WHERE EXTRACT(YEAR FROM submitted_at) = $1", 
    [year]
  );
  const count = parseInt(result.rows[0].count) + 1;
  return `RD-${year}-${count.toString().padStart(4, '0')}`;
};

const createApplication = async (data) => {
  const application_ref = await generateAppRef();
  const query = `
    INSERT INTO applications (
      application_ref, academy_category, course_name, first_name, last_name, 
      dob, age, gender, nic_passport, email, mobile, whatsapp, address, city, 
      school_education, parent_name, parent_relationship, parent_contact, 
      parent_email, parent_address, emergency_contact, medical_conditions, previous_experience
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
    ) RETURNING application_ref, status`;
    
  const values = [
    application_ref, data.academy_category, data.course_name, data.first_name, data.last_name,
    data.dob, data.age, data.gender, data.nic_passport, data.email, data.mobile, data.whatsapp,
    data.address, data.city, data.school_education, data.parent_name, data.parent_relationship,
    data.parent_contact, data.parent_email, data.parent_address, data.emergency_contact,
    data.medical_conditions, data.previous_experience
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

const listApplications = async (filters) => {
  // Base query
  let query = "SELECT * FROM applications WHERE 1=1";
  const params = [];
  let paramIndex = 1;

  if (filters.status) {
    query += ` AND status = $${paramIndex++}`;
    params.push(filters.status);
  }
  if (filters.course) {
    query += ` AND course_name = $${paramIndex++}`;
    params.push(filters.course);
  }
  
  query += " ORDER BY submitted_at DESC";
  const result = await db.query(query, params);
  return result.rows;
};

module.exports = { createApplication, listApplications };