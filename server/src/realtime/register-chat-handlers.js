import { normalizeUsername } from "../chat/normalize-username.js";

export const registerChatHandlers = ({ socket, io, chatService, rateLimiter }) => {
  socket.on("disconnect", () => {
    rateLimiter.clear(socket.id);
  });

  socket.on("chat message", async (rawMessage) => {
    if (rateLimiter.isLimited(socket.id)) {
      socket.emit("chat error", "Too many messages, slow down");
      return;
    }

    try {
      const result = await chatService.sendMessage({
        rawMessage,
        rawUsername: normalizeUsername(socket.handshake.auth?.username),
      });

      if (!result.ok) {
        socket.emit("chat error", result.error);
        return;
      }

      io.emit(
        "chat message",
        result.message.content,
        result.message.id,
        result.message.user
      );
    } catch (error) {
      socket.emit("chat error", "Message could not be stored");
    }
  });

  socket.on("fetch messages", async () => {
    try {
      const messages = await chatService.getMessages();
      messages.forEach((message) => {
        socket.emit("chat message", message.content, message.id, message.user);
      });
    } catch (error) {
      socket.emit("chat error", "Messages could not be loaded");
    }
  });
};
