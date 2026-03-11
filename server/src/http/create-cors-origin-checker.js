export const createCorsOriginChecker = (allowedOrigins) => {
  const isAllowedOrigin = (origin) => {
    if (!origin) return true;
    return allowedOrigins.includes(origin.replace(/\/$/, ""));
  };

  return (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin not allowed by CORS"));
  };
};
