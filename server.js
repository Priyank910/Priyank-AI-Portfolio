import dotenv from "dotenv";
dotenv.config();

import app from "./src/server/app.js";
import { connectDB } from "./src/server/config/db.js";

async function startServer() {
  await connectDB();

  const PORT = Number(process.env.PORT) || 8080;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Priyank Portfolio API running on port ${PORT} (${process.env.NODE_ENV || "development"})`,
    );
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
