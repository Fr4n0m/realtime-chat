import { describe, expect, it, vi } from "vitest";
import { createRateLimiter } from "../../../server/src/chat/create-rate-limiter.js";

describe("createRateLimiter", () => {
  it("limits after max events in window", () => {
    const limiter = createRateLimiter({
      windowMs: 10_000,
      maxEvents: 2,
    });

    expect(limiter.isLimited("socket-1")).toBe(false);
    expect(limiter.isLimited("socket-1")).toBe(false);
    expect(limiter.isLimited("socket-1")).toBe(true);
  });

  it("resets after time window", () => {
    vi.useFakeTimers();
    const limiter = createRateLimiter({
      windowMs: 1000,
      maxEvents: 1,
    });

    expect(limiter.isLimited("socket-1")).toBe(false);
    expect(limiter.isLimited("socket-1")).toBe(true);

    vi.advanceTimersByTime(1001);

    expect(limiter.isLimited("socket-1")).toBe(false);
    vi.useRealTimers();
  });

  it("can clear socket state", () => {
    const limiter = createRateLimiter({
      windowMs: 10_000,
      maxEvents: 1,
    });

    expect(limiter.isLimited("socket-1")).toBe(false);
    expect(limiter.isLimited("socket-1")).toBe(true);
    limiter.clear("socket-1");
    expect(limiter.isLimited("socket-1")).toBe(false);
  });
});
