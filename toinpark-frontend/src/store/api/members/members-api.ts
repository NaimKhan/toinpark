import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TGetAMemberArgs,
  TGetAMemberRes,
  TGetMembersArgs,
  TGetMembersRes,
  TUpdateMemberArgs,
  TUpdateMemberRes,
  TUpdateMemberStatusArgs,
  TUpdateMemberStatusRes,
} from "./members.types";

export const membersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // createMembers: builder.mutation<TCreateMemberRes, FormData>({
    //   query: (formData) => ({
    //     url: "/v1/members",
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: (result) => {
    //     if (result?.success) {
    //       return ["getMembers", "getAMember"];
    //     }
    //     return [];
    //   },
    // }),

    getMembers: builder.query<TGetMembersRes, TGetMembersArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/members${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getMembers"],
    }),

    getAMember: builder.query<TGetAMemberRes, TGetAMemberArgs>({
      query: ({ id }) => ({
        url: `/v1/members/${id}`,
        method: "GET",
      }),

      providesTags: ["getAMember"],
    }),

    updateMember: builder.mutation<TUpdateMemberRes, TUpdateMemberArgs>({
      query: ({ body, id }) => ({
        url: `/v1/members/${id}/profile`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getMembers", "getAMember"];
        }
        return [];
      },
    }),
    updateMemberStatus: builder.mutation<
      TUpdateMemberStatusRes,
      TUpdateMemberStatusArgs
    >({
      query: ({ id, body }) => ({
        url: `/v1/members/${id}/status`,
        method: "PATCH",
        body
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getMembers"];
        }
        return [];
      },
    }),

    // deleteAMember: builder.mutation<
    //   TDeleteAMemberRes,
    //   TDeleteAMemberArgs
    // >({
    //   query: ({ id }) => ({
    //     url: `/v1/members/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result) => {
    //     if (result?.success) {
    //       return ["getMembers", "getAMember"];
    //     }
    //     return [];
    //   },
    // }),
  }),
});

export const {
  // useCreateMembersMutation,
  useGetMembersQuery,
  useGetAMemberQuery,
  useUpdateMemberMutation,
  useUpdateMemberStatusMutation,
  // useDeleteAMemberMutation,
} = membersApi;
