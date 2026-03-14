import { generateQueryString } from "@/lib/query-management/generate-query-string";
import { apiSlice } from "..";
import {
  TCreateReferralMilestoneArgs,
  TCreateReferralMilestoneRes,
  TDeleteAReferralMilestoneArgs,
  TDeleteAReferralMilestoneRes,
  TGetAReferralMilestoneArgs,
  TGetAReferralMilestoneRes,
  TGetReferralMilestonesArgs,
  TGetReferralMilestonesRes,
  TUpdateAReferralMilestoneArgs,
  TUpdateAReferralMilestoneRes,
  TUpdateReferralMilestoneArgs,
  TUpdateReferralMilestoneRes,
} from "./referral-milestone.type";

export const referralMilestoneApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReferralMilestone: builder.mutation<
      TCreateReferralMilestoneRes,
      TCreateReferralMilestoneArgs
    >({
      query: (data) => ({
        url: "/v1/referral-milestones",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getReferralMilestones", "getAReferralMilestone"];
        }
        return [];
      },
    }),

    getReferralMilestones: builder.query<TGetReferralMilestonesRes, TGetReferralMilestonesArgs>({
      query: (args) => {
        const { queryString } = generateQueryString(args);
        return {
          url: `/v1/referral-milestones${queryString}`,
          method: "GET",
        };
      },

      providesTags: ["getReferralMilestones"],
    }),

    getAReferralMilestone: builder.query<
      TGetAReferralMilestoneRes,
      TGetAReferralMilestoneArgs
    >({
      query: ({ id }) => ({
        url: `/v1/referral-milestones/${id}`,
        method: "GET",
      }),

      providesTags: ["getAReferralMilestone"],
    }),

    updateReferralMilestone: builder.mutation<
      TUpdateReferralMilestoneRes,
      TUpdateReferralMilestoneArgs
    >({
      query: ({ body, id }) => ({
        url: `/v1/referral-milestones/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getReferralMilestones", "getAReferralMilestone"];
        }
        return [];
      },
    }),

    updateAReferralMilestone: builder.mutation<
      TUpdateAReferralMilestoneRes,
      TUpdateAReferralMilestoneArgs
    >({
      query: ({ id }) => ({
        url: `/v1/referral-milestones/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getReferralMilestones", "getAReferralMilestone"];
        }
        return [];
      },
    }),

    deleteAReferralMilestone: builder.mutation<
      TDeleteAReferralMilestoneRes,
      TDeleteAReferralMilestoneArgs
    >({
      query: ({ id }) => ({
        url: `/v1/referral-milestones/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getReferralMilestones", "getAReferralMilestone"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useCreateReferralMilestoneMutation,
  useGetReferralMilestonesQuery,
  useGetAReferralMilestoneQuery,
  useUpdateReferralMilestoneMutation,
  useUpdateAReferralMilestoneMutation,
  useDeleteAReferralMilestoneMutation,
} = referralMilestoneApi;
