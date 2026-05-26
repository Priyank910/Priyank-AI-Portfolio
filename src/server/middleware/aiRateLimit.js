import rateLimit from "express-rate-limit";

export const aiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Too many AI requests. Please wait a few minutes and try again.",
    });
  },
});
