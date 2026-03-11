export const createRateLimiter = ({ windowMs, maxEvents }) => {
  const state = new Map();

  const isLimited = (key) => {
    const now = Date.now();
    const current = state.get(key);

    if (!current || now > current.resetAt) {
      state.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      return false;
    }

    if (current.count >= maxEvents) {
      return true;
    }

    current.count += 1;
    return false;
  };

  const clear = (key) => {
    state.delete(key);
  };

  return {
    isLimited,
    clear,
  };
};
