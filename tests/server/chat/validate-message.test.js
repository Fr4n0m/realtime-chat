import { describe, expect, it } from "vitest";
import { validateMessage } from "../../../server/src/chat/validate-message.js";

describe("validateMessage", () => {
  it("rejects empty values", () => {
    expect(validateMessage("", 100)).toEqual({
      ok: false,
      error: "Message cannot be empty",
    });
    expect(validateMessage("   ", 100)).toEqual({
      ok: false,
      error: "Message cannot be empty",
    });
    expect(validateMessage(null, 100)).toEqual({
      ok: false,
      error: "Message cannot be empty",
    });
  });

  it("rejects too long messages", () => {
    expect(validateMessage("abcdef", 3)).toEqual({
      ok: false,
      error: "Message is too long",
    });
  });

  it("returns trimmed message when valid", () => {
    expect(validateMessage("  hello  ", 20)).toEqual({
      ok: true,
      content: "hello",
    });
  });
});
