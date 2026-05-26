import nodemailer from "nodemailer";
import validator from "validator";

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function buildContactEmailHtml({ name, email, subject, message, timestamp }) {
  const safeName = validator.escape(name);
  const safeEmail = validator.escape(email);
  const safeSubject = validator.escape(subject);
  const safeMessage = validator.escape(message);
  const safeTimestamp = validator.escape(timestamp);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Inter,Arial,sans-serif;color:#e4e4e7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111113;border:1px solid #27272a;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:24px 28px;background:linear-gradient(135deg,#083344 0%,#111113 100%);border-bottom:1px solid #27272a;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#22d3ee;">Portfolio Contact</p>
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#fafafa;">New inquiry from your website</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
                <tr>
                  <td style="padding:10px 0;color:#71717a;width:110px;vertical-align:top;">Name</td>
                  <td style="padding:10px 0;color:#fafafa;font-weight:600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#71717a;vertical-align:top;">Email</td>
                  <td style="padding:10px 0;">
                    <a href="mailto:${safeEmail}" style="color:#22d3ee;text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#71717a;vertical-align:top;">Subject</td>
                  <td style="padding:10px 0;color:#fafafa;">${safeSubject}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#71717a;vertical-align:top;">Received</td>
                  <td style="padding:10px 0;color:#a1a1aa;font-family:monospace;font-size:12px;">${safeTimestamp}</td>
                </tr>
              </table>
              <div style="margin-top:20px;padding:16px;background:#09090b;border:1px solid #27272a;border-radius:12px;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">Message</p>
                <p style="margin:0;white-space:pre-wrap;color:#e4e4e7;font-size:14px;line-height:1.7;">${safeMessage}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;border-top:1px solid #27272a;background:#09090b;">
              <p style="margin:0;font-size:11px;color:#52525b;">Sent via priyank.ai contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendContactEmail({ name, email, subject, message }) {
  const transporter = getTransporter();
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const html = buildContactEmailHtml({
    name,
    email,
    subject,
    message,
    timestamp,
  });

  const recipient = process.env.EMAIL_USER;
  const mailSubject =
    subject && subject !== "No subject provided"
      ? `[Portfolio] ${subject}`
      : `[Portfolio] New message from ${name}`;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${recipient}>`,
    to: recipient,
    replyTo: email,
    subject: mailSubject,
    html,
    text: [
      "New portfolio contact inquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Received: ${timestamp}`,
      "",
      "Message:",
      message,
    ].join("\n"),
  });
}
