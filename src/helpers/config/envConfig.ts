export const getBaseUrl = (): string => {
  // deploylink || locallink
  return process.env.BACKEND_URL || "http://localhost:3005/api/v1";
};
