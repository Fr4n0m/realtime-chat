import { normalizeUsername } from "./normalize-username.js";
import { validateMessage } from "./validate-message.js";

export const createChatService = ({ messageRepository, maxMessageLength }) => {
  const sendMessage = async ({ rawMessage, rawUsername }) => {
    const validation = validateMessage(rawMessage, maxMessageLength);
    if (!validation.ok) {
      return { ok: false, error: validation.error };
    }

    const username = normalizeUsername(rawUsername);
    const saved = await messageRepository.save({
      content: validation.content,
      user: username,
    });

    return {
      ok: true,
      message: {
        id: String(saved.id),
        content: saved.content,
        user: saved.user || "anonymous",
      },
    };
  };

  const getMessages = async () => {
    const rows = await messageRepository.list();
    return rows.map((row) => ({
      id: String(row.id),
      content: row.content,
      user: row.user || "anonymous",
    }));
  };

  return {
    sendMessage,
    getMessages,
  };
};
