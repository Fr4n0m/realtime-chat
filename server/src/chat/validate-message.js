export const validateMessage = (value, maxLength) => {
  if (typeof value !== "string") {
    return { ok: false, error: "Message cannot be empty" };
  }

  const content = value.trim();

  if (!content) {
    return { ok: false, error: "Message cannot be empty" };
  }

  if (content.length > maxLength) {
    return { ok: false, error: "Message is too long" };
  }

  return { ok: true, content };
};
