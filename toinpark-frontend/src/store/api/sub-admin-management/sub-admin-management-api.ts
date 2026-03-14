import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateASubAdminArgs,
  TCreateASubAdminRes,
  TDeleteASubAdminArgs,
  TDeleteASubAdminRes,
  TGetASubAdminArgs,
  TGetASubAdminRes,
  TGetSubAdminsArgs,
  TGetSubAdminsRes,
  TUpdateASubAdminArgs,
  TUpdateASubAdminRes,
  TUpdateASubAdminStatusArgs,
  TUpdateASubAdminStatusRes,
} from "./sub-admin-management.types";

export const ticketsCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createASubAdmin: builder.mutation<
      TCreateASubAdminRes,
      TCreateASubAdminArgs
    >({
      query: (data) => ({
        url: "/v1/sub-admins",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getSubAdmins"];
        }
        return [];
      },
    }),

    getSubAdmins: builder.query<TGetSubAdminsRes, TGetSubAdminsArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);

        return {
          url: `/v1/sub-admins/${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getSubAdmins"],
    }),

    getASubAdmin: builder.query<TGetASubAdminRes, TGetASubAdminArgs>({
      query: ({ id }) => ({
        url: `/v1/sub-admins/${id}`,
        method: "GET",
      }),

      providesTags: ["getASubAdmin"],
    }),

    updateASubAdmin: builder.mutation<
      TUpdateASubAdminRes,
      TUpdateASubAdminArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/sub-admins/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getSubAdmins", "getASubAdmin"];
        }
        return [];
      },
    }),

    updateASubAdminStatus: builder.mutation<
      TUpdateASubAdminStatusRes,
      TUpdateASubAdminStatusArgs
    >({
      query: ({ id, status }) => ({
        url: `/v1/sub-admins/${id}/status`,
        body: { status },
        method: "PATCH",
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getSubAdmins", "getASubAdmin"];
        }
        return [];
      },
    }),

    deleteASubAdmin: builder.mutation<
      TDeleteASubAdminRes,
      TDeleteASubAdminArgs
    >({
      query: ({ id }) => ({
        url: `/v1/sub-admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getSubAdmins", "getASubAdmin"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateASubAdminMutation,
  useGetSubAdminsQuery,
  useGetASubAdminQuery,
  useUpdateASubAdminMutation,
  useUpdateASubAdminStatusMutation,
  useDeleteASubAdminMutation,
} = ticketsCategoriesApi;
