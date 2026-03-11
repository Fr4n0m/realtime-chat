import { createMessageRenderer } from "./create-message-renderer.js";

export const initChatUi = ({ socket, form, input, messages, username }) => {
  const renderer = createMessageRenderer({
    messagesElement: messages,
    username,
  });

  socket.on("connect", () => {
    socket.emit("fetch messages");
  });

  socket.on("chat message", (message, serverOffset, author) => {
    renderer.appendMessage({
      content: message,
      author: author || "anonymous",
    });

    if (serverOffset) {
      socket.auth.serverOffset = serverOffset;
    }
  });

  socket.on("chat error", (message) => {
    console.error(message);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = input.value.trim();

    if (!content) return;

    socket.emit("chat message", content);
    input.value = "";
  });
};
