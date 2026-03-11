import { createProjectPopup } from "./create-project-popup.js";

export const initDemoChatUi = ({ form, input, messages, githubUrl }) => {
  const showPopup = createProjectPopup({ githubUrl });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showPopup();
  });

  input.addEventListener("focus", () => {
    showPopup();
  });

  messages.addEventListener("click", () => {
    showPopup();
  });
};
