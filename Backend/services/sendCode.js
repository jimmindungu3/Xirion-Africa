const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

function generateVerificationCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excludes 0, O, I, 1
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function sendVerificationCode(email, verificationCode) {
  try {
    const mailOptions = {
      from: `Xirion Africa <${process.env.MY_EMAIL}>`,
      to: email,
      subject: "Xirion Africa - Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="text-align: center; color: #ff6600;">XIRION AFRICA</h2>
          <p style="font-size: 16px; color: #555;">Thank you for signing up. To complete your registration, use the verification code below:</p>
          <div style="font-size: 16px; font-weight: bold; color: #FF6600; text-align: center; margin: 20px 0;">${verificationCode}</div>
          <p style="font-size: 16px; color: #555;">This code is valid for <strong>30 minutes</strong>. If you did not request this, please ignore this email.</p>
          
          <hr style="margin-top: 30px; margin-bottom: 0;">

          <div style="font-size: 14px; color: #888; text-align: center;">
            <p style="margin: 0;">Why shop with us?</p>
            <p style="margin: 4px 0;">Affordable quality. Ethical sourcing. Fast shipping. Easy returns.</p>
            <p style="margin-top: 12px 0;">Follow Us: 
              <a href="#" style="text-decoration: none; color: #3b5998;">Facebook</a> | 
              <a href="#" style="text-decoration: none; color: #000;">TikTok</a> | 
              <a href="#" style="text-decoration: none; color: #C13584;">Instagram</a> | 
              <a href="#" style="text-decoration: none; color: #000;">Twitter</a>
            </p>
            <p style="margin-top: 12px;">&copy; ${new Date().getFullYear()} Xirion Africa. All rights reserved.</p>
          </div>
        </div>
      `,
    };
    const transporterResponse = await transporter.sendMail(mailOptions);
    return transporterResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendVerificationCode, generateVerificationCode };
