import { Router } from "express";
import { submitContact } from "../controllers/ContactController.js";
import { contactRateLimit } from "../middleware/contactRateLimit.js";

const router = Router();

router.post("/", contactRateLimit, submitContact);

export default router;
