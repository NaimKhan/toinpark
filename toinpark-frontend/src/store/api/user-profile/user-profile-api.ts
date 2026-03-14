import { apiSlice } from "..";
import {
  TChangeUserPasswordArgs,
  TChangeUserPasswordRes,
  TDeleteProfileImgRes,
  TGetPhoneOrEmailOtpVerifyArgs,
  TGetPhoneOrEmailOtpVerifyRes,
  TGetUserProfileArgs,
  TGetUserProfileRes,
  TPhoneOrEmailFirstOtpValidationArgs,
  TPhoneOrEmailFirstOtpValidationRes,
  TUpdateUserProfileArgs,
  TUpdateUserProfileRes,
  TUploadProfileImgArgs,
  TUploadProfileImgRes,
} from "./user-profile.types";

export const userProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<TGetUserProfileRes, TGetUserProfileArgs>({
      query: () => ({
        url: "/v1/user-profile",
        method: "GET",
      }),

      providesTags: ["getUserProfile"],
    }),

    getPhoneOrEmailOtpVerify: builder.query<
      TGetPhoneOrEmailOtpVerifyRes,
      TGetPhoneOrEmailOtpVerifyArgs
    >({
      query: (args) => {
        return {
          url: `/v1/user-profile/phone-or-email-otp-verify/${args?.emailOrPhone}`,
          method: "GET",
        };
      },

      providesTags: ["getPhoneOrEmailOtpVerify"],
    }),

    phoneOrEmailFirstOtpValidation: builder.mutation<
      TPhoneOrEmailFirstOtpValidationRes,
      TPhoneOrEmailFirstOtpValidationArgs
    >({
      query: (data) => ({
        url: "/v1/user-profile/phone-or-email-1st-otp-validation",
        method: "POST",
        body: data,
      }),
    }),
    phoneOrEmailSecondOtpValidation: builder.mutation<
      TPhoneOrEmailFirstOtpValidationRes,
      TPhoneOrEmailFirstOtpValidationArgs
    >({
      query: (data) => ({
        url: "/v1/user-profile/phone-or-email-2nd-otp-validation-cross-check",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getUserProfile"];
        }
        return [];
      },
    }),
    changeUserPassword: builder.mutation<
      TChangeUserPasswordRes,
      TChangeUserPasswordArgs
    >({
      query: (data) => ({
        url: "/v1/user-profile/change-password",
        method: "POST",
        body: data,
      }),
    }),

    updateUserProfile: builder.mutation<
      TUpdateUserProfileRes,
      TUpdateUserProfileArgs
    >({
      query: ({ body }) => ({
        url: `/v1/user-profile`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getUserProfile"];
        }
        return [];
      },
    }),
    uploadProfileImg: builder.mutation<
      TUploadProfileImgRes,
      TUploadProfileImgArgs
    >({
      query: ({ body }) => ({
        url: `/v1/user-profile/upload-profile-image`,
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

    deleteProfileImg: builder.mutation<TDeleteProfileImgRes, void>({
      query: () => ({
        url: `/v1/user-profile/profile-image`,
        method: "DELETE",
      }),

      invalidatesTags: (result) => {
        if (result?.success) {
          return ["getUserProfile"];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetPhoneOrEmailOtpVerifyQuery,
  useLazyGetPhoneOrEmailOtpVerifyQuery,
  usePhoneOrEmailFirstOtpValidationMutation,
  usePhoneOrEmailSecondOtpValidationMutation,
  useChangeUserPasswordMutation,
  useUpdateUserProfileMutation,
  useUploadProfileImgMutation,
  useDeleteProfileImgMutation,
} = userProfileApi;
