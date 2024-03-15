import { IAchivement, IExperiance, IMeta, ISkill, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Achivement_URL = "/achivement";
export const achivementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAchivementData: build.mutation({
      query: (data) => ({
        url: "/achivement/create-achivement",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.achivement],
    }),

    achivements: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: Achivement_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAchivement[], meta: IMeta) => {
        return {
          achivement: response,
          meta,
        };
      },
      providesTags: [tagTypes.achivement],
    }),
    achivement: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${Achivement_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.achivement],
    }),
    updateAchivement: build.mutation({
      query: (data) => ({
        url: `${Achivement_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.achivement],
    }),
    deleteAchivement: build.mutation({
      query: (id) => ({
        url: `${Achivement_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.achivement],
    }),
  }),
});

export const {
  useAchivementQuery,
  useAchivementsQuery,
  useAddAchivementDataMutation,
  useDeleteAchivementMutation,
  useUpdateAchivementMutation,
} = achivementApi;
