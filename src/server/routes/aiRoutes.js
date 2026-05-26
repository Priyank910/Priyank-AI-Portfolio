import { Router } from "express";
import { chatHandler, explainProjectHandler } from "../controllers/AIController.js";
import { aiRateLimit } from "../middleware/aiRateLimit.js";

const router = Router();

router.use(aiRateLimit);
router.post("/chat", chatHandler);
router.post("/explain-project", explainProjectHandler);

export default router;
