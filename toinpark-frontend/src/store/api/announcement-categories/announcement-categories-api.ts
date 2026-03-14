import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateAnnouncementCategoryArgs,
  TCreateAnnouncementCategoryRes,
  TDeleteAAnnouncementCategoryArgs,
  TDeleteAAnnouncementCategoryRes,
  TGetAAnnouncementCategoryArgs,
  TGetAAnnouncementCategoryRes,
  TGetAnnouncementCategoriesArgs,
  TGetAnnouncementCategoriesRes,
  TUpdateAnnouncementCategoryArgs,
  TUpdateAnnouncementCategoryRes,
} from "./announcement-categories.types";

export const announcementCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAnnouncementCategory: builder.mutation<
      TCreateAnnouncementCategoryRes,
      TCreateAnnouncementCategoryArgs
    >({
      query: (data) => ({
        url: "/v1/announcement-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAnnouncementCategories", "getAAnnouncementCategory"];
        }
        return [];
      },
    }),

    getAnnouncementCategories: builder.query<
      TGetAnnouncementCategoriesRes,
      TGetAnnouncementCategoriesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/announcement-categories${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getAnnouncementCategories"],
    }),

    getAAnnouncementCategory: builder.query<
     TGetAAnnouncementCategoryRes,
      TGetAAnnouncementCategoryArgs
    >({
      query: ({ id }) => ({
        url: `/v1/announcement-categories/${id}`,
        method: "GET",
      }),

      providesTags: ["getAAnnouncementCategory"],
    }),

    updateAnnouncementCategory: builder.mutation<
      TUpdateAnnouncementCategoryRes,
      TUpdateAnnouncementCategoryArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/announcement-categories/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAnnouncementCategories", "getAAnnouncementCategory"];
        }
        return [];
      },
    }),

    updateAnnouncementCategoryStatus: builder.mutation<
      TUpdateAnnouncementCategoryRes,
      TUpdateAnnouncementCategoryArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/announcement-categories/${id}/toggle-active`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAnnouncementCategories", "getAAnnouncementCategory"];
        }
        return [];
      },
    }),

    deleteAAnnouncementCategory: builder.mutation<
      TDeleteAAnnouncementCategoryRes,
      TDeleteAAnnouncementCategoryArgs
    >({
      query: ({ id }) => ({
        url: `/v1/announcement-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getAnnouncementCategories", "getAAnnouncementCategory"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateAnnouncementCategoryMutation,
  useGetAnnouncementCategoriesQuery,
  useGetAAnnouncementCategoryQuery,
  useUpdateAnnouncementCategoryMutation,
  useUpdateAnnouncementCategoryStatusMutation,
  useDeleteAAnnouncementCategoryMutation,
} = announcementCategoriesApi;
