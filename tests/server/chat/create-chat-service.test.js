import { describe, expect, it, vi } from "vitest";
import { createChatService } from "../../../server/src/chat/create-chat-service.js";

describe("createChatService", () => {
  it("returns validation error for invalid message", async () => {
    const repository = {
      save: vi.fn(),
      list: vi.fn(),
    };
    const service = createChatService({
      messageRepository: repository,
      maxMessageLength: 50,
    });

    const result = await service.sendMessage({
      rawMessage: "   ",
      rawUsername: "fran",
    });

    expect(result).toEqual({
      ok: false,
      error: "Message cannot be empty",
    });
    expect(repository.save).not.toHaveBeenCalled();
  });

  it("saves and normalizes outgoing message", async () => {
    const repository = {
      save: vi.fn().mockResolvedValue({
        id: 12,
        content: "hola",
        user: "fran",
      }),
      list: vi.fn(),
    };
    const service = createChatService({
      messageRepository: repository,
      maxMessageLength: 50,
    });

    const result = await service.sendMessage({
      rawMessage: "  hola ",
      rawUsername: "  fran ",
    });

    expect(repository.save).toHaveBeenCalledWith({
      content: "hola",
      user: "fran",
    });
    expect(result).toEqual({
      ok: true,
      message: {
        id: "12",
        content: "hola",
        user: "fran",
      },
    });
  });

  it("maps fetched messages to transport shape", async () => {
    const repository = {
      save: vi.fn(),
      list: vi.fn().mockResolvedValue([
        { id: 1, content: "a", user: "u1" },
        { id: 2, content: "b", user: "" },
      ]),
    };
    const service = createChatService({
      messageRepository: repository,
      maxMessageLength: 50,
    });

    const result = await service.getMessages();

    expect(result).toEqual([
      { id: "1", content: "a", user: "u1" },
      { id: "2", content: "b", user: "anonymous" },
    ]);
  });
});
