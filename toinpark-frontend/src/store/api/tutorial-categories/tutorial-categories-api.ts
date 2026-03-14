import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateTutorialCategoryArgs,
  TCreateTutorialCategoryRes,
  TDeleteATutorialCategoryArgs,
  TDeleteATutorialCategoryRes,
  TGetATutorialCategoryArgs,
  TGetATutorialCategoryRes,
  TGetTutorialCategoriesArgs,
  TGetTutorialCategoriesRes,
  TUpdateTutorialCategoryArgs,
  TUpdateTutorialCategoryRes,
} from "./tutorial-categories.types";

export const tutorialCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTutorialCategory: builder.mutation<
      TCreateTutorialCategoryRes,
      TCreateTutorialCategoryArgs
    >({
      query: (data) => ({
        url: "/v1/tutorial-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTutorialCategories", "getATutorialCategory"];
        }
        return [];
      },
    }),

    getTutorialCategories: builder.query<
      TGetTutorialCategoriesRes,
      TGetTutorialCategoriesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/tutorial-categories${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getTutorialCategories"],
    }),

    getATutorialCategory: builder.query<
      TGetATutorialCategoryRes,
      TGetATutorialCategoryArgs
    >({
      query: ({ id }) => ({
        url: `/v1/tutorial-categories/${id}`,
        method: "GET",
      }),

      providesTags: ["getATutorialCategory"],
    }),

    updateTutorialCategory: builder.mutation<
      TUpdateTutorialCategoryRes,
      TUpdateTutorialCategoryArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/tutorial-categories/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTutorialCategories", "getATutorialCategory"];
        }
        return [];
      },
    }),

    deleteATutorialCategory: builder.mutation<
      TDeleteATutorialCategoryRes,
      TDeleteATutorialCategoryArgs
    >({
      query: ({ id }) => ({
        url: `/v1/tutorial-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTutorialCategories", "getATutorialCategory"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateTutorialCategoryMutation,
  useGetTutorialCategoriesQuery,
  useGetATutorialCategoryQuery,
  useUpdateTutorialCategoryMutation,
  useDeleteATutorialCategoryMutation,
} = tutorialCategoriesApi;
