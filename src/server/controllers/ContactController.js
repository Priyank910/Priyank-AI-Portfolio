import { sendContactEmail } from "../services/emailService.js";
import {
  sanitizeContactInput,
  validateContactInput,
} from "../utils/contactValidation.js";

export async function submitContact(req, res) {
  try {
    const validation = validateContactInput(req.body);

    if (!validation.valid) {
      res.status(400).json({
        success: false,
        message: validation.message,
      });
      return;
    }

    const sanitized = sanitizeContactInput(req.body);

    await sendContactEmail(sanitized);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("Contact form error:", err);

    if (err.message === "EMAIL_NOT_CONFIGURED") {
      res.status(503).json({
        success: false,
        message: "Email service is not configured. Please try again later.",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}
