import nodemailer from "nodemailer";
import authTemplate from "./auth_template.js";
import forgotPasswordTemplate from "./forgot_password_template.js";
import debugLogger from "../DebugLogger.js";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASSWORD,
    },
  });
}

export async function sendAuthEmail(sendTo, username, password) {
  if (!sendTo || !username || !password) {
    debugLogger.error("Missing parameters for sendAuthEmail");
    return {
      success: false,
      message: "Missing required parameters",
    };
  }

  try {
    const transporter = createTransporter();
    const htmlContent = authTemplate(username, password);

    const mailInfo = {
      from: `ElectusIA <${process.env.SMTP_AUTH_USER}>`,
      to: sendTo,
      subject: "Your account details for ElectusIA",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailInfo);

    return {
      success: true,
      message: `An email with the account information has been successfully sent to: ${sendTo}`,
      emailId: info.messageId,
    };
  } catch (err) {
    debugLogger.error(`Error sending email to ${sendTo}: ${err.message}`);
    return {
      success: false,
      message: `Failed to send email to ${sendTo}`,
      error: err.message,
    };
  }
}

export async function sendRequestPasswordChangingEmail(
  sendTo,
  username,
  token
) {
  if (!username || !sendTo || !token) {
    debugLogger.error(
      "Missing parameters for sendRequestPasswordChangingEmail"
    );
    return {
      success: false,
      message: "Missing required parameters",
    };
  }

  try {
    const transporter = createTransporter();
    const htmlContent = forgotPasswordTemplate(username, token);

    const mailInfo = {
      from: `ElectusIA <${process.env.SMTP_AUTH_USER}>`,
      to: sendTo,
      subject: "Request to change your account password.",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailInfo);

    return {
      success: true,
      message: `An email requesting to changing your password has been succesfully sent to your email.`,
      emailId: info.messageId,
    };
  } catch (err) {
    debugLogger.error(`Error sending email to ${sendTo}: ${err.message}`);
    return {
      success: false,
      message: `Failed to send email to ${sendTo}`,
      error: err.message,
    };
  }
}
