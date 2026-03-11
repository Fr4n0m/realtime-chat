export const normalizeUsername = (value) => {
  const candidate = typeof value === "string" ? value : "anonymous";
  return candidate.trim().slice(0, 32) || "anonymous";
};
