import { apiSlice } from "..";
import {
  TKycNewIdentityReceivedArgs,
  TKycNewIdentityReceivedResData,
  TKycNewIdentityVerifiedArgs,
  TKycOldVerifyArgs,
  TKycOldVerifyResData,
  TKycSendOtpArgs,
} from "./kyc.types";
import { TApiResponse } from "../common-api-types";

export const kycApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Case 2: Verification via different identity (e.g. Phone if changing Email)
    crossCheckSendOtp: builder.query<
      TApiResponse<{ uniqueKey: string }>,
      TKycSendOtpArgs
    >({
      query: ({ typeOf }) => ({
        url: `/v1/kyc/cross-check-email-or-phone-change-send-otp/${typeOf}`,
        method: "GET",
      }),
    }),

    // Step 1: Verify old identity
    oldIdentityVerification: builder.mutation<
      TApiResponse<TKycOldVerifyResData>,
      TKycOldVerifyArgs
    >({
      query: (body) => ({
        url: "/v1/kyc/old-email-or-phone-otp-verification",
        method: "POST",
        body,
      }),
    }),

    // Case 1: Verification via same identity (e.g. Email if changing Email)
    sameIdentitySendOtp: builder.query<
      TApiResponse<{ uniqueKey: string }>,
      TKycSendOtpArgs
    >({
      query: ({ typeOf }) => ({
        url: `/v1/kyc/same-email-or-phone-change-send-otp/${typeOf}`,
        method: "GET",
      }),
    }),

    // Step 2 & Case 3 Start: Send OTP to new identity
    newIdentityReceived: builder.mutation<
      TApiResponse<TKycNewIdentityReceivedResData>,
      TKycNewIdentityReceivedArgs
    >({
      query: (body) => ({
        url: "/v1/kyc/new-email-or-phone-received",
        method: "POST",
        body,
      }),
    }),

    // Step 3: Verify new identity
    newIdentityVerified: builder.mutation<
      TApiResponse<any>,
      TKycNewIdentityVerifiedArgs
    >({
      query: (body) => ({
        url: "/v1/kyc/new-email-or-phone-verified",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getUserProfile"];
        }
        return [];
      },
    }),

    // Admin: Get KYC Logs
    getKycLogs: builder.query<any, any>({
      query: (params) => ({
        url: "/v1/kyc/logs",
        method: "GET",
        params,
      }),
      providesTags: ["getKycLogs" as any],
    }),
  }),
});

export const {
  useLazyCrossCheckSendOtpQuery,
  useOldIdentityVerificationMutation,
  useLazySameIdentitySendOtpQuery,
  useNewIdentityReceivedMutation,
  useNewIdentityVerifiedMutation,
  useGetKycLogsQuery,
} = kycApi;
