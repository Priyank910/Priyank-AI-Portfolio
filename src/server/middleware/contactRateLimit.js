import rateLimit from "express-rate-limit";

export const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact requests. Please try again later.",
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many contact requests. Please try again later.",
    });
  },
});
