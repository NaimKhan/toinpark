import { apiSlice } from "..";
import {
  TGetAirDropActiveEventArgs,
  TGetAirDropActiveEventRes,
  TGetEmailInvitationArgs,
  TGetEmailInvitationRes,
  TGetInvitationClaimedArgs,
  TGetInvitationClaimedRes,
  TGetReferralLinkArgs,
  TGetReferralLinkRes,
  TGetReferralMilestoneArgs,
  TGetReferralMilestoneRes,
  TGetUserToinsSummeryArgs,
  TGetUserToinsSummeryRes,
} from "./user-dashboard.type";

export const airdropEventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserToinsSummery: builder.query<
      TGetUserToinsSummeryRes,
      TGetUserToinsSummeryArgs
    >({
      query: () => ({
        url: "/v1/dashboard/get-user-toins-summary",
        method: "GET",
      }),
      providesTags: ["getUserToinsSummery"],
    }),

    getInvitationClaimed: builder.query<
      TGetInvitationClaimedRes,
      TGetInvitationClaimedArgs
    >({
      query: () => {
        return {
          url: "v1/dashboard/invitation-claimed",
          method: "GET",
        };
      },

      providesTags: ["getInvitationClaimed"],
    }),

    getReferralMilestone: builder.query<
      TGetReferralMilestoneRes,
      TGetReferralMilestoneArgs
    >({
      query: () => {
        return {
          url: "v1/referral-milestone",
          method: "GET",
        };
      },
      providesTags: ["getReferralMilestone"],
    }),

    getSendEmailInvitation: builder.query<
      TGetEmailInvitationRes,
      TGetEmailInvitationArgs
    >({
      query: ({ emailId }) => ({
        url: `/v1/dashboard/send-invitation-by-email/${emailId}`,
        method: "GET",
      }),

      providesTags: ["getSendEmailInvitation"],
    }),

    getReferralLink: builder.query<TGetReferralLinkRes, TGetReferralLinkArgs>({
      query: () => {
        return {
          url: "v1/dashboard/get-referral-link-events",
          method: "GET",
        };
      },
      providesTags: ["getReferralLink"],
    }),
    getAirDropActiveEvent: builder.query<
      TGetAirDropActiveEventRes,
      TGetAirDropActiveEventArgs
    >({
      query: () => {
        return {
          url: "/v1/dashboard/get-air-drop-events",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetUserToinsSummeryQuery,
  useGetInvitationClaimedQuery,
  useGetReferralMilestoneQuery,
  useLazyGetSendEmailInvitationQuery,
  useGetReferralLinkQuery,
  useGetAirDropActiveEventQuery,
} = airdropEventsApi;
