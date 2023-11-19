import { authKey } from "@/constants/storageKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { decodedToken } from "@/utils/jwt";
//import { decodeToken } from "@/helpers/jwtHelpers";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken as string);
};
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: "https://backend-for-event-b03i2adhl-rizwanulwahid612-gmailcom.vercel.app/api/v1/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
