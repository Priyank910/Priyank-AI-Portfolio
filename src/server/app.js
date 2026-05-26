import express from "express";
import cors from "cors";
import helmet from "helmet";
import aiRoutes from "./routes/aiRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import portfolioContext from "./data/portfolioContext.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.set("trust proxy", 1);

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
  "https://priyankchavda.info",
  "https://www.priyankchavda.info",
];

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean)
  : defaultOrigins;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

app.use(express.json({ limit: "256kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Priyank Chavda Portfolio API",
    health: "/api/health",
  });
});

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
