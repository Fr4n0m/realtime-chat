import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../..");
const distDir = path.resolve(rootDir, "dist");
const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:4000",
];

const parsePort = () => {
  const parsedPort = Number.parseInt(process.env.PORT ?? "4000", 10);
  return Number.isNaN(parsedPort) ? 4000 : parsedPort;
};

const parseOrigins = () =>
  (process.env.ALLOWED_ORIGINS || defaultOrigins.join(","))
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

export const loadConfig = () => {
  const storageDriver = (process.env.CHAT_STORAGE || "mock").toLowerCase();
  const config = {
    port: parsePort(),
    storageDriver,
    allowedOrigins: parseOrigins(),
    distDir,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    maxMessageLength: 1000,
    rateLimitWindowMs: 10_000,
    rateLimitMaxEvents: 12,
  };

  if (config.storageDriver === "supabase") {
    if (!config.supabaseUrl || !config.supabaseAnonKey) {
      throw new Error(
        "SUPABASE_URL and SUPABASE_ANON_KEY are required when CHAT_STORAGE=supabase"
      );
    }
  }

  return config;
};
