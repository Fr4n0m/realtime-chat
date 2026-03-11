import { createMessageRenderer } from "../chat/create-message-renderer.js";
import { createProjectPanel } from "./create-project-panel.js";

export const initDemoChatUi = ({
  form,
  input,
  messages,
  panel,
  username,
  githubUrl,
}) => {
  createProjectPanel({ panel, githubUrl });
  const renderer = createMessageRenderer({
    messagesElement: messages,
    username,
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = input.value.trim();

    if (!content) return;

    renderer.appendMessage({
      content,
      author: username,
    });
    input.value = "";
  });
};
