import { describe, expect, it } from "vitest";
import { createCorsOriginChecker } from "../../../server/src/http/create-cors-origin-checker.js";

describe("createCorsOriginChecker", () => {
  it("accepts allowed origins", () => {
    const checker = createCorsOriginChecker(["https://app.com"]);
    checker("https://app.com", (error, allowed) => {
      expect(error).toBeNull();
      expect(allowed).toBe(true);
    });
  });

  it("accepts undefined origin", () => {
    const checker = createCorsOriginChecker(["https://app.com"]);
    checker(undefined, (error, allowed) => {
      expect(error).toBeNull();
      expect(allowed).toBe(true);
    });
  });

  it("rejects disallowed origins", () => {
    const checker = createCorsOriginChecker(["https://app.com"]);
    checker("https://malicious.com", (error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Origin not allowed by CORS");
    });
  });
});
