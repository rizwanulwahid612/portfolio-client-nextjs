import { IMeta, ISkill, IUser } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Skill_URL = "/skill";
export const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addSkillData: build.mutation({
      query: (data) => ({
        url: "/skill/create-skill",
        method: "POST",
        data,
        // contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.skill],
    }),

    skills: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: Skill_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISkill[], meta: IMeta) => {
        return {
          skill: response,
          meta,
        };
      },
      providesTags: [tagTypes.skill],
    }),
    skill: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${Skill_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.skill],
    }),
    updateSkill: build.mutation({
      query: (data) => ({
        url: `${Skill_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.skill],
    }),
    deleteSkill: build.mutation({
      query: (id) => ({
        url: `${Skill_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.skill],
    }),
  }),
});

export const {
  useSkillQuery,
  useSkillsQuery,
  useAddSkillDataMutation,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} = skillApi;
