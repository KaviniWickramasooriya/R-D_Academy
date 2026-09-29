const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendStatusUpdateEmail = async (studentEmail, firstName, status, reason, accessCode) => {
  try {
    let statusColor = "#d4af37";
    if (status === "Approved") statusColor = "#10b981";
    if (status === "Rejected") statusColor = "#f43f5e";
    if (status === "Under Review") statusColor = "#38bdf8";

    let subject = `R & D Academy: Application Status Update (${status})`;
    
    let htmlContent = `
      <div style="background-color: #050505; padding: 40px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #121212; border: 1px solid #262626; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Top Gold Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #d4af37, #ebd083, #d4af37);"></td>
          </tr>

          <!-- Header with Academy Branding -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #1f1f1f;">
              <h1 style="color: #f5f5f4; font-family: Georgia, serif; font-size: 24px; font-weight: normal; letter-spacing: 2px; margin: 0 0 8px 0;">
                R & D <span style="color: #d4af37; font-style: italic;">Academy</span>
              </h1>
              <p style="color: #737373; font-size: 9px; text-transform: uppercase; letter-spacing: 4px; margin: 0;">
                Fine Arts & Vocal Studio · Colombo
              </p>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #d4af37; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 15px 0;">
                Official Notification
              </p>
              
              <h2 style="color: #f5f5f4; font-family: Georgia, serif; font-size: 22px; font-weight: normal; margin: 0 0 20px 0;">
                Dear ${firstName},
              </h2>
              
              <p style="color: #a3a3a3; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">
                Your student application status with the R & D Academy has been officially updated by our management desk.
              </p>

              <!-- Status Badge Box -->
              <div style="background-color: #1a1a1a; border: 1px solid #292524; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 25px;">
                <span style="color: #737373; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 8px;">Current Status</span>
                <span style="color: ${statusColor}; font-family: Georgia, serif; font-size: 20px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
                  ${status}
                </span>
              </div>
    `;

    if (status === "Rejected" && reason) {
      htmlContent += `
              <div style="background-color: #1c1917; border-left: 3px solid #f43f5e; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                <p style="color: #f43f5e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; font-weight: bold;">Reason for Rejection</p>
                <p style="color: #d6d3d1; font-size: 13px; line-height: 1.5; margin: 0;">${reason}</p>
              </div>
      `;
    } else if (status === "Approved") {
      htmlContent += `
              <div style="background-color: #064e3b20; border: 1px solid #10b98140; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <p style="color: #34d399; font-size: 13px; line-height: 1.6; margin: 0 0 15px 0;">
                  <strong>Congratulations!</strong> Your application has been approved. Use your secure access code below on the <a href="http://localhost:5173/my-class" style="color: #d4af37; text-decoration: underline;">My Class Portal</a> to view your live Zoom link, passcode, and schedule[cite: 3].
                </p>
      `;

      if (accessCode) {
        htmlContent += `
                <div style="background-color: #0f172a; border: 1px dashed #d4af37; border-radius: 6px; padding: 15px; text-align: center;">
                  <span style="color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 4px;">Your Personal Access Code</span>
                  <span style="color: #d4af37; font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 3px;">${accessCode}</span>
                </div>
        `;
      }

      htmlContent += `
              </div>
      `;
    }

    htmlContent += `
              <p style="color: #737373; font-size: 13px; line-height: 1.6; margin: 0 0 35px 0;">
                If you have any inquiries regarding your registration or studio schedules, please reach out directly through our official communication channels.
              </p>

              <!-- Administrative Desk Signature Block -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #1f1f1f; padding-top: 25px;">
                <tr>
                  <td>
                    <p style="color: #f5f5f4; font-size: 13px; font-weight: bold; margin: 0 0 4px 0; font-family: Georgia, serif;">
                      Administration Desk
                    </p>
                    <p style="color: #d4af37; font-size: 11px; margin: 0 0 2px 0; letter-spacing: 0.5px;">
                      R & D Academy & Studio
                    </p>
                    <p style="color: #737373; font-size: 11px; margin: 0;">
                      3rd Floor, 30 Queen's Rd, Colombo 00300
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Copyright -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 20px 40px; text-align: center; border-top: 1px solid #1f1f1f;">
              <p style="color: #525252; font-size: 10px; letter-spacing: 1px; margin: 0; text-transform: uppercase;">
                © ${new Date().getFullYear()} R & D Academy. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"R & D Academy" <${process.env.SMTP_USER}>`,
      to: studentEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`Luxury styled email notification with access code successfully sent to ${studentEmail}`);
  } catch (error) {
    console.error("Failed to send status update email:", error);
  }
};