import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
  type QueryReturnValue,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { clientEnv } from "@/config/clientEnv";

import type { TRootState } from "..";
import { logout, updateToken } from "../features/auth";
import type { TRefreshTokenRes } from "./auth/auth.types";
import {
  getExpirationTime,
  isAccessTokenExpired,
  isRefreshTokenExpired,
} from "@/lib/auth-utils/jwt";

type TFetchBaseQueryReturnType = ReturnType<typeof fetchBaseQuery>;

const baseQuery: TFetchBaseQueryReturnType = fetchBaseQuery({
  baseUrl: clientEnv.API_BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const state = getState() as TRootState;

    // 1. Detect role based on current URL path (if in browser)
    let isPathAdmin = false;
    if (typeof window !== "undefined") {
      isPathAdmin = window.location.pathname.includes("/admin");
    }

    // 2. Detect role based on endpoint name
    const isEndpointAdmin = endpoint.toLowerCase().includes("admin");

    const isAdminRequest = isPathAdmin || isEndpointAdmin;

    const memberAuth = state?.authSlice?.memberAuth;
    const adminAuth = state?.authSlice?.adminAuth;

    const auth = isAdminRequest ? adminAuth : memberAuth;
    const token = auth?.accessToken;

    if (!token) {
      headers.delete("Authorization");
      return headers;
    }

    headers.set("Authorization", `Bearer ${token}`);
    headers.set("ngrok-skip-browser-warning", "1");

    return headers;
  },
});

const baseQueryWithReAuth: TFetchBaseQueryReturnType = async (
  args,
  api,
  extraOptions
) => {
  let result: QueryReturnValue<
    unknown,
    FetchBaseQueryError,
    FetchBaseQueryMeta
  > = await baseQuery(args, api, extraOptions);

  const url = (args as any)?.url || "";
  
  // Try to determine role from URL path or current window location
  let isAdminRequest = url.includes("/v1/admin/");
  if (typeof window !== "undefined" && !isAdminRequest) {
    isAdminRequest = window.location.pathname.includes("/admin");
  }
  
  const role = isAdminRequest ? "Admin" : "Member";

  const { authSlice } = api.getState() as TRootState;

  const currentAuth = isAdminRequest
    ? authSlice?.adminAuth
    : authSlice?.memberAuth;

  if (!currentAuth) {
     return result;
  }

  const refreshTokenExpired =
    !!currentAuth?.refreshToken &&
    !!currentAuth?.refreshExpiresAt &&
    isRefreshTokenExpired(currentAuth?.refreshExpiresAt);

  if (refreshTokenExpired) {
    api.dispatch(logout({ role }));
    api.dispatch(apiSlice.util.invalidateTags(["getUserProfile"]));
    Cookies.remove(`authinfo-${role}`);
    return result;
  }

  const accessTokenExpired =
    !!currentAuth?.accessToken &&
    !!currentAuth?.accessExpiresAt &&
    isAccessTokenExpired(currentAuth?.accessExpiresAt);

  if (
    result?.error?.status === 401 &&
    !refreshTokenExpired &&
    accessTokenExpired
  ) {
    const refreshTokenApiRes = (await baseQuery(
      {
        url: "/v1/auth/refresh",
        method: "POST",
        body: {
          refreshToken: currentAuth?.refreshToken,
        },
      },
      api,
      extraOptions
    )) as {
      data: TRefreshTokenRes;
    };
    const refreshTokenApiData = refreshTokenApiRes?.data?.data;

    const newAccessExpiresAtDate = refreshTokenApiData?.accessToken
      ? getExpirationTime(refreshTokenApiData.accessToken)
      : null;

    api.dispatch(
      updateToken({
        role,
        accessToken: refreshTokenApiData?.accessToken,
        accessExpiresAt: newAccessExpiresAtDate?.toISOString() ?? null,
      })
    );
    result = await baseQuery(args, api, extraOptions);
    return result;
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: [
    // dashboard
    "getDashboardUpcomingEvents",
    "getDashboardRevenueAndPoints",
    // Admin System Settings
    "getGeneralSettings",
    "getPdf",
    "getAGeneralSettings",
    // User Profile
    "getUserProfile",
    "getPhoneOrEmailOtpVerify",
    // Tutorial Categories
    "getTutorialCategories",
    "getATutorialCategory",
    // Tutorial
    "getTutorials",
    "getATutorial",
    "getFeatureTutorials",
    // Airdrop Events
    "getAirdropEvents",
    "getAAirdropEvent",
    // Tickets
    "getTickets",
    "getMyTickets",
    "getATicket",
    // Tickets Categories
    "getTicketsCategories",
    "getATicketCategory",
    "getActiveTicketsCategories",
    // Locations
    "getStates",
    "getCountries",
    //Community Events
    "getCommunityEvents",
    "getACommunityEvent",
    //Official Announcements
    "getOfficialAnnouncements",
    "getAOfficialAnnouncement",
    //Announcement Categories
    "getAnnouncementCategories",
    "getAAnnouncementCategory",
    // User Dashboard
    "getUserToinsSummery",
    "getInvitationClaimed",
    "getReferralLink",
    "getSendEmailInvitation",
    "getReferralMilestone",
    "getToinLeaderBoard",
    // Member Management
    "getAMember",
    "getMembers",
    // Stacking Packages
    "getStakingPackages",
    "getAStakingPackage",
    "getActiveStakingPackages",
    "getAllUserStakingPackages",
    // Sub Admin
    "getSubAdmins",
    "getASubAdmin",
    //referral Milestone
    "getReferralMilestones",
    "getAReferralMilestone",
    // Referral Levels
    "getReferralLevels",
    "getReferralLevelsMember",
    "getReferralLevelMembers",
    // user Transaction
    "getStakingTransaction",
    "getUserWiseAllTransaction",
    "getLevelTransaction",
    // Notifications
    "Notifications",
    "UnreadCount",
    "getUserWalletAddresses",
    "getStakingPackageById",
    "getAdminStats",
  ],
});

export type TApiSlice = typeof apiSlice;
