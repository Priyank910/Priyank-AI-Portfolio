import express from "express";
import helmet from "helmet";
import aiRoutes from "./routes/aiRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import portfolioContext from "./data/portfolioContext.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        frameAncestors: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
);

app.use(express.json({ limit: "256kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use("/api/ai", aiRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/portfolio", (req, res) => {
  res.json(portfolioContext);
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    apiName: "Priyank Chavda Portfolio API Engine",
  });
});

app.use("/api", notFoundHandler);
app.use(errorHandler);

export default app;
