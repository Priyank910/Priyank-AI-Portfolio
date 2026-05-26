import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import app from "./src/server/app.js";
import { connectDB } from "./src/server/config/db.js";

async function startServer() {
  await connectDB();

  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server loaded as Express middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        next();
        return;
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled production assets from ./dist");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Priyank's Portfolio MERN server booted successfully on port ${PORT}`,
    );
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
