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

Provide a professional architectural review as a Tech Lead. Explain how MERN and GenAI work together in this project, why the design choices are strong, and the engineering value of the challenges solved. Use plain text only (no markdown).`;

    const explanation = await askGemini([], explanationPrompt);
    res.json({ success: true, title: project.title, explanation });
  } catch (err) {
    next(err);
  }
}
