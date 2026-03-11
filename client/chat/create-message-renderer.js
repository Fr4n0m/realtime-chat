export const createMessageRenderer = ({ messagesElement, username }) => {
  let removedMockMessages = false;

  const removeMockMessages = () => {
    if (removedMockMessages) return;
    messagesElement
      .querySelectorAll('[data-mock="true"]')
      .forEach((node) => node.remove());
    removedMockMessages = true;
  };

  const appendMessage = ({ content, author }) => {
    removeMockMessages();

    const item = document.createElement("li");
    item.className = author === username ? "user2" : "user1";

    const text = document.createElement("p");
    text.textContent = content;

    const label = document.createElement("small");
    label.textContent = author;

    item.append(text, label);
    messagesElement.appendChild(item);
    messagesElement.scrollTop = messagesElement.scrollHeight;
  };

  return {
    appendMessage,
  };
};
