const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_TURNS = 20;
const MAX_PROJECT_ID_LENGTH = 64;

export function validateChatPayload(body = {}) {
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return { valid: false, status: 400, error: "Message is required." };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      valid: false,
      status: 400,
      error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
    };
  }

  if (body.history !== undefined && !Array.isArray(body.history)) {
    return { valid: false, status: 400, error: "History must be an array." };
  }

  const history = Array.isArray(body.history) ? body.history : [];

  if (history.length > MAX_HISTORY_TURNS) {
    return {
      valid: false,
      status: 400,
      error: `Conversation history is limited to ${MAX_HISTORY_TURNS} messages.`,
    };
  }

  for (const entry of history) {
    if (!entry || typeof entry.text !== "string") {
      return { valid: false, status: 400, error: "Invalid history entry." };
    }
    if (entry.text.length > MAX_MESSAGE_LENGTH) {
      return {
        valid: false,
        status: 400,
        error: "A history message exceeds the maximum length.",
      };
    }
  }

  return { valid: true, message, history };
}

export function validateExplainProjectPayload(body = {}) {
  const projectId =
    typeof body.projectId === "string" ? body.projectId.trim() : "";

  if (!projectId) {
    return { valid: false, status: 400, error: "projectId is required." };
  }

  if (projectId.length > MAX_PROJECT_ID_LENGTH) {
    return { valid: false, status: 400, error: "Invalid projectId." };
  }

  return { valid: true, projectId };
}
