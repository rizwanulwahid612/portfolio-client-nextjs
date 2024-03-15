import { tagTypes } from "@/redux/tag-types";
import { IMeta, IProject } from "@/types";
import { baseApi } from "./baseApi";

const PROJECT_URL = "/project";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    projects: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: PROJECT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IProject[], meta: IMeta) => {
        return {
          project: response,
          meta,
        };
      },
      providesTags: [tagTypes.project],
    }),
    // get single academic department
    project: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.project],
    }),
    // create a new academic department
    addProject: build.mutation({
      query: (data) => ({
        url: "/project/create-project",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.project],
    }),
    // update ac department
    updateProject: build.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.project],
    }),

    // delete ac department
    deleteProject: build.mutation({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.project],
    }),
  }),
});

export const {
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useProjectQuery,
  useProjectsQuery,
} = projectApi;
