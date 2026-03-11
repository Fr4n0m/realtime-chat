const storageKey = "chat:username";
const defaultMode = "demo";
const supportedModes = new Set(["demo", "live"]);
const defaultGithubUrl = "https://github.com/Fran1799/realtime-chat";

const getOrCreateUsername = () => {
  const savedUsername = localStorage.getItem(storageKey);
  if (savedUsername) {
    return savedUsername;
  }

  const generated = `guest-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem(storageKey, generated);
  return generated;
};

export const getChatConfig = () => ({
  uiMode: supportedModes.has(import.meta.env.VITE_CHAT_UI_MODE?.toLowerCase())
    ? import.meta.env.VITE_CHAT_UI_MODE.toLowerCase()
    : defaultMode,
  githubUrl: import.meta.env.VITE_GITHUB_URL?.trim() || defaultGithubUrl,
  socketUrl: import.meta.env.VITE_SOCKET_SERVER_URL?.trim(),
  username: getOrCreateUsername(),
});
