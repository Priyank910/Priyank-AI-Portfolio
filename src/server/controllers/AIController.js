import { askGemini } from "../services/geminiService.js";
import portfolioContext from "../data/portfolioContext.js";
import {
  validateChatPayload,
  validateExplainProjectPayload,
} from "../utils/aiValidation.js";

export async function chatHandler(req, res, next) {
  try {
    const validation = validateChatPayload(req.body);

    if (!validation.valid) {
      res.status(validation.status).json({ success: false, error: validation.error });
      return;
    }

    const reply = await askGemini(validation.history, validation.message);
    res.json({ success: true, reply });
  } catch (err) {
    next(err);
  }
}

export async function explainProjectHandler(req, res, next) {
  try {
    const validation = validateExplainProjectPayload(req.body);

    if (!validation.valid) {
      res.status(validation.status).json({ success: false, error: validation.error });
      return;
    }

    const project = portfolioContext.projects.find(
      (p) => p.id === validation.projectId,
    );

    if (!project) {
      res.status(404).json({
        success: false,
        error: "Project not found in portfolio context.",
      });
      return;
    }

    const explanationPrompt = `Explain the project "${project.title}" designed by Priyank.
Tech Stack: ${project.techStack.join(", ")}
Description: ${project.description}
Features: ${project.features.join(", ")}
Challenges Solved: ${project.challengesSolved}
Architecture: ${project.architecture}

Explain the actual problem, technologies, design choices, and lessons documented for this project. Do not assume the project uses MERN, GenAI, or a database unless listed. Do not invent impact metrics or claim the architecture was independently verified. Use plain text only (no markdown).`;

    const explanation = await askGemini([], explanationPrompt);
    res.json({ success: true, title: project.title, explanation });
  } catch (err) {
    next(err);
  }
}
