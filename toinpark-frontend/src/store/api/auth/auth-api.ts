import Cookies from "js-cookie";

import { login, logout } from "@/store/features/auth";
import type { TAuthInfo } from "@/store/features/auth/types";

import { apiSlice } from "..";
import type {
  TForgotPasswordArgs,
  TForgotPasswordRes,
  TLoginWithUserIdArgs,
  TResendOtpArgs,
  TResendOtpRes,
  TResetPasswordArgs,
  TResetPasswordRes,
  TSigninArgs,
  TSigninRes,
  TSignoutArgs,
  TSignoutRes,
  TUserSignUpArgs,
  TUserSignUpRes,
  TVerifyOtpArgs,
  TVerifyOtpRes,
} from "./auth.types";

import { getExpirationTime } from "@/lib/auth-utils/jwt";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userSignUp: builder.mutation<TUserSignUpRes, TUserSignUpArgs>({
      query: (data) => {
        return {
          url: "/v1/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    verifyOtp: builder.mutation<TVerifyOtpRes, TVerifyOtpArgs>({
      query: (data) => {
        return {
          url: "/v1/auth/otp-validation",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(registerArgs, { dispatch, queryFulfilled }) {
        try {
          const loginRes = await queryFulfilled;
          const loginData = loginRes?.data?.data;

          const accessExpiresAtDate = getExpirationTime(loginData?.accessToken);
          const refreshExpiresAtDate = getExpirationTime(
            loginData?.refreshToken
          );

          // Convert Date to ISO string for Redux (must be serializable)
          const authInfo: TAuthInfo = {
            message: loginData?.message,
            accessToken: loginData?.accessToken,
            refreshToken: loginData?.refreshToken,
            accessExpiresAt: accessExpiresAtDate?.toISOString() ?? null,
            refreshExpiresAt: refreshExpiresAtDate?.toISOString() ?? null,
            user: loginData?.user,
          };

          if (!authInfo) {
            return;
          }
          const role = loginData?.user?.role;
          Cookies.set(`authinfo-${role}`, JSON.stringify(authInfo));
          dispatch(login({ ...authInfo, role }));
        } catch (error) {
          console.info("verifyOtp error", error);
        }
      },
    }),
    resendOtp: builder.mutation<TResendOtpRes, TResendOtpArgs>({
      query: (data) => {
        return {
          url: "/v1/auth/otp-resend",
          method: "POST",
          body: data,
        };
      },
    }),

    loginUser: builder.mutation<TSigninRes, TSigninArgs>({
      query: (data) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(registerArgs, { dispatch, queryFulfilled }) {
        try {
          const loginRes = await queryFulfilled;
          const loginData = loginRes?.data?.data;

          const accessExpiresAtDate = getExpirationTime(loginData?.accessToken);
          const refreshExpiresAtDate = getExpirationTime(
            loginData?.refreshToken
          );

          // Convert Date to ISO string for Redux (must be serializable)
          const authInfo: TAuthInfo = {
            message: loginData?.message,
            accessToken: loginData?.accessToken,
            refreshToken: loginData?.refreshToken,
            accessExpiresAt: accessExpiresAtDate?.toISOString() ?? null,
            refreshExpiresAt: refreshExpiresAtDate?.toISOString() ?? null,
            user: loginData?.user,
          };

          if (!authInfo) {
            return;
          }
          const role = loginData?.user?.role;
          Cookies.set(`authinfo-${role}`, JSON.stringify(authInfo));
          dispatch(login({ ...authInfo, role }));
        } catch (error) {
          console.error("login error", error);
        }
      },
    }),
    loginWithUserId: builder.mutation<TSigninRes, TLoginWithUserIdArgs>({
      query: ({ userId }) => ({
        url: `/v1/auth/login-as/${userId}`,
        method: "POST",
      }),
      async onQueryStarted(registerArgs, { dispatch, queryFulfilled }) {
        try {
          const loginRes = await queryFulfilled;
          const loginData = loginRes?.data?.data;

          const accessExpiresAtDate = getExpirationTime(loginData?.accessToken);
          const refreshExpiresAtDate = getExpirationTime(
            loginData?.refreshToken
          );

          // Convert Date to ISO string for Redux (must be serializable)
          const authInfo: TAuthInfo = {
            message: loginData?.message,
            accessToken: loginData?.accessToken,
            refreshToken: loginData?.refreshToken,
            accessExpiresAt: accessExpiresAtDate?.toISOString() ?? null,
            refreshExpiresAt: refreshExpiresAtDate?.toISOString() ?? null,
            user: loginData?.user,
          };

          if (!authInfo) {
            return;
          }
          const role = loginData?.user?.role;
          Cookies.set(`authinfo-${role}`, JSON.stringify(authInfo));
          dispatch(login({ ...authInfo, role }));
        } catch (error) {
          console.error("login error", error);
        }
      },
    }),

    signout: builder.mutation<TSignoutRes, { role?: string } | void>({
      query: (arg) => ({
        url: "/v1/auth/logout",
        method: "POST",
        body: typeof arg === "object" ? { role: arg?.role } : undefined,
      }),
      onQueryStarted: async (arg, api) => {
        const { dispatch, queryFulfilled } = api;
        const role = typeof arg === "object" ? arg?.role : undefined;

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Failed to signout", error);
        } finally {
          dispatch(logout({ role }));
          // Invalidate user profile to ensure it re-fetches with the remaining session (if any)
          dispatch(apiSlice.util.invalidateTags(["getUserProfile"]));

          if (role) {
            Cookies.remove(`authinfo-${role}`);
          } else {
            // Fallback for global logout
            Cookies.remove("authinfo-Admin");
            Cookies.remove("authinfo-SuperAdmin");
            Cookies.remove("authinfo-Member");
          }
        }
      },
    }),
    forgotPassword: builder.mutation<TForgotPasswordRes, TForgotPasswordArgs>({
      query: (data) => ({
        url: "/v1/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<TResetPasswordRes, TResetPasswordArgs>({
      query: (data) => ({
        url: "/v1/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useSignoutMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginWithUserIdMutation,
} = authApi;
