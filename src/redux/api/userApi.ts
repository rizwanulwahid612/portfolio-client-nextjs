import { IMeta, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addContact: build.mutation({
      query: (data) => ({
        url: "/users/create-contact",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    addUserData: build.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    users: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: USER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    user: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useAddContactMutation,
  useUserQuery,
  useUsersQuery,
  useAddUserDataMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
