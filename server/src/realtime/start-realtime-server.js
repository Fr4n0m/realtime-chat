import { createServer } from "node:http";
import { Server } from "socket.io";
import { createCorsOriginChecker } from "../http/create-cors-origin-checker.js";
import { createRateLimiter } from "../chat/create-rate-limiter.js";
import { createChatService } from "../chat/create-chat-service.js";
import { registerChatHandlers } from "./register-chat-handlers.js";

export const startRealtimeServer = ({ app, config, messageRepository }) => {
  const server = createServer(app);
  const corsOrigin = createCorsOriginChecker(config.allowedOrigins);
  const io = new Server(server, {
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const rateLimiter = createRateLimiter({
    windowMs: config.rateLimitWindowMs,
    maxEvents: config.rateLimitMaxEvents,
  });
  const chatService = createChatService({
    messageRepository,
    maxMessageLength: config.maxMessageLength,
  });

  io.on("connection", (socket) => {
    registerChatHandlers({
      socket,
      io,
      chatService,
      rateLimiter,
    });
  });

  return server;
};
