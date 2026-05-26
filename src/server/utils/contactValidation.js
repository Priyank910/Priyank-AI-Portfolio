import validator from "validator";

const MIN_MESSAGE_LENGTH = 10;
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

export function sanitizeContactInput(body = {}) {
  const name = validator.trim(String(body.name || "")).slice(0, MAX_NAME_LENGTH);
  const emailRaw = validator.trim(String(body.email || "")).toLowerCase();
  const email = validator.normalizeEmail(emailRaw) || emailRaw;
  const subject = validator.trim(String(body.subject || "")).slice(0, MAX_SUBJECT_LENGTH);
  const message = validator.trim(String(body.message || "")).slice(0, MAX_MESSAGE_LENGTH);

  return {
    name,
    email,
    subject: subject || "No subject provided",
    message,
  };
}

export function validateContactInput(body = {}) {
  const name = validator.trim(String(body.name || ""));
  const email = validator.trim(String(body.email || ""));
  const subject = validator.trim(String(body.subject || ""));
  const message = validator.trim(String(body.message || ""));

  if (!name) {
    return { valid: false, message: "Name is required." };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { valid: false, message: `Name must be ${MAX_NAME_LENGTH} characters or fewer.` };
  }

  if (!email) {
    return { valid: false, message: "Email is required." };
  }

  if (!validator.isEmail(email)) {
    return { valid: false, message: "Please enter a valid email address." };
  }

  if (subject.length > MAX_SUBJECT_LENGTH) {
    return {
      valid: false,
      message: `Subject must be ${MAX_SUBJECT_LENGTH} characters or fewer.`,
    };
  }

  if (!message) {
    return { valid: false, message: "Message is required." };
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return {
      valid: false,
      message: `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`,
    };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    };
  }

  return { valid: true };
}

export const CONTACT_RULES = {
  MIN_MESSAGE_LENGTH,
};
