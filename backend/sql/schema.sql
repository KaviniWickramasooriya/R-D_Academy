CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin'
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  application_ref VARCHAR(20) UNIQUE NOT NULL,
  academy_category VARCHAR(100) NOT NULL,
  course_name VARCHAR(150) NOT NULL,
  
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(30),
  nic_passport VARCHAR(50),
  
  email VARCHAR(150) NOT NULL,
  mobile_number VARCHAR(20) NOT NULL,
  whatsapp_number VARCHAR(20),
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  school_education VARCHAR(150),
  
  parent_name VARCHAR(150),
  parent_relationship VARCHAR(60),
  parent_contact VARCHAR(30),
  parent_email VARCHAR(150),
  parent_address TEXT,
  
  emergency_contact VARCHAR(150),
  medical_conditions TEXT,
  previous_experience TEXT,
  
  status VARCHAR(50) DEFAULT 'Pending',
  rejection_reason TEXT,
  
  payment_status VARCHAR(50) DEFAULT 'Not Paid',
  batch_id VARCHAR(50),
  access_code VARCHAR(8) UNIQUE, 
  
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE application_notes (
  id SERIAL PRIMARY KEY,
  application_id INT REFERENCES applications(id) ON DELETE CASCADE,
  admin_id INT REFERENCES admins(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE batches (
  batch_id VARCHAR(50) PRIMARY KEY,
  course_name VARCHAR(150) NOT NULL,
  batch_name VARCHAR(100) NOT NULL,
  zoom_link VARCHAR(255) NOT NULL,
  passcode VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE schedule (
  id SERIAL PRIMARY KEY,
  session_date DATE NOT NULL,
  session_time VARCHAR(50) NOT NULL,
  course_name VARCHAR(150) NOT NULL,
  batch_id VARCHAR(50) REFERENCES batches(batch_id),
  topic VARCHAR(200),
  status VARCHAR(50) DEFAULT 'Scheduled',
  note TEXT
);

CREATE TABLE recordings (
  id SERIAL PRIMARY KEY,
  batch_id VARCHAR(50) REFERENCES batches(batch_id),
  session_date DATE NOT NULL,
  title VARCHAR(200) NOT NULL,
  link VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS application_history (
    id SERIAL PRIMARY KEY,
    application_id INT REFERENCES applications(id) ON DELETE CASCADE,
    to_status VARCHAR(50) NOT NULL,
    reason TEXT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);