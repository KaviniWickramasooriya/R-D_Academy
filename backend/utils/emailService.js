const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendStatusUpdateEmail = async (studentEmail, firstName, status, reason) => {
  try {
    let subject = `R & D Academy: Application Status Update`;
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #f5f5f4; padding: 30px; border-radius: 8px;">
        <h2 style="color: #d4af37; font-family: Georgia, serif;">R & D Studio & Academy</h2>
        <p>Dear ${firstName},</p>
        <p>Your student application status has been updated to: <strong style="color: #d4af37;">${status}</strong></p>
    `;

    if (status === "Rejected" && reason) {
      htmlContent += `
        <p style="background: #1c1917; padding: 15px; border-left: 3px solid #f43f5e; margin: 20px 0;">
          <strong>Reason for Rejection:</strong> ${reason}
        </p>
      `;
    } else if (status === "Approved") {
      htmlContent += `
        <p>Congratulations! You can now proceed to settle your program fee and submit your payment slip via WhatsApp to secure your batch placement.</p>
      `;
    }

    htmlContent += `
        <p style="margin-top: 30px; font-size: 12px; color: #78716c;">Warm regards,<br/><strong>Administration Desk</strong><br/>R & D Academy, Colombo</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"R & D Academy" <${process.env.SMTP_USER}>`,
      to: studentEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`Email notification successfully sent to ${studentEmail}`);
  } catch (error) {
    console.error("Failed to send status update email:", error);
  }
};