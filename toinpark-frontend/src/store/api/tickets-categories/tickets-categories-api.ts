import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateATicketsCategoriesArgs,
  TCreateATicketsCategoriesRes,
  TDeleteATicketArgs,
  TDeleteATicketRes,
  TGetActiveTicketsCategoriesArgs,
  TGetActiveTicketsCategoriesRes,
  TGetATicketsCategoriesArgs,
  TGetATicketsCategoryRes,
  TGetTicketsCategoriesArgs,
  TGetTicketsCategoriesRes,
  TUpdateATicketCategoryArgs,
  TUpdateATicketCategoryRes,
  TUpdateTicketCategoryStatusArgs,
  TUpdateTicketCategoryStatusRes,
} from "./tickets-categories.types";

export const ticketsCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createATicketCategory: builder.mutation<
      TCreateATicketsCategoriesRes,
      TCreateATicketsCategoriesArgs
    >({
      query: (data) => ({
        url: "/v1/ticket-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getTicketsCategories", "getActiveTicketsCategories"];
        }
        return [];
      },
    }),

    getTicketsCategories: builder.query<
      TGetTicketsCategoriesRes,
      TGetTicketsCategoriesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/ticket-categories${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getTicketsCategories"],
    }),

    getActiveTicketsCategories: builder.query<
      TGetActiveTicketsCategoriesRes,
      TGetActiveTicketsCategoriesArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/ticket-categories/active${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getActiveTicketsCategories"],
    }),

    getATicketCategory: builder.query<
      TGetATicketsCategoryRes,
      TGetATicketsCategoriesArgs
    >({
      query: ({ id }) => ({
        url: `/v1/ticket-categories/${id}`,
        method: "GET",
      }),

      providesTags: ["getATicketCategory"],
    }),

    updateATicketCategory: builder.mutation<
      TUpdateATicketCategoryRes,
      TUpdateATicketCategoryArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/ticket-categories/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getTicketsCategories",
            "getATicketCategory",
            "getActiveTicketsCategories",
          ];
        }
        return [];
      },
    }),

    updateTicketCategoryFeature: builder.mutation<
      TUpdateTicketCategoryStatusRes,
      TUpdateTicketCategoryStatusArgs
    >({
      query: ({ id }) => ({
        url: `/v1/ticket-categories/${id}/toggle-status`,
        method: "PATCH",
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getTicketsCategories",
            "getATicketCategory",
            "getActiveTicketsCategories",
          ];
        }
        return [];
      },
    }),

    deleteATicketCategory: builder.mutation<
      TDeleteATicketRes,
      TDeleteATicketArgs
    >({
      query: ({ id }) => ({
        url: `/v1/ticket-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return [
            "getTicketsCategories",
            "getATicketCategory",
            "getActiveTicketsCategories",
          ];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateATicketCategoryMutation,
  useGetTicketsCategoriesQuery,
  useGetActiveTicketsCategoriesQuery,
  useGetATicketCategoryQuery,
  useUpdateATicketCategoryMutation,
  useDeleteATicketCategoryMutation,
  useUpdateTicketCategoryFeatureMutation,
} = ticketsCategoriesApi;
