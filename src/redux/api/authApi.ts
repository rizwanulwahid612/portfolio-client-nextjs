// for login form
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //post for mutation,only get for query
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user], //cash remove
    }),
    forgotPassword: build.mutation({
      query: (forgotPasswordPayload) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        data: forgotPasswordPayload,
      }),
    }),
    resetPassword: build.mutation({
      query: (resetPasswordPayload) => ({
        url: `/auth/reset-password`,
        method: "POST",
        data: resetPasswordPayload,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
