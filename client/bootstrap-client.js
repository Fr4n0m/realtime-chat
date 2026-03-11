import { getChatConfig } from "./config/get-chat-config.js";
import { createChatSocket } from "./chat/create-chat-socket.js";
import { initChatUi } from "./chat/init-chat-ui.js";
import { initThemeToggle } from "./theme/init-theme-toggle.js";
import { initDemoChatUi } from "./demo/init-demo-chat-ui.js";

const getRequiredElement = (id) => {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" is required`);
  }
  return element;
};

export const bootstrapClient = () => {
  const config = getChatConfig();
  const form = getRequiredElement("form");
  const input = getRequiredElement("input");
  const messages = getRequiredElement("messages");
  const projectPanel = getRequiredElement("project-panel");
  const toggle = getRequiredElement("toggle");
  initThemeToggle(toggle);

  if (config.uiMode === "demo") {
    initDemoChatUi({
      form,
      input,
      messages,
      panel: projectPanel,
      username: config.username,
      githubUrl: config.githubUrl,
    });
    return;
  }

  projectPanel.remove();

  const socket = createChatSocket({
    socketUrl: config.socketUrl,
    username: config.username,
  });

  initChatUi({
    socket,
    form,
    input,
    messages,
    username: config.username,
  });
};
