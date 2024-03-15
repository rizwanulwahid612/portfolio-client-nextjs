import { tagTypes } from "@/redux/tag-types";
import { IFramework, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const FRAMEWORK_URL = "/framework";

export const frameworkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    frameworks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FRAMEWORK_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFramework[], meta: IMeta) => {
        return {
          frameworks: response,
          meta,
        };
      },
      providesTags: [tagTypes.framework],
    }),
    // get single academic department
    framework: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FRAMEWORK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.framework],
    }),
    // create a new academic department
    addFramework: build.mutation({
      query: (data) => ({
        url: "/framework/create-framework",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.framework],
    }),
    // update ac department

    // delete ac department
    deleteFramework: build.mutation({
      query: (id) => ({
        url: `${FRAMEWORK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.framework],
    }),
    updateFramework: build.mutation({
      query: (data) => ({
        url: `${FRAMEWORK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.framework],
    }),
  }),
});

export const {
  useAddFrameworkMutation,
  useDeleteFrameworkMutation,
  useFrameworkQuery,
  useFrameworksQuery,
  useUpdateFrameworkMutation,
} = frameworkApi;
