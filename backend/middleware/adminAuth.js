const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const signAdminToken = (admin) => {
  return jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { adminAuth, signAdminToken };