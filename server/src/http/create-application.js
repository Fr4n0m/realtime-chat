import path from "node:path";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { createCorsOriginChecker } from "./create-cors-origin-checker.js";

export const createApplication = (config) => {
  const app = express();
  const corsOrigin = createCorsOriginChecker(config.allowedOrigins);

  app.disable("x-powered-by");
  app.use(logger("dev"));
  app.use(express.json({ limit: "16kb" }));
  app.use(
    cors({
      origin: corsOrigin,
      credentials: true,
      methods: ["GET", "POST"],
    })
  );
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );
  app.use(express.static(config.distDir, { index: false }));
  app.get("*", (req, res) => {
    res.sendFile(path.join(config.distDir, "index.html"));
  });

  return app;
};
