import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateReferralLevelsArgs,
  TCreateReferralLevelsRes,
  TDeleteReferralLevelsArgs,
  TDeleteReferralLevelsRes,
  TGetReferralLevelMembersArgs,
  TGetReferralLevelMembersRes,
  TGetReferralLevelsArgs,
  TGetReferralLevelsMemberArgs,
  TGetReferralLevelsRes,
  TGetReferralLevelsMemberRes,
  TUpdateReferralLevelsArgs,
  TUpdateReferralLevelsRes,
} from "./referral-levels.types";

export const referralLevelsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReferralLevels: builder.mutation<
      TCreateReferralLevelsRes,
      TCreateReferralLevelsArgs
    >({
      query: (data) => ({
        url: "/v1/referral-levels",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getReferralLevels"];
        }
        return [];
      },
    }),

    getReferralLevels: builder.query<
      TGetReferralLevelsRes,
      TGetReferralLevelsArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/referral-levels${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getReferralLevels"],
    }),
    getReferralLevelsMember: builder.query<
      TGetReferralLevelsMemberRes,
      TGetReferralLevelsMemberArgs
    >({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/referral-levels/member${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getReferralLevelsMember"],
    }),
    getReferralLevelMembers: builder.query<
      TGetReferralLevelMembersRes,
      TGetReferralLevelMembersArgs
    >({
      query: (args) => {
        const { levelId, userId, ...rest } = args!;
        const { queryString } = generateQueryString(rest);
        return {
          url: `/v1/referral-levels/members/${levelId}/${userId}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["getReferralLevelMembers"],
    }),
    updateAReferralLevels: builder.mutation<
      TUpdateReferralLevelsRes,
      TUpdateReferralLevelsArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/referral-levels/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getReferralLevels"];
        }
        return [];
      },
    }),
    deleteAReferralLevels: builder.mutation<
      TDeleteReferralLevelsRes,
      TDeleteReferralLevelsArgs
    >({
      query: ({ id }) => ({
        url: `/v1/referral-levels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getReferralLevels"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetReferralLevelsQuery,
  useGetReferralLevelsMemberQuery,
  useGetReferralLevelMembersQuery,
  useUpdateAReferralLevelsMutation,
  useCreateReferralLevelsMutation,
  useDeleteAReferralLevelsMutation,
} = referralLevelsApi;
