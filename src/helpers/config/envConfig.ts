export const getBaseUrl = (): string => {
  // deploylink || locallink
  return process.env.BACKEND_URL || "http://localhost:3005/api/v1";
  //return process.env.BACKEND_URL || "http://localhost:3005/api/v1";
  // https://backend-for-event-dyhl9sx57-rizwanulwahid612-gmailcom.vercel.app/api/v1/
};
