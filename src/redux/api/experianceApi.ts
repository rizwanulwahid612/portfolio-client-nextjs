import { IExperiance, IMeta, ISkill, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Experiance_URL = "/experiance";
export const experianceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addExperianceData: build.mutation({
      query: (data) => ({
        url: "/experiance/create-experiance",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.experiance],
    }),

    experiances: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: Experiance_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IExperiance[], meta: IMeta) => {
        return {
          experiance: response,
          meta,
        };
      },
      providesTags: [tagTypes.experiance],
    }),
    experiance: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${Experiance_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.experiance],
    }),
    updateExperiance: build.mutation({
      query: (data) => ({
        url: `${Experiance_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.experiance],
    }),
    deleteExperiance: build.mutation({
      query: (id) => ({
        url: `${Experiance_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.experiance],
    }),
  }),
});

export const {
  useExperianceQuery,
  useExperiancesQuery,
  useAddExperianceDataMutation,
  useDeleteExperianceMutation,
  useUpdateExperianceMutation,
} = experianceApi;
