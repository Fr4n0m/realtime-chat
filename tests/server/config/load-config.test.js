import { beforeEach, describe, expect, it } from "vitest";
import { loadConfig } from "../../../server/src/config/load-config.js";

const originalEnv = { ...process.env };

describe("loadConfig", () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.PORT;
    delete process.env.CHAT_STORAGE;
    delete process.env.ALLOWED_ORIGINS;
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
  });

  it("uses sane defaults", () => {
    const config = loadConfig();
    expect(config.port).toBe(4000);
    expect(config.storageDriver).toBe("mock");
    expect(config.allowedOrigins).toEqual([
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:4000",
    ]);
  });

  it("parses explicit values", () => {
    process.env.PORT = "4567";
    process.env.CHAT_STORAGE = "SUPABASE";
    process.env.ALLOWED_ORIGINS = "https://a.com/,https://b.com";
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_ANON_KEY = "key";

    const config = loadConfig();
    expect(config.port).toBe(4567);
    expect(config.storageDriver).toBe("supabase");
    expect(config.allowedOrigins).toEqual(["https://a.com", "https://b.com"]);
  });

  it("throws when supabase mode misses secrets", () => {
    process.env.CHAT_STORAGE = "supabase";
    expect(() => loadConfig()).toThrow(
      "SUPABASE_URL and SUPABASE_ANON_KEY are required when CHAT_STORAGE=supabase"
    );
  });
});
